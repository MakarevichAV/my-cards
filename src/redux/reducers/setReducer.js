const initialState = [];

const setReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SET':
            return [
                ...state,
                {
                    _id: action.payload._id,
                    directoryId: action.payload.directoryId,
                    name: 'New Set',
                    image: '',
                    cardsCount: 0,
                    isEditing: true,
                    editedName: '',
                    editedImage: '',
                }
            ];
        case 'GET_SETS':
            return action.payload;
        default:
            return state;
    }
}

export default setReducer;