const initialState = [];

const setReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SET':
            const updatedState = state.map((set) =>
                set._id === action.payload.id
                    ? { ...set, isEditing: false, name: action.payload.editedName, image: action.payload.editedImage }
                    : set
            );
            return updatedState;

        case 'DELETE_SET':
            return state.filter((set) => set._id !== action.payload.id);

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
        case 'UPDATE_SET_CARDS_COUNT':
            return state.map((set) =>
                set._id === action.payload.id
                    ? { ...set, cardsCount: action.payload.cardsCount }
                    : set
            );
        default:
            return state;
    }
}

export default setReducer;