const initialState = [];

const setReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SET':
            return [
                ...state,
                {
                    directoryId: action.payload.directoryId, // Используем возвращенный ID от сервера
                    name: '',
                    image: '',
                    cardsCount: 0,
                    isEditing: true,
                    editedName: '',
                    editedImage: '',
                }
            ];
        default:
            return state;
    }
}

export default setReducer;