import React, { useEffect, useState } from 'react';
import CustomTable from "../../components/Table/Table";
import useFetch from '../../hooks/useFetch';
import InputControl from '../../components/Form/InputControl';
import Loader from '../../components/Loader/Loader';
import SelectContol from '../../components/Form/SelectControl';
import { Button } from '../../components/Accessories/Button';

const AdminAudit: React.FC = () => {

    interface FormData {
        matricule: number;
        agent: string;
        entite: number;
        departement: number;
        tour: number;
        condiment: number;
        accompagnement: number;
        aliment: number;
        prix: number;
        startingDate: Date;
        closingDate: Date;
    }

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
        entite: "",
        departement: "",
        tour: "",
        condiment: "",
        accompagnement: "",
        aliment: "",
        prix: "",
        startingDate: "",
        closingDate: ""
    }

    // Utiliser l'état pour gérer les données lisibles par les utilisateurs
    const [displayData, setDisplayData] = useState<any[]>([]);
    const [repasAgents, setRepasAgents] = useState<any[]>([]);
    const [filterBy, setFilterby] = useState<any>("");
    const [formValues, setFormValues] = useState<any>(initialFormData);

    // State hooks to store the data
    const { data, isLoading, isError }: any = useFetch({ endpoint: `api/repas-agents?populate[id_agent][populate]=*` })

    // Other api calls for select options
    const { data: tours }: any = useFetch({ endpoint: "api/tours" });
    const { data: agents }: any = useFetch({ endpoint: "api/agents" });
    const { data: entites }: any = useFetch({ endpoint: "api/entites" });
    const { data: aliments }: any = useFetch({ endpoint: "api/aliments" });
    const { data: fonctions }: any = useFetch({ endpoint: "api/fonctions" });
    const { data: condiments }: any = useFetch({ endpoint: "api/condiments" });
    const { data: departements }: any = useFetch({ endpoint: "api/departements" });
    const { data: accompagnements }: any = useFetch({ endpoint: "api/accompagnements" });

    const processRepasAgents = (data: any[]) => {
        return data.map((item: any) => ({
            id_repas_agent: item.id,
            ...item?.attributes,
            matr_agent: item?.attributes?.id_agent?.data?.attributes?.matr_agent,
            nom_agent: item?.attributes?.id_agent?.data?.attributes?.nom_agent,
            aliment: item?.attributes?.id_agent?.data?.attributes?.id_aliment?.data?.attributes?.nom_aliment,
            condiment: item?.attributes?.id_agent?.data?.attributes?.id_condiment?.data?.attributes?.nom_condiment,
            accompagnement: item?.attributes?.id_agent?.data?.attributes?.id_accompagnement?.data?.attributes?.nom_accompagnement,
            agent_fonction: item?.attributes?.id_agent?.data?.attributes?.id_fonction?.data?.attributes?.nom_fonction,
            tour_agent: item?.attributes?.id_agent?.data?.attributes?.id_tour?.data?.attributes?.nom_tour,
            entite_agent: item?.attributes?.id_agent?.data?.attributes?.id_entite?.data?.attributes?.nom_entite,
            departement_agent: item?.attributes?.id_agent?.data?.attributes?.id_departement?.data?.attributes?.nom_departement,
            date_cree: item.attributes.createdAt,
        }));
    };

    useEffect(() => {
        // Combine data from repas_agents with related tables
        if (data) {
            setRepasAgents(data?.data);
            setDisplayData(processRepasAgents(data?.data));
        }
    }, [data]);

    const handleSearch = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_MODE}/api/repas-agents?populate[id_agent][populate]=*&filters[id_agent][nom_agent][$startsWithi]=${formValues.agent}` +
                `&filters[id_agent][id_tour][id][$containsi]=${formValues.tour}` +
                `&filters[id_agent][id_entite][id][$containsi]=${formValues.entite}` +
                `&filters[id_agent][id_aliment][id][$containsi]=${formValues.aliment}` +
                `&filters[id_agent][matr_agent][$startsWithi]=${formValues.matricule}` +
                `&filters[id_agent][id_condiment][id][$containsi]=${formValues.condiment}` +
                `&filters[id_agent][id_departement][id][$containsi]=${formValues.departement}` +
                `&filters[id_agent][id_accompagnement][id][$containsi]=${formValues.accompagnement}`);
            // `&filters[$and][0][createdAt][$gte]=${formValues?.startingDate}` +
            // `&filters[$and][1][createdAt][$lte]=${formValues?.closingDate}`

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setRepasAgents(data?.data);
            setDisplayData(processRepasAgents(data?.data));
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target ?? {}; // Use nullish coalescing to provide an empty object as default
        setFormValues((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(formValues)

    return (
        <div className="m-1" >
            <div className="card px-2 mb-5">
                <div className="row mb-2">
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <InputControl
                                label="Matricule"
                                id='matricule'
                                value={formValues?.matricule}
                                type='number'
                                name='matricule'
                                placeholder="e.g. 3902"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
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

                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Entite'
                                name='entite'
                                id='entite'
                                value={formValues?.entite}
                                onChange={handleChange}
                                disabled={false}
                                options={entites}
                                option='nom_entite'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Departement'
                                name='departement'
                                id='departement'
                                value={formValues?.departement}
                                onChange={handleChange}
                                disabled={false}
                                options={departements}
                                option='nom_departement'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Tour'
                                name='tour'
                                id='tour'
                                value={formValues?.tour}
                                onChange={handleChange}
                                disabled={false}
                                options={tours}
                                option='nom_tour'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>

                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Condiment'
                                name='condiment'
                                id='condiment'
                                value={formValues?.condiment}
                                onChange={handleChange}
                                disabled={false}
                                options={condiments}
                                option='nom_condiment'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Accompagnement'
                                name='accompagnement'
                                id='accompagnement'
                                value={formValues?.accompagnement}
                                onChange={handleChange}
                                disabled={false}
                                options={accompagnements}
                                option='nom_accompagnement'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Aliment'
                                name='aliment'
                                id='aliment'
                                value={formValues?.aliment}
                                onChange={handleChange}
                                disabled={false}
                                options={aliments}
                                option='nom_aliment'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <InputControl
                                label="Prix"
                                id='prix'
                                value={formValues?.prix}
                                type='number'
                                name='prix'
                                placeholder="e.g. 1000FC"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <SelectContol
                                label='Departement'
                                name='departement'
                                id='departement'
                                value={formValues?.departement}
                                onChange={handleChange}
                                disabled={false}
                                options={departements}
                                option='nom_departement'
                                defaultMessage='- Tout sélectionner -'
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <InputControl
                                label="Commencant"
                                id='startingDate'
                                value={formValues?.startingDate}
                                type='date'
                                name='startingDate'
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-xl-2 p-1">
                        <div className="p-2">
                            <InputControl
                                label="Terminant"
                                id='closingDate'
                                value={formValues?.closingDate}
                                type='date'
                                name='closingDate'
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <div>
                        <Button onClick={handleSearch}>
                            Testing
                        </Button>
                    </div>
                    <div>
                        <select name="" id="">
                            <option value="">Optin 1</option>
                            <option value="">Optin 2</option>
                        </select>
                    </div>
                </div>
            </div>
            <CustomTable columns={tableColumns} data={displayData} rowsPerPage={2} error={isError} isLink={false} />
        </div>
    )
}

export default AdminAudit;
