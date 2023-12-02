import moment from 'moment';
import React, { useEffect, useState, useReducer } from 'react';
import useFetch from '../../hooks/useFetch';


function AdminRepas() {

    const agents: any = useFetch({ endpoint: "api/agents" });
    const repasAgents: any = useFetch({ endpoint: "api/repas-agents" });
    const aliments: any = useFetch({ endpoint: "api/aliments" });
    const condiments: any = useFetch({ endpoint: "api/condiments" });
    const accompagnements: any = useFetch({ endpoint: "api/accompagnements" });

    console.log("agents", agents.data);
    console.log("repasAgents", repasAgents.data);
    console.log("aliments", aliments.data);
    console.log("condiments", condiments.data);

    return (
        <div className="p-2">
        </div>
    )
}

export default AdminRepas