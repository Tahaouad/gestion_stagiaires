const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Connect to the database
const sequelize = new Sequelize('gestion_stagiaires', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the models for Stagiaires, Departements, and Tuteurs
const Stagiaire = sequelize.define('Stagiaire', {
  Nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DateNaissance: {
    type: DataTypes.DATE,
  },
  Adresse: {
    type: DataTypes.STRING,
  },
  Telephone: {
    type: DataTypes.STRING,
  },
  DepartementID: {
    type: DataTypes.INTEGER,
  },
  TuteurID: {
    type: DataTypes.INTEGER,
  },
});

const Departement = sequelize.define('Departement', {
  NomDepartement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Tuteur = sequelize.define('Tuteur', {
  Nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
  },
  Telephone: {
    type: DataTypes.STRING,
  },
});

// Define relationships
Stagiaire.belongsTo(Departement, { foreignKey: 'DepartementID' });
Stagiaire.belongsTo(Tuteur, { foreignKey: 'TuteurID' });

// Sync the models with the database
sequelize.sync() 
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

// Create a new Stagiaire
app.post('/stagiaires', async (req, res) => {
  try {
    const { Nom, Prenom, DateNaissance, Adresse, Telephone, DepartementID, TuteurID } = req.body;
    const newStagiaire = await Stagiaire.create({
      Nom,
      Prenom,
      DateNaissance,
      Adresse,
      Telephone,
      DepartementID,
      TuteurID,
    });
    res.status(201).json(newStagiaire);
  } catch (err) {
    console.error('Error creating stagiaire:', err);
    res.status(500).json({ error: 'Unable to create stagiaire' });
  }
});

// Get all Stagiaires
app.get('/stagiaires', async (req, res) => {
  try {
    const stagiaires = await Stagiaire.findAll();
    res.json(stagiaires);
  } catch (err) {
    console.error('Error fetching stagiaires:', err);
    res.status(500).json({ error: 'Unable to fetch stagiaires' });
  }
});

// Get a specific Stagiaire by ID
app.get('/stagiaires/:id', async (req, res) => {
  try {
    const stagiaireId = req.params.id;
    const stagiaire = await Stagiaire.findByPk(stagiaireId);
    if (stagiaire) {
      res.json(stagiaire);
    } else {
      res.status(404).json({ error: 'Stagiaire not found' });
    }
  } catch (err) {
    console.error('Error fetching stagiaire:', err);
    res.status(500).json({ error: 'Unable to fetch stagiaire' });
  }
});

// Update a Stagiaire by ID
app.put('/stagiaires/:id', async (req, res) => {
  try {
    const stagiaireId = req.params.id;
    const { Nom, Prenom, DateNaissance, Adresse, Telephone, DepartementID, TuteurID } = req.body;
    const updatedStagiaire = await Stagiaire.update(
      {
        Nom,
        Prenom,
        DateNaissance,
        Adresse,
        Telephone,
        DepartementID,
        TuteurID,
      },
      {
        where: { ID: stagiaireId },
      }
    );
    if (updatedStagiaire[0]) {
      res.status(200).json({ message: 'Stagiaire updated successfully' });
    } else {
      res.status(404).json({ error: 'Stagiaire not found' });
    }
  } catch (err) {
    console.error('Error updating stagiaire:', err);
    res.status(500).json({ error: 'Unable to update stagiaire' });
  }
});

// Delete a Stagiaire by ID
app.delete('/stagiaires/:id', async (req, res) => {
  try {
    const stagiaireId = req.params.id;
    const deletedStagiaire = await Stagiaire.destroy({
      where: { ID: stagiaireId },
    });
    if (deletedStagiaire) {
      res.status(200).json({ message: 'Stagiaire deleted successfully' });
    } else {
      res.status(404).json({ error: 'Stagiaire not found' });
    }
  } catch (err) {
    console.error('Error deleting stagiaire:', err);
    res.status(500).json({ error: 'Unable to delete stagiaire' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//========================================================================
// Get all Departement
app.get('/departements', async (req, res) => {
  try {
    const departements = await Departement.findAll();
    res.json(departements);
  } catch (err) {
    console.error('Error fetching stagiaires:', err);
    res.status(500).json({ error: 'Unable to fetch stagiaires' });
  }
});