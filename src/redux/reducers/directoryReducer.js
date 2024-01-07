const initialState = [
    {
        id: 1,
        name: 'Directory 1',
        image: 'path/to/image1.jpg',
        setsCount: 5,
        isEditing: false,
        editedName: '',
        editedImage: '',
    },
    {
        id: 2,
        name: 'Directory 2',
        image: 'path/to/image2.jpg',
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

        default:
            return state;
    }
};

export default directoryReducer;