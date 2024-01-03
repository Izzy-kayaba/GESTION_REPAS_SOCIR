import React, { useState, useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import ModalTemplate from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import CustomTable from '../../components/Table/Table';
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

  const tableColumns = [
    { title: 'Matricule', dataKey: 'matr_agent' },
    { title: 'Nom', dataKey: 'nom_agent' },
    { title: 'PostNom', dataKey: 'postnom_agent' },
    { title: 'Prenom', dataKey: 'prenom_agent' },
    { title: 'Sexe', dataKey: 'sexe' },
    { title: 'Tel', dataKey: 'contact' },
    { title: 'Email', dataKey: 'email_agent' },
    { title: 'Fonction', dataKey: 'agent_fonction' },
    { title: 'Entite', dataKey: 'agent_entite' },
    { title: 'Departement', dataKey: 'agent_departement' },
    { title: 'Tour', dataKey: 'agent_tour' },
  ];

  // Use state to manage the human-readable data
  // Utiliser l'état pour gérer les données lisibles par les utilisateurs

  const [displayData, setDisplayData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Terme de recherche

  // State hooks to store the data
  const { data: agents, isLoading, isError }: any = useFetch({ endpoint: "api/agents" });

  // Other api calls for select options
  const { data: tours }: any = useFetch({ endpoint: "api/tours" });
  const { data: entites }: any = useFetch({ endpoint: "api/entites" });
  const { data: fonctions }: any = useFetch({ endpoint: "api/fonctions" });
  const { data: departements }: any = useFetch({ endpoint: "api/departements" });

  useEffect(() => {
    // Combine data from repas_agents with related tables
    if (agents && entites && departements && fonctions && tours) {

      const processedData = agents.map((agent: any) => ({
        ...agent,
        agent_tour: tours.find((tour: any) => tour.id_tour === agent.id_tour)?.nom_tour,
        agent_entite: entites.find((entite: any) => entite.id_entite === agent.id_entite)?.nom_entite,
        agent_departement: departements.find((departement: any) => departement.id_dep === agent.id_dep)?.nom_dep,
        agent_fonction: fonctions.find((fonction: any) => fonction.id_fonction === agent.id_fonction)?.nom_fonction,
      }));
      setDisplayData(processedData);
    }
  }, [agents, entites, departements, fonctions, tours]);

  // Fonction pour gérer la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mise à jour du terme de recherche
    setSearchTerm(event.target.value);
  };

  // Filtrage des agents en fonction du terme de recherche
  const filteredAgents = displayData?.filter((agent) =>
    agent.nom_agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Rendu du composant
  return (
    <>
      <div className="d-flex justify-content-between p-2">
        <NavLink to={"../"} className="nav-link d-inline border border-1 rounded-2 p-2">
          Precedent
        </NavLink>

        <NavLink to={"./formulaire"} className="nav-link d-inline border border-1 rounded-2 p-2">
          Nouveau agent
        </NavLink>
      </div>
      {
        isLoading ?
          <Loader /> :
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
            <CustomTable columns={tableColumns} data={filteredAgents} rowsPerPage={10} isLink={true} />
          </div>
      }
    </>
  );
};

export default Agents;
