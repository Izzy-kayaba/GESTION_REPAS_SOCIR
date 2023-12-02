import moment from 'moment';
import 'moment/locale/fr'; // Import French locale
import React, { useEffect, useState } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';


function RepasAgentsTable() {  // Fetch data from the repas_agents table

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');



    useEffect(() => {
        // Combine data from repas_agents with related tables
        if (repasAgents && agents && condiments && accompagnements && aliments) {
            const processedData = repasAgents.map((repasAgent: any) => ({
                ...repasAgent,
                nom_agent: agents.find((agent: any) => agent.id_agent === repasAgent.id_agent)?.nom_agent,
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
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Agent</th>
                        <th>Condiment</th>
                        <th>Accompagnement</th>
                        <th>Aliment</th>
                        <th>Prix</th>
                        <th>Date Créé</th>
                        <th>Commentaires</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row) => (
                        <tr key={row.id_repas_agent}>
                            <td>{row.id_repas_agent}</td>
                            <td>{row.nom_agent}</td>
                            <td>{row.nom_condiment}</td>
                            <td>{row.nom_accompagnement}</td>
                            <td>{row.nom_aliment}</td>
                            <td>{row.prix}</td>
                            <td>{moment(row.date_cree).format('Do MMMM YYYY')}</td>
                            <td>{row.commentaires}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default RepasAgentsTable;
