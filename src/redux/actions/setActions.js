import * as actionTypes from './actionTypes';
import axios from 'axios';

const serverUrl = 'http://localhost:3001';

export const addSet = (directoryId) => {
    return async (dispatch, getState) => {
        try {
            const newSet = {
                name: 'New Set',
                image: '',
                cardsCount: 0,
            };

            const response = await axios.post(`${serverUrl}/addSet`, {
                ...newSet,
                directoryId: directoryId,
            });

            dispatch({
                type: actionTypes.ADD_SET,
                payload: response.data,
            });

            dispatch(updateDirectorySetsCount(directoryId));
        } catch (error) {
            console.error('Error of adding set:', error);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Response headers:', error.response?.headers);
            throw error;
        }
    };
};

export const updateDirectorySetsCount = (directoryId) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`${serverUrl}/directories/${directoryId}`);
            const directory = response.data[0];

            dispatch({
                type: actionTypes.UPDATE_DIRECTORY_SETS_COUNT,
                payload: directory,
            });
        } catch (error) {
            console.error('Error updating directory sets count:', error);
        }
    };
};

export const editSet = (id, editedName, editedImage) => {
    return {
        type: actionTypes.EDIT_SET,
        payload: { id, editedName, editedImage },
    };
};

export const saveSet = (id, editedName, editedImage, directoryId) => {
    return async (dispatch, getState) => {
        console.log(id, editedName, editedImage, directoryId);
        try {
            // Отправка запроса к серверу для сохранения отредактированных данных в базе данных
            await axios.put(`${serverUrl}/editSet/${id}`, { editedName, editedImage, directoryId });

            dispatch({
                type: actionTypes.SAVE_SET,
                payload: { id, editedName, editedImage },
            });
        } catch (error) {
            console.error('Ошибка при сохранении набора:', error);
        }
    };
};

export const deleteSet = (id, directoryId) => {
    return async (dispatch, getState) => {
        try {
            // Отправка запроса к серверу для удаления данных из базы данных
            await axios.delete(`${serverUrl}/deleteSet/${id}?directoryId=${directoryId}`);

            dispatch({
                type: actionTypes.DELETE_SET,
                payload: { id },
            });
        } catch (error) {
            console.error('Ошибка при удалении набора:', error);
        }
    };
};

export const getSets = (directoryId) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`${serverUrl}/sets/${directoryId}`);
            const sets = response.data;
            dispatch({
                type: actionTypes.GET_SETS,
                payload: sets,
            });
        } catch (error) {
            console.error('Error getting sets:', error);
        }
    };
};