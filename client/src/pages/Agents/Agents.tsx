import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import CustomTable from '../../components/Table/Table';
import { NavLink } from 'react-router-dom';
import { Formik } from "formik";

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
  const { data: agents, isLoading, isError }: any = useFetch({ endpoint: `api/agents?populate=*&filters[nom_agent][$containsi]=${searchTerm}` });

  // Other api calls for select options
  const { data: tours }: any = useFetch({ endpoint: "api/tours?populate=*" });
  const { data: entites }: any = useFetch({ endpoint: "api/entites?populate=*" });
  const { data: fonctions }: any = useFetch({ endpoint: "api/fonctions?populate=*" });
  const { data: departements }: any = useFetch({ endpoint: "api/departements?populate=*" });

  useEffect(() => {

    if (agents?.data && entites?.data && departements?.data && fonctions?.data && tours?.data) {
      // Combine data from repas_agents with related tables
      const processedData = agents?.data.map((agent: any) => ({
        id_agent: agent.id,
        ...agent?.attributes,
        agent_tour: tours?.data.find((tour: any) => tour.id === agent?.attributes?.id_tour?.data?.id)?.attributes.nom_tour,
        agent_entite: entites?.data.find((entite: any) => entite.id === agent?.attributes?.id_entite?.data?.id)?.attributes.nom_entite,
        agent_fonction: fonctions?.data.find((fonction: any) => fonction.id === agent?.attributes?.id_fonction?.data?.id)?.attributes.nom_fonction,
        agent_departement: departements?.data.find((departement: any) => departement.id === agent?.attributes?.id_departement?.data?.id)?.attributes.nom_departement
      }));
      setDisplayData(processedData);
    }
  }, [agents, entites, departements, fonctions, tours]);

  console.log(displayData)

  // Fonction pour gérer la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mise à jour du terme de recherche
    setSearchTerm(event.target.value);
  };


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

      <div className="p-2">
        {/* Formulaire de recherche */}

        <Formik
          initialValues={{ name: 'jared' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {() => (
            <form>
              <input
                type="text"
                placeholder="Rechercher agent par nom"
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>
          )}
        </Formik>
      </div >
      {
        isLoading ?
          <Loader /> :
          <div className="p-2">
            <CustomTable columns={tableColumns} data={displayData} rowsPerPage={2} isLink={true} />
          </div>
      }
    </>
  );
};

export default Agents;
