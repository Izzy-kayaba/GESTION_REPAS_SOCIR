import moment from 'moment';
import 'moment/locale/fr'; // Import French locale
import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import CustomTable from '../../elements/Table/Table';

const AdminAudit: React.FC = () => { // Fetch data from the repas_agents table

    moment.locale("fr"); // Translate the date in french

    const todayFormatted = moment().format('Do MMMM YYYY');  // Get today's date in the same format as 'date_cree'

    const { data: repasAgents, isLoading, isError }: any = useFetch({ endpoint: "api/repas-agents" });

    // Fetch data from related tables (agents, condiments, accompagnements, aliments)
    const { data: agents }: any = useFetch({ endpoint: "api/agents" });
    const { data: condiments }: any = useFetch({ endpoint: "api/condiments" });
    const { data: accompagnements }: any = useFetch({ endpoint: "api/accompagnements" });
    const { data: aliments }: any = useFetch({ endpoint: "api/aliments" });

    // Use state to manage the human-readable data
    const [displayData, setDisplayData] = useState<any[]>([]);
    // Filter data where 'date_cree' is equal to today
    const filteredData = displayData.filter((row) => moment(row.date_cree).format('Do MMMM YYYY') === todayFormatted);

    const tableColumns = [
        { title: 'MAT', dataKey: 'matr_agent' },
        { title: 'Agent', dataKey: 'nom_agent' },
        { title: 'Entite', dataKey: 'agent_entite' },
        { title: 'Condiment', dataKey: 'nom_condiment' },
        { title: 'Accompagnement', dataKey: 'nom_accompagnement' },
        { title: 'Aliment', dataKey: 'nom_aliment' },
        { title: 'Prix', dataKey: 'prix' },
        { title: 'Date Créé', dataKey: 'date_cree' },
        { title: 'Commentaires', dataKey: 'commentaires' },
    ];

    useEffect(() => {
        // Combine data from repas_agents with related tables
        if (repasAgents && agents && condiments && accompagnements && aliments) {
            const processedData = repasAgents.map((repasAgent: any) => ({
                ...repasAgent,
                matr_agent: agents.find((agent: any) => agent.id_agent === repasAgent.id_agent)?.matr_agent,
                nom_agent: agents.find((agent: any) => agent.id_agent === repasAgent.id_agent)?.nom_agent,
                agent_entite: agents.find((agent: any) => agent.id_agent === repasAgent.id_agent)?.id_entite,
                agent_departement: agents.find((agent: any) => agent.id_agent === repasAgent.id_agent)?.id_dep,
                nom_condiment: condiments.find((condiment: any) => condiment.id_condiment === repasAgent.id_condiment)?.nom_condiment,
                nom_accompagnement: accompagnements.find((acc: any) => acc.id_accompagnement === repasAgent.id_accompagnement)?.nom_accompagnement,
                nom_aliment: aliments.find((aliment: any) => aliment.id_aliment === repasAgent.id_aliment)?.nom_aliment,
            }));

            setDisplayData(processedData);
        }

    }, [repasAgents, agents, condiments, accompagnements, aliments]);


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching data</p>;
    }

    return (
        <div>
            <CustomTable columns={tableColumns} data={filteredData} rowsPerPage={10} />
        </div>
    );
};

export default AdminAudit;
