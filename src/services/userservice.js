// src/services/userservice.js
import axiosInstance from './axiosInstance'; // Très important !

/**
 * @typedef {Object} User
 * @property {number} id - The user's ID.
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 */
export async function addUser(payload) {
  try {
    const response = await axiosInstance.post<User>('/user', payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Erreur serveur ${error.response.status} : ` +
        (error.response.data?.message ?? JSON.stringify(error.response.data))
      );
      
    }
    if (error.request) {
      console.error('Aucune réponse reçue, request:', error.request);
      throw new Error('Le serveur n’a pas répondu (timeout ou problème réseau).');
    }
    console.error('Erreur inattendue:', error.message);
    throw new Error(error.message);
  }
}

// Obtenir tous les Users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    throw error;
  }
};

// Mettre à jour un User
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.patch(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’utilisateur :', error);
    throw error;
  }
};

// Supprimer un User
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur :', error);
    throw error;
  }
};
