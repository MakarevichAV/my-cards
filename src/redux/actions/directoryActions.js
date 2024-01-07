export const editDirectory = (id, editedName, editedImage) => ({
    type: 'EDIT_DIRECTORY',
    payload: { id, editedName, editedImage },
  });
  
  export const saveDirectory = (id, editedName, editedImage) => ({
    type: 'SAVE_DIRECTORY',
    payload: { id, editedName, editedImage },
  });
  
  export const deleteDirectory = (id) => ({
    type: 'DELETE_DIRECTORY',
    payload: { id },
  });