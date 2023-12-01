import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import ModalTemplate from '../../elements/Modal/Modal';
import Loader from '../../elements/Loader/Loader';

type Agent = {
  id_agent?: number;
  matr_agent: string;
  nom_agent: string;
  postnom_agent: string;
  prenom_agent: string;
  contact: string;
  email_agent: string;
  image: string; // Supposant que vous convertissez les données BYTEA en une chaîne base64
  sexe: string;
  lieu_naiss: string;
  date_naiss: string;
}
 
const AdminAgents: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  // Function to handle the form submission
  const handleAddAgent = (formData: Agent) => {
    // Perform any additional logic, validation, or API calls here
    // For now, just update the state with the new agent data
    setAgents((prevAgents) => [...prevAgents, formData]);
  };


  // State hooks pour stocker les données
  const [agents, setAgents] = useState<Agent[]>([]); // Liste complète des agents
  const [sortedAgents, setSortedAgents] = useState<Agent[]>([]); // Liste triée des agents
  const [searchTerm, setSearchTerm] = useState<string>(''); // Terme de recherche
  const [currentPage, setCurrentPage] = useState<number>(1); // Numéro de page actuelle

  const agentsPerPage = 3; // Nombre d'agents à afficher par page
  const totalPages = Math.ceil(sortedAgents.length / agentsPerPage); // Calcul du nombre total de pages

  // Effet pour récupérer les données lorsque le composant est monté
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête pour récupérer les données depuis le serveur
        const response = await fetch('http://localhost:1100/api/agents');
        // Conversion de la réponse en format JSON
        const data = await response.json();
        // Mise à jour des états avec les données récupérées
        setAgents(data);
        setSortedAgents(data); // L'affichage initial n'est pas trié
      } catch (error) {
        // Gestion des erreurs lors de la récupération des données
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    // Appel de la fonction pour récupérer les données
    fetchData();
  }, []); // Le tableau vide indique que cet effet ne dépend d'aucune variable, donc il s'exécute une fois

  // Fonction pour gérer le tri des agents en fonction d'un champ
  const handleSort = (field: keyof Agent) => {
    // Copie triée de la liste complète des agents
    const sorted = [...agents].sort((a, b) => {
      const aValue = a[field] ?? ''; // Use an empty string as a default value
      const bValue = b[field] ?? '';

      return aValue > bValue ? 1 : -1;
    });

    setSortedAgents(sorted);
  };

  // Fonction pour gérer la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mise à jour du terme de recherche
    setSearchTerm(event.target.value);
  };

  // Fonctions pour gérer la navigation entre les pages
  const handlePreviousPage = () => {
    // Décrémentation de la page actuelle, mais pas en dessous de 1
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    // Incrémentation de la page actuelle, mais pas au-dessus du nombre total de pages
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Calcul des indices de début et de fin pour afficher les agents sur la page actuelle
  const startIdx = (currentPage - 1) * agentsPerPage;
  const endIdx = startIdx + agentsPerPage;

  // Filtrage des agents en fonction du terme de recherche
  const filteredAgents = sortedAgents.filter((agent) =>
    agent.nom_agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sélection des agents à afficher sur la page actuelle
  const displayedAgents = filteredAgents.slice(startIdx, endIdx);

  // Rendu du composant
  return (
    <div className="p-2">
      {/* Button to open the modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Ajouter un agent
      </Button>

      <ModalTemplate
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleAddAgent}
      />

      {/* Formulaire de recherche */}
      <Form>
        <FormControl
          type="text"
          placeholder="Rechercher par Nom"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>

      {/* Tableau Bootstrap pour afficher les agents */}
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* En-têtes de colonnes avec la possibilité de trier */}
            <th>Matricule</th>
            <th onClick={() => handleSort('nom_agent')}>Nom Agent</th>
            <th>Prénom</th>
            <th>Sexe</th>
          </tr>
        </thead>
        <tbody>
          { displayedAgents.length < 1 ? 
          <Loader></Loader> : 
            displayedAgents.map((agent) => (
              <tr key={agent.id_agent}>
                <td>{agent.matr_agent}</td>
                <td>{agent.nom_agent}</td>
                <td>{agent.prenom_agent}</td>
                <td>{agent.sexe}</td>
              </tr>
            ))}
          {/* Affichage des lignes d'agents */}
        </tbody>
      </Table>

      {/* Navigation entre les pages */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Bouton pour passer à la page précédente, désactivé s'il n'y a pas de page précédente */}
        <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="secondary">
          Précédent
        </Button>
        {/* Affichage du numéro de page actuelle et du nombre total de pages */}
        <span>{`Page ${currentPage} sur ${totalPages}`}</span>
        {/* Bouton pour passer à la page suivante, désactivé s'il n'y a pas de page suivante */}
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default AdminAgents;
