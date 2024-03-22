import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllStagiaires = async () => {
    try {
        const response = await api.get('/stagiaires');
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const getAllDepartements = async () => {
    try {
        const response = await api.get('/departements');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteStagiaire = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/stagiaires/${id}`);
        return response.data; // Assuming your backend returns a message or status
    } catch (error) {
        throw error.response.data; // Throw the error response data if there's an error
    }
};

export const addStagiaire = async stagiaireData => {
    try {
      const response = await api.post('/stagiaires', stagiaireData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
