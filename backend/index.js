const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const Set = require('./models/Set');
const Card = require('./models/Card');
const Directory = require('./models/Directory');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к MongoDB
mongoose.connect('mongodb+srv://dunkan89:Ahtisuka7557@cluster0.rfkzbla.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Подключение к MongoDB установлено'))
    .catch((err) => console.error('Ошибка подключения к MongoDB', err));

// Настройка Passport.js
app.use(session({
    secret: '75577557',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (err) {
        return done(err);
    }
}));

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'Registration successful! Please log in.' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Login route
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
});

app.post('/addDirectory', async (req, res) => {
    try {
        const { name, image, setsCount, userId } = req.body;

        // Проверка наличия userId в запросе
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const newDirectory = new Directory({ name, image, setsCount, userId });
        await newDirectory.save();

        res.status(200).json(newDirectory);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/editDirectory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { editedName, editedImage, userId } = req.body;
        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        // Проверка владельца перед редактированием
        const directory = await Directory.findOne({ _id: objectId, userId: userId });

        if (!directory) {
            return res.status(403).json({ message: 'You do not have permission to edit this directory' });
        }

        const updatedDirectory = await Directory.findByIdAndUpdate(
            objectId,
            { name: editedName, image: editedImage },
            { new: true }
        );

        if (!updatedDirectory) {
            return res.status(404).json({ message: 'Directory not found' });
        }

        res.status(200).json(updatedDirectory);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/directories/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const directories = await Directory.find({ userId: userId });
        res.status(200).json(directories);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/deleteDirectory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Проверка владельца перед удалением
        const directory = await Directory.findOne({ _id: objectId, userId: userId });
        if (!directory) {
            return res.status(403).json({ message: 'You do not have permission to delete this directory' });
        }

        // Удаление директории по id
        const deletedDirectory = await Directory.findByIdAndDelete(objectId);

        if (!deletedDirectory) {
            return res.status(404).json({ message: 'Directory not found' });
        }

        res.status(200).json({ message: 'Directory deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/addSet', async (req, res) => {
    try {
        const { name, image, cardsCount, directoryId } = req.body;

        // Проверка наличия directoryId в запросе
        if (!directoryId) {
            return res.status(400).json({ message: 'Directory ID is required.' });
        }

        const newSet = new Set({ name, image, cardsCount, directoryId });
        await newSet.save();

        // Обновление setsCount в соответствующей директории 
        await Directory.findByIdAndUpdate(directoryId, { $inc: { setsCount: 1 } });

        res.status(200).json(newSet);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/editSet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { editedName, editedImage, directoryId } = req.body;
        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        // Проверка директории перед редактированием
        const set = await Set.findOne({ _id: objectId, directoryId: directoryId });

        if (!set) {
            return res.status(403).json({ message: 'You do not have permission to edit this set' });
        }

        const updatedSet = await Set.findByIdAndUpdate(
            objectId,
            { name: editedName, image: editedImage },
            { new: true }
        );

        if (!updatedSet) {
            return res.status(404).json({ message: 'Set not found' });
        }

        res.status(200).json(updatedSet);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/sets/:directoryId', async (req, res) => {
    try {
        const directoryId = req.params.directoryId;
        const sets = await Set.find({ directoryId: directoryId });
        res.status(200).json(sets);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/deleteSet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { directoryId } = req.query;
        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Проверка владельца перед удалением
        const set = await Set.findOne({ _id: objectId, directoryId: directoryId });
        if (!set) {
            return res.status(403).json({ message: 'You do not have permission to delete this set' });
        }

        // Удаление директории по id
        const deletedSet = await Set.findByIdAndDelete(objectId);

        if (!deletedSet) {
            return res.status(404).json({ message: 'Set not found' });
        }

        await Directory.findByIdAndUpdate(directoryId, { $inc: { setsCount: -1 } });

        res.status(200).json({ message: 'Set deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Обработчики для карточек
app.post('/addCard', async (req, res) => {
    try {
        const { image, phrase, transcription, note, example1, translation, example2, setId, directoryId } = req.body;

        // Проверка наличия directoryId в запросе
        if (!setId || !directoryId) {
            return res.status(400).json({ message: 'Set ID and Directory ID are required.' });
        }

        const newCard = new Card({ image, phrase, transcription, note, example1, translation, example2, setId, directoryId });
        await newCard.save();

        // Обновление setsCount в соответствующей директории 
        await Set.findByIdAndUpdate(setId, { $inc: { setsCount: 1 } });

        res.status(200).json(newCard);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/editCard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { editedImage, editedPhrase, editedTranscription, editedNote, editedExample1, editedTranslation, editedExample2, setId } = req.body;
        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        // Проверка директории перед редактированием
        const card = await Card.findOne({ _id: objectId, setId: setId });

        if (!card) {
            return res.status(403).json({ message: 'You do not have permission to edit this card' });
        }

        const updatedCard = await Card.findByIdAndUpdate(
            objectId,
            {
                image: editedImage,
                phrase: editedPhrase,
                transcription: editedTranscription,
                note: editedNote,
                example1: editedExample1,
                translation: editedTranslation,
                example2: editedExample2,
            },
            { new: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/cards/:setId', async (req, res) => {
    try {
        const setId = req.params.setId;
        const cards = await Card.find({ setId: setId });
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/deleteCard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { setId } = req.query;
        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Проверка владельца перед удалением
        const card = await Card.findOne({ _id: objectId, setId: setId });
        if (!card) {
            return res.status(403).json({ message: 'You do not have permission to delete this card' });
        }

        // Удаление директории по id
        const deletedCard = await Card.findByIdAndDelete(objectId);

        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        await Set.findByIdAndUpdate(setId, { $inc: { setsCount: -1 } });

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});