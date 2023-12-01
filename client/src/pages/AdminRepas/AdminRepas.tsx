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
                const res = await response.json()
                setData(res)

            } catch (error) {
                console.log(error)

            }
        }
        fetchData();

        fileteredData = data?.filter((date: any) => {
            return date.date_cree < moment(today).format()
         })
         console.log("fileteredData", fileteredData)

    }, [])


    return (
        <div className="p-2">

            <ul> {data.map((item: any) => (
                <>
                    <li className='text-dark'> {item.id_agent} - {moment(new Date(item.date_cree)).calendar()}</li>
                </>
            ))}
            </ul>

        </div>
    )
}

export default AdminRepas