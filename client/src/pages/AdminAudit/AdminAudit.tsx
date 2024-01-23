import React, { useEffect, useState } from 'react';
import CustomTable from "../../components/Table/Table";
import { Card } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import InputControl from '../../components/Form/InputControl';
import Loader from '../../components/Loader/Loader';

const AdminAudit: React.FC = () => {

    const tableColumns = [
        { title: 'Matricule', dataKey: 'matr_agent' },
        { title: 'Agent', dataKey: 'nom_agent' },
        { title: 'Entite', dataKey: 'entite_agent' },
        { title: 'Departement', dataKey: 'departement_agent' },
        { title: 'Tour', dataKey: 'tour_agent' },
        { title: 'Condiment', dataKey: 'condiment' },
        { title: 'Accompagnement', dataKey: 'accompagnement' },
        { title: 'Aliment', dataKey: 'aliment' },
        { title: 'Prix', dataKey: 'prix' },
        { title: 'Jour Du Repas', dataKey: 'date_cree' },
        { title: 'Commentaire', dataKey: 'commentaires' }
    ];

    const initialFormData = {
        matricule: "",
        agent: "",
        entite: ""
    }

    // Utiliser l'état pour gérer les données lisibles par les utilisateurs
    const [displayData, setDisplayData] = useState<any[]>([]);
    const [filterBy, setFilterby] = useState<any>("");
    const [formValues, setFormValues] = useState<any>(initialFormData);

    // State hooks to store the data
    const { data, isLoading, isError }: any = useFetch({ endpoint: "api/repas-agents" });

    // Other api calls for select options
    const { data: tours }: any = useFetch({ endpoint: "api/tours" });
    const { data: agents }: any = useFetch({ endpoint: "api/agents" });
    const { data: entites }: any = useFetch({ endpoint: "api/entites" });
    const { data: aliments }: any = useFetch({ endpoint: "api/aliments" });
    const { data: fonctions }: any = useFetch({ endpoint: "api/fonctions" });
    const { data: condiments }: any = useFetch({ endpoint: "api/condiments" });
    const { data: departements }: any = useFetch({ endpoint: "api/departements" });
    const { data: accompagnements }: any = useFetch({ endpoint: "api/accompagnements" });

    useEffect(() => {
        // Combine data from repas_agents with related tables
        if (data && entites && departements && fonctions && tours) {
            const processedData = data?.map((item: any) => ({
                ...item,
                matr_agent: agents?.data.find((agent: any) => agent.id_agent === item.id_agent)?.matr_agent,
                nom_agent: agents?.data.find((agent: any) => agent.id_agent === item.id_agent)?.nom_agent,
                condiment: condiments?.data.find((condiment: any) => condiment.id_condiment === item.id_condiment)?.nom_condiment,
                aliment: aliments?.data.find((aliment: any) => aliment.id_aliment === item.id_aliment)?.nom_aliment,
                accompagnement: accompagnements?.data.find((accompagnement: any) => accompagnement.id_accompagnement === item.id_accompagnement)?.nom_accompagnement,
                agent_fonction: fonctions?.data.find((fonction: any) => fonction.id_fonction === item.id_fonction)?.nom_fonction,
                tour_agent: tours?.data.find((tour: any) => tour.id_tour === agents?.data.find((agent: any) => agent.id_agent === item.id_agent)?.id_tour)?.nom_tour,
                entite_agent: entites?.data.find((entite: any) => entite.id_entite === agents?.data.find((agent: any) => agent.id_agent === item.id_agent)?.id_entite)?.nom_entite,
                departement_agent: departements?.data.find((department: any) => department.id_dep === agents?.data.find((agent: any) => agent.id_agent === item.id_agent)?.id_dep)?.nom_dep,
            }));

            setDisplayData(processedData);
        }
    }, [data, entites, departements, fonctions, tours]);

    const filteredData = displayData?.filter((item) =>
        item.nom_agent?.toLowerCase().includes(formValues.agent.toLowerCase())
    )?.filter((item) =>
        item.matr_agent?.toLowerCase().includes(formValues.matricule.toLowerCase())
    )?.filter((item) => {
        if (formValues.entite.length == 0) {
            return item.entite_agent
        }
        else { return item.entite_agent = formValues.entite }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target ?? {}; // Use nullish coalescing to provide an empty object as default
        setFormValues((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="m-1" >
            <Card className="px-2 mb-5">
                <div className="row mb-2">
                    <div className="col-2 p-1">
                        <div className=" p-2">
                            <InputControl
                                label="Matricule"
                                id='matricule'
                                value={formValues?.matricule}
                                type='text'
                                name='matricule'
                                placeholder="e.g. 3902"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-2 p-1">
                        <div className=" p-2">
                            <InputControl
                                label="Agent"
                                id='agent'
                                value={formValues?.agent}
                                type='text'
                                name='agent'
                                placeholder="John Smith"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="id_entite">Entite</label>
                            <select name="" id="" value={filterBy} onChange={(e: any) => setFilterby(e.target?.value)}>
                                <option value="">Select</option>
                                {tableColumns.map((table, index) =>
                                    <option value={table.title} key={index}>{table.title}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="id_entite">Entite</label>
                            <select name="" id="" value={filterBy} onChange={(e: any) => setFilterby(e.target?.value)}>
                                {tableColumns.map((table, index) =>
                                    <option value={table.title} key={index}>{table.title}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="id_entite">Entite</label>
                            <select name="entite" id="entite" value={formValues.entite} onChange={handleChange}>
                                <option value=""> Select an entite </option>
                                {entites?.map((item: any) =>
                                    <option value={item.nom_entite} key={item.id_entite}>{item.nom_entite}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="border border-1 p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="border border-1 p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                    <div className="col-2 p-1">
                        <div className="border border-1 p-2">
                            <label htmlFor="">Texte</label>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <button>Filter</button>
                    </div>
                    <div>
                        <select name="" id="">
                            <option value="">Optin 1</option>
                            <option value="">Optin 2</option>
                        </select>
                    </div>
                </div>
            </Card>

            {
                isLoading ?
                    <Loader /> :
                    <CustomTable columns={tableColumns} data={filteredData} rowsPerPage={10} isLink={false} />
            }

        </div>
    )
}

export default AdminAudit;
