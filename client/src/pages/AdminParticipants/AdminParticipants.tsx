import React from 'react'


const AdminParticipants: React.FC = () => {
    return (
        <div>
            <input name="country" list="countries"/>
            <datalist id="countries">
                <option value="Angola"/>
                <option value="China"/>
                <option value="South Africa"/>
            </datalist>
        </div>
    )
}

export default AdminParticipants