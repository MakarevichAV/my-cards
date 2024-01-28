const initialState = [];

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_CARD':
            const updatedState = state.map((card) =>
                card._id === action.payload.id
                    ? { ...card, isEditing: false, phrase: action.payload.editedPhrase, image: action.payload.editedImage }
                    : card
            );
            return updatedState;

        case 'DELETE_CARD':
            return state.filter((set) => set._id !== action.payload.id);

        case 'ADD_CARD':
            return [
                ...state,
                {
                    _id: action.payload._id,
                    setId: action.payload.setId,
                    directoryId: action.payload.directoryId,
                    phrase: 'New Phrase',
                    image: '',
                    isEditing: true,
                    editedPhrase: '',
                    editedImage: '',
                }
            ];
        case 'GET_CARDS':
            return action.payload;
        default:
            return state;
    }
}

export default cardReducer;