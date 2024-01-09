const initialState = [
    {
        id: 1,
        name: 'Directory 1',
        image: '',
        setsCount: 5,
        isEditing: false,
        editedName: '',
        editedImage: '',
    },
    {
        id: 2,
        name: 'Directory 2',
        image: '',
        setsCount: 3,
        isEditing: false,
        editedName: '',
        editedImage: '',
    },
];

const directoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_DIRECTORY':
            return state.map((directory) =>
                directory.id === action.payload.id
                    ? { ...directory, isEditing: true, editedName: action.payload.editedName, editedImage: action.payload.editedImage }
                    : directory
            );

        case 'SAVE_DIRECTORY':
            return state.map((directory) =>
                directory.id === action.payload.id
                    ? { ...directory, isEditing: false, name: action.payload.editedName, image: action.payload.editedImage }
                    : directory
            );

        case 'DELETE_DIRECTORY':
            return state.filter((directory) => directory.id !== action.payload.id);

        case 'ADD_DIRECTORY':
            // Добавляем новую директорию в режиме редактирования
            return [
                ...state,
                {
                    id: state.length + 1, // Просто для примера, можете использовать вашу логику присвоения ID
                    name: '',
                    image: '',
                    setsCount: 0,
                    isEditing: true,
                    editedName: '',
                    editedImage: '',
                },
            ];

        default:
            return state;
    }
};

export default directoryReducer;