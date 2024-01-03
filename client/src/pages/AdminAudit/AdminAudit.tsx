import React, { useEffect, useState } from 'react';
import Table from "../../elements/Table/Table";
import { Card } from 'react-bootstrap';

const AdminAudit: React.FC = () => {

    const tableColumns = [
        { title: 'Matricule', dataKey: 'matr_agent' },
        { title: 'Agent', dataKey: 'id_agent' },
        { title: 'Entite', dataKey: 'id_entite' },
        { title: 'Departement', dataKey: 'id_dep' },
        { title: 'Tour', dataKey: 'id_tour' },
        { title: 'Condiment', dataKey: 'id_condiment' },
        { title: 'Accompagnement', dataKey: 'id_accompagnement' },
        { title: 'Aliment', dataKey: 'id_aliment' },
        { title: 'Prix', dataKey: 'prix' },
        { title: 'Jour Du Repas', dataKey: 'date_cree' },
        { title: 'Commentaire', dataKey: 'commentaires' }
    ];

    // Utiliser l'état pour gérer les données lisibles par les utilisateurs
    const [displayData, setDisplayData] = useState<any[]>([]);
    const [filterBy, setFilterby] = useState<any>("")

    useEffect(() => {
        const zuaData = async () => {
            try {
                var data = await fetch("http://localhost:1100/api/repas-agents");
                var dataYagents = await fetch("http://localhost:1100/api/agents");
                var dataYaCondiments = await fetch("http://localhost:1100/api/condiments");

                if (!data.ok) {
                    throw new Error(`HTTP error! Status: ${data.status}`);
                }
                const agentsConvertis = await dataYagents.json();
                const condimentsConvertis = await dataYaCondiments.json();
                const dataConvertis = await data.json();

                const dataCombine = dataConvertis.map((dataConverti: any) => ({
                    ...dataConverti,
                    matr_agent: agentsConvertis.find((agent: any) => agent.id_agent == dataConverti.id_agent)?.matr_agent,
                    id_agent: agentsConvertis.find((agent: any) => agent.id_agent == dataConverti.id_agent)?.nom_agent,
                    id_condiment: condimentsConvertis.find((condiment: any) => condiment.id_condiment == dataConverti.id_condiment)?.nom_condiment
                }))

                setDisplayData(dataCombine)
            }
            catch (error) {
                console.log(error)
            }
        }

        zuaData();
    }, [])

    console.log("filterBy", filterBy)

    const dataFiltered = displayData?.filter((data) =>
        data["matr_agent"] == 4456
    )

    console.log(dataFiltered)


    return (
        <div>
            {/* <div>
                <label htmlFor="">Trier</label>
                <select name="" id="">
                    <option value="">Par entite</option>
                    <option value="">Par entite</option>
                </select>
            </div>

            <div className="d-flex align-items-center">
                <div>
                    <label htmlFor="">Filter par : </label>
                    <select name="" id="" value={filterBy} onChange={(e: any) => setFilterby(e.target?.value)}>
                        {tableColumns.map((table, index) =>
                            <option value={table.title} key={index}>{table.title}</option>
                        )}
                    </select>
                </div>
                <div>
                    <input type="text" placeholder={filterBy} />
                </div>
            </div> */}

            <Card className="m-1 p-2">
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Matricule</label>
                        <input type="text" placeholder='Matricule' />
                    </div>
                    <div className="col">
                        <label htmlFor="">Agent</label>
                        <input type="text" placeholder='Agent' />
                    </div>
                    <div className="col">
                        <label htmlFor="">Aliment</label>
                        <select name="" id="" value={filterBy} onChange={(e: any) => setFilterby(e.target?.value)}>
                            {tableColumns.map((table, index) =>
                                <option value={table.title} key={index}>{table.title}</option>
                            )}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="">Accompagnement</label>
                        <select name="" id="" value={filterBy} onChange={(e: any) => setFilterby(e.target?.value)}>
                            {tableColumns.map((table, index) =>
                                <option value={table.title} key={index}>{table.title}</option>
                            )}
                        </select>
                    </div>

                    <div className="col">
                        <label htmlFor="">Condiment</label>
                        <select name="" id="" value={filterBy} onChange={(e: any) => setFilterby(e.target?.value)}>
                            {tableColumns.map((table, index) =>
                                <option value={table.title} key={index}>{table.title}</option>
                            )}
                        </select>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
                Card
            </Card>

            <Table columns={tableColumns} data={dataFiltered} rowsPerPage={10} isLink={false} />
        </div>
    )
}

export default AdminAudit
