import * as actionTypes from './actionTypes';
import axios from 'axios';

const serverUrl = 'http://localhost:3001';

export const addCard = (directoryId, setId) => {
    return async (dispatch, getState) => {
        try {
            const newCard = {
                name: 'New Card',
                image: '',
            };

            const response = await axios.post(`${serverUrl}/addCard`, {
                ...newCard,
                directoryId: directoryId,
                setId, setId
            });

            dispatch({
                type: actionTypes.ADD_CARD,
                payload: response.data,
            });

            const updatedCardsCount = getState().card.length;
            dispatch(updateSetCardsCount(setId, updatedCardsCount));

        } catch (error) {
            console.error('Error of adding card:', error);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Response headers:', error.response?.headers);
            throw error;
        }
    };
};

export const updateSetCardsCount = (id, cardsCount) => {
    return {
        type: actionTypes.UPDATE_SET_CARDS_COUNT,
        payload: { id, cardsCount },
    };
};

export const editCard = (id, editedPhrase, editedImage) => {
    return {
        type: actionTypes.EDIT_CARD,
        payload: { id, editedPhrase, editedImage },
    };
};

export const saveCard = (id, editedPhrase, editedImage, directoryId, setId) => {
    return async (dispatch, getState) => {
        try {
            // Отправка запроса к серверу для сохранения отредактированных данных в базе данных
            await axios.put(`${serverUrl}/editCard/${id}`, { editedPhrase, editedImage, directoryId, setId });

            dispatch({
                type: actionTypes.SAVE_CARD,
                payload: { id, editedPhrase, editedImage },
            });
        } catch (error) {
            console.error('Ошибка при сохранении карточки:', error);
        }
    };
};

export const deleteCard = (id, setId) => {
    return async (dispatch, getState) => {
        try {
            // Отправка запроса к серверу для удаления данных из базы данных
            await axios.delete(`${serverUrl}/deleteCard/${id}?setId=${setId}`);

            dispatch({
                type: actionTypes.DELETE_CARD,
                payload: { id },
            });

            const updatedCardsCount = getState().card.length;
            dispatch(updateSetCardsCount(setId, updatedCardsCount));

        } catch (error) {
            console.error('Ошибка при удалении карточки:', error);
        }
    };
};

export const getCards = (setId) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`${serverUrl}/cards/${setId}`);
            const cards = response.data;
            dispatch({
                type: actionTypes.GET_CARDS,
                payload: cards,
            });
        } catch (error) {
            console.error('Error getting cards:', error);
        }
    };
};