import React, { useState, useEffect } from 'react';
import { deleteStagiaire, getAllStagiaires } from '../services/api';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineUserAdd, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const StagiaireList = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllStagiaires()
      .then(data => {
        setStagiaires(data);
      })
      .catch(error => {
        console.error('ERR Error fetching stagiaires:', error);
        setError('Unable to fetch stagiaires. Please try again later.');
      });
  }, [stagiaires]);

  const handleEdit = id => {
    console.log('Edit ID:', id);
  };

  const handleDelete = id => {
    console.log('Delete ID:', id);
    deleteStagiaire(id);
  };

  const handleDetails = id => {
    console.log('Details ID:', id);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Gestion des Stagiaires</h1>
      <Link to={'/AjouterStagiare'}>
        <button type="button" title='Ajouter un stagiare' className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 m-2">
          <AiOutlineUserAdd />
          <span>Ajouter stagiaire</span>
        </button>
      </Link>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full table-auto bg-white shadow-md">
        <thead >
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Nom</th>
            <th className="border border-gray-400 px-4 py-2">Prénom</th>
            <th className="border border-gray-400 px-4 py-2 w-30">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.map(stagiaire => (
            <tr key={stagiaire.id} className="hover:bg-gray-200 cursor-pointer">
              <td className="border text-center border-gray-400 px-4 py-2">{stagiaire.Nom}</td>
              <td className="border text-center border-gray-400 px-4 py-2">{stagiaire.Prenom}</td>
              <td  className="border-gray-400 px-4 py-3 flex justify-center space-x-2 border">
                <button
                  title='Modifier le stagiare'
                  onClick={() => handleEdit(stagiaire.id)}
                  className="text-white hover:text-blue-700 border p-2 rounded-full bg-blue-500"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  title='suppriemr le stagiare'
                  onClick={() => handleDelete(stagiaire.id)}
                  className="text-white hover:text-red-700 border p-2 rounded-full bg-red-500"
                >
                  <AiOutlineDelete />
                </button>
                <button
                  title='Voir details de stagiare'
                  onClick={() => handleDetails(stagiaire.id)}
                  className="text-white hover:text-orange-700 border p-2 rounded-full bg-orange-400"
                >
                  <AiOutlineEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StagiaireList;

