import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import ModalTemplate from '../../elements/Modal/Modal';
import Loader from '../../elements/Loader/Loader';
import FormTemplate from '../../elements/Form/FormTemplate';
import useFetch from '../../hooks/useFetch';
import CustomTable from '../../elements/Table/Table';
import { NavLink } from 'react-router-dom';
import AgentsForm from './AgentsForm';

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

  const tableColumns = [
    { title: 'Matricule', dataKey: 'matr_agent' },
    { title: 'Nom', dataKey: 'nom_agent' },
    { title: 'PostNom', dataKey: 'postnom_agent' },
    { title: 'Prenom', dataKey: 'prenom_agent' },
    { title: 'Sexe', dataKey: 'sexe' },
    { title: 'Tel', dataKey: 'contact' },
    { title: 'Email', dataKey: 'email_agent' }
  ];

  // State in the parent to hold the boolean value
  const [isChildChecked, setIsChildChecked] = useState(false);

  // State hooks to store the data
  const agents: any = useFetch({ endpoint: "api/agents" });
  const fonctions: any = useFetch({ endpoint: "api/fonctions" });

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
  const filteredAgents = sortedAgents?.filter((agent) =>
    agent.nom_agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Rendu du composant
  return (
    <>
      {!isChildChecked ?
        <div className="d-flex justify-content-between p-2">
          <NavLink to={"../"} className="nav-link d-inline border border-1 rounded-2 p-2">
            Precedent
          </NavLink>

          <Button variant="primary" onClick={() => setIsChildChecked(!isChildChecked)}>
            Nouveau agent
          </Button>
        </div>
        : null}

      {isChildChecked ?
        <AgentsForm />
        :
        <div className="p-2">
          {/* Formulaire de recherche */}
          <Form>
            <FormControl
              type="text"
              placeholder="Rechercher agent par nom"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
          <CustomTable columns={tableColumns} data={filteredAgents} rowsPerPage={10} />
        </div>
      }
    </>
  );
};

export default Agents;
