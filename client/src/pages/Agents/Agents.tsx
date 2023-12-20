import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import ModalTemplate from '../../elements/Modal/Modal';
import Loader from '../../elements/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import CustomTable from '../../elements/Table/Table';
import { NavLink } from 'react-router-dom';

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

const Agents: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  // Function to handle the form submission
  const handleAddAgent = (formData: Agent) => {
    // Perform any additional logic, validation, or API calls here
    // For now, just update the state with the new agent data
    agents = { ...formData };
  };

  const tableColumns = [
    { title: 'ID', dataKey: 'matr_agent' },
    { title: 'Nom', dataKey: 'nom_agent' },
    { title: 'Prenom', dataKey: 'prenom_agent' },
    { title: 'Sexe', dataKey: 'sexe' },
    { title: 'Date de Naissance', dataKey: 'date_naiss' },
    { title: 'Tel', dataKey: 'contact' },
    { title: 'Email', dataKey: 'email_agent' },
  ];

  // State hooks to store the data
  let agents: any = useFetch({ endpoint: "api/agents" });
  const [sortedAgents, setSortedAgents] = useState<Agent[]>([]); // Liste triée des agents
  const [searchTerm, setSearchTerm] = useState<string>(''); // Terme de recherche

  useEffect(() => {
    if (agents && agents.data) {
      setSortedAgents(agents.data);
    }
  }, [agents]);


  // Fonction pour gérer la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mise à jour du terme de recherche
    setSearchTerm(event.target.value);
  };

  // Filtrage des agents en fonction du terme de recherche
  const filteredAgents = sortedAgents.filter((agent) =>
    agent.nom_agent.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Rendu du composant
  return (
    <div className="p-2">

      <div className="py-3">
        <NavLink to={"../"} className="nav-link d-inline border border-1 rounded-2 p-2 ">
          Precedent
        </NavLink>
      </div>


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

      <CustomTable columns={tableColumns} data={filteredAgents} rowsPerPage={5} />

    </div>
  );
};

export default Agents;
