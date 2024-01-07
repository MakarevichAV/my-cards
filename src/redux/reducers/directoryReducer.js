const initialState = [
    // Ваши начальные директории могут быть здесь
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