const initialState = [];

const directoryReducer = (state = initialState, action) => {
    switch (action.type) {
        // case 'EDIT_DIRECTORY':
        //     return state.map((directory) =>
        //         directory.id === action.payload.id
        //             ? { ...directory, isEditing: true, editedName: action.payload.editedName, editedImage: action.payload.editedImage }
        //             : directory
        //     );
        case 'EDIT_DIRECTORY':
            console.log('EDIT_DIRECTORY action:', action.payload.id);
            return state.map((directory) =>
            // console.log('directory._id:', directory._id)
                directory._id == action.payload.id
                    ? { ...directory, isEditing: true, editedName: action.payload.name, editedImage: action.payload.image }
                    : directory
            );

        case 'SAVE_DIRECTORY':
            // return state.map((directory) =>
            //     directory.id === action.payload.id
            //         ? { ...directory, isEditing: false, name: action.payload.editedName, image: action.payload.editedImage }
            //         : directory
            case 'SAVE_DIRECTORY':
            console.log('SAVE_DIRECTORY action:', action);
            return state.map((directory) =>
                directory._id === action.payload.id
                    ? { ...directory, isEditing: false, name: action.payload.editedName, image: action.payload.editedImage }
                    : directory
            );


        case 'DELETE_DIRECTORY':
            return state.filter((directory) => directory._id !== action.payload.id);

        case 'ADD_DIRECTORY':
            // Добавляем новую директорию в режиме редактирования
            return [
                ...state,
                {
                    id: action.payload._id, // Используем возвращенный ID от сервера
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