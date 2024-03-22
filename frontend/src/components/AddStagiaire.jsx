import React, { useEffect, useState } from 'react';
import { addStagiaire, getAllDepartements } from '../services/api';
import { AiOutlineUserAdd } from 'react-icons/ai';

const AddStagiaire = () => {
  const [departements,setDepartement] = useState([])
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [departementId, setDepartementId] = useState('');
  const [tuteurId, setTuteurId] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(()=>{
    getAllDepartements()
    .then(data => {
      setDepartement(data);
    })
  },[])
  console.log(departements)

  const handleSubmit = async e => {
    e.preventDefault();
    alert(departementId)
    // try {
    //   const newStagiaire = {
    //     Nom: nom,
    //     Prenom: prenom,
    //     DateNaissance: dateNaissance,
    //     Adresse: adresse,
    //     Telephone: telephone,
    //     DepartementID: parseInt(departementId), // Ensure the ID is an integer
    //     TuteurID: 1, // Assuming a default value for TuteurID
    //   };
    //   await addStagiaire(newStagiaire);
    //   setNom('');
    //   setPrenom('');
    //   setDateNaissance('');
    //   setAdresse('');
    //   setTelephone('');
    //   setDepartementId('');
    //   setTuteurId('');
    //   setError(null);
    // } catch (err) {
    //   console.error('Error adding stagiaire:', err);
    //   setError('Unable to add stagiaire. Please try again.');
    // }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 h-full ">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Ajouter un Stagiaire</h1>
      <form onSubmit={handleSubmit} className="w-1/3 mx-auto ">
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">Nom</label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="border border-gray-400 px-4 py-2 w-full"  />
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block text-gray-700 font-bold mb-2">Prénom</label>
          <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="border border-gray-400 px-4 py-2 w-full"  />
        </div>
        <div className="mb-4">
          <label htmlFor="dateNaissance" className="block text-gray-700 font-bold mb-2">Date de Naissance</label>
          <input type="date" id="dateNaissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} className="border border-gray-400 px-4 py-2 w-full"  />
        </div>
        <div className="mb-4">
          <label htmlFor="adresse" className="block text-gray-700 font-bold mb-2">Adresse</label>
          <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="border border-gray-400 px-4 py-2 w-full"  />
        </div>
        <div className="mb-4">
          <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">Téléphone</label>
          <input type="text" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="border border-gray-400 px-4 py-2 w-full"  />
        </div>
        <div className="mb-4">
          <label htmlFor="departement" className="block text-gray-700 font-bold mb-2">
            Departement
          </label>
          <select
            name="departement"
            id="departement"


            onChange={(e) =>setDepartementId(e.target.value)}
            className="border border-gray-400 px-4 py-2 w-full bg-white rounded-md"
          >
            {departements.map(d => (
              <option key={d.id} value={d.NomDepartement}>
                {d.NomDepartement}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 m-2">
          <AiOutlineUserAdd />
          <span>Ajouter stagiaire</span>
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddStagiaire;
