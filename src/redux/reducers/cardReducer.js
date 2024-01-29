const initialState = [];

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_CARD':
            const updatedState = state.map((card) =>
                card._id === action.payload.id
                    ? {
                        ...card,
                        // isEditing: false, 
                        image: action.payload.editedImage,
                        phrase: action.payload.editedPhrase,
                        transcription: action.payload.editedTranscription,
                        note: action.payload.editedNote,
                        example1: action.payload.editedExample1,
                        translation: action.payload.editedTranslation,
                        example2: action.payload.editedExample2,
                    }
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
                    image: "",
                    phrase: "",
                    transcription: "",
                    note: "",
                    example1: "",
                    translation: "",
                    example2: "",
                    editedImage: '',
                    editedPhrase: '',
                    editedTranscription: "",
                    editedNote: "",
                    editedExample1: "",
                    editedTranslation: "",
                    editedExample2: "",
                    isEditing: true,
                }
            ];
        case 'GET_CARDS':
            return action.payload;
        default:
            return state;
    }
}

export default cardReducer;