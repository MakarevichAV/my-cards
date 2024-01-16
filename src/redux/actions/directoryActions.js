import * as actionTypes from './actionTypes';
import axios from 'axios';

const serverUrl = 'http://localhost:3001';

export const addDirectory = () => {
    return async (dispatch, getState) => {
        try {
            const newDirectory = {
                name: '',
                image: '',
                setsCount: 0,
            };

            // Получение информации о пользователе из состояния
            const storedUser = localStorage.getItem('user');
                const user = JSON.parse(storedUser);
                const userId = user.userId;
            // Отправка запроса к серверу для сохранения данных в базе данных
            const response = await axios.post(`${serverUrl}/addDirectory`, {
                ...newDirectory,
                userId: userId,
                // owner: {
                //     userId: userId,
                // },
                // userId: id, // Передача ID пользователя в запросе
            });

            dispatch({
                type: actionTypes.ADD_DIRECTORY,
                payload: response.data,
            });
        } catch (error) {
            console.error('Ошибка при добавлении директории:', error);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Response headers:', error.response?.headers);
            throw error;
        }
    };
};

export const editDirectory = (id, editedName, editedImage) => {
    return {
        type: actionTypes.EDIT_DIRECTORY,
        payload: { id, editedName, editedImage },
    };
};

export const saveDirectory = (id, editedName, editedImage) => {
    return async (dispatch, getState) => {
        try {
            const storedUser = localStorage.getItem('user');
            const user = JSON.parse(storedUser);
            const userId = user.userId;
            // Отправка запроса к серверу для сохранения отредактированных данных в базе данных
            await axios.put(`${serverUrl}/editDirectory/${id}`, { editedName, editedImage, userId });

            dispatch({
                type: actionTypes.SAVE_DIRECTORY,
                payload: { id, editedName, editedImage },
            });
        } catch (error) {
            console.error('Ошибка при сохранении директории:', error);
        }
    };
};

export const deleteDirectory = (id) => {
    return async (dispatch, getState) => {
        try {
            const storedUser = localStorage.getItem('user');
            const user = JSON.parse(storedUser);
            const userId = user.userId;
            // Отправка запроса к серверу для удаления данных из базы данных
            await axios.delete(`${serverUrl}/deleteDirectory/${id}?userId=${userId}`);

            dispatch({
                type: actionTypes.DELETE_DIRECTORY,
                payload: { id },
            });
        } catch (error) {
            console.error('Ошибка при удалении директории:', error);
        }
    };
};

export const getDirectories = () => {
    return async (dispatch, getState) => {
        try {
            const storedUser = localStorage.getItem('user');
            const user = JSON.parse(storedUser);
            const userId = user.userId;
            const response = await axios.get(`${serverUrl}/directories/${userId}`);
            const directories = response.data;
            dispatch({
                type: actionTypes.GET_DIRECTORIES,
                payload: directories,
            });
        } catch (error) {
            console.error('Error getting directories:', error);
        }
    };
};