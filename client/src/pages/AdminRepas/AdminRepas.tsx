import moment from 'moment';
import React, { useEffect, useState } from 'react'

function AdminRepas() {

    const [data, setData] = useState<any>([]);
    const today = new Date();
    let fileteredData = []

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:1100/api/repas-agents");
    
                // The fetch function doesn't throw an error for HTTP error status codes so check the ok property
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    


    return (
        <div className="p-2">
        </div>
    )
}

export default AdminRepas