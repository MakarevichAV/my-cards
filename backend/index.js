const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
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
    res.sendStatus(200);
});

app.post('/addDirectory', async (req, res) => {
    try {
        const { name, image, setsCount } = req.body;
        const newDirectory = new Directory({ name, image, setsCount });
        await newDirectory.save();
        res.status(200).json(newDirectory);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/editDirectory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { editedName, editedImage, setsCount } = req.body;

        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        const updatedDirectory = await Directory.findByIdAndUpdate(
            objectId,
            { name: editedName, image: editedImage, setsCount },
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

app.get('/directories', async (req, res) => {
    try {
        const directories = await Directory.find();
        res.status(200).json(directories);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/deleteDirectory/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Преобразование строки id в ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

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

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});