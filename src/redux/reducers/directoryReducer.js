const initialState = [];

const directoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_DIRECTORY':
            const updatedState = state.map((directory) =>
                directory._id === action.payload.id
                    ? { ...directory, isEditing: false, name: action.payload.editedName, image: action.payload.editedImage }
                    : directory
            );
            return updatedState;

        case 'DELETE_DIRECTORY':
            return state.filter((directory) => directory._id !== action.payload.id);

        case 'ADD_DIRECTORY':
            // Добавляем новую директорию в режиме редактирования
            return [
                ...state,
                {
                    _id: action.payload._id, // Используем возвращенный ID от сервера
                    name: 'New Directory',
                    image: '',
                    setsCount: 0,
                    isEditing: true,
                    editedName: '',
                    editedImage: '',
                },
            ];
        case 'GET_DIRECTORIES':
            return action.payload;
        case 'UPDATE_DIRECTORY_SETS_COUNT':
            return state.map((directory) =>
                directory._id === action.payload.id
                    ? { ...directory, setsCount: action.payload.setsCount }
                    : directory
            );
        default:
            return state;
    }
};

export default directoryReducer;