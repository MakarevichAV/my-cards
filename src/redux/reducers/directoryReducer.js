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
                    name: '',
                    image: '',
                    setsCount: 0,
                    isEditing: true,
                    editedName: '',
                    editedImage: '',
                },
            ];
        case 'GET_DIRECTORIES':
            return action.payload;
        default:
            return state;
    }
};

export default directoryReducer;