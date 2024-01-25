import * as actionTypes from './actionTypes';
import axios from 'axios';

const serverUrl = 'http://localhost:3001';

export const addSet = (directoryId) => {
    return async (dispatch, getState) => {
        try {
            const newSet = {
                name: '',
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
        } catch (error) {
            console.error('Error of adding set:', error);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Response headers:', error.response?.headers);
            throw error;
        }
    };
};