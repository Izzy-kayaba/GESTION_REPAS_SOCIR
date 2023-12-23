const { pool } = require("../config/dbConfig");

// Route to fetch data from the 'agents' table
const getAgents = async (req, res) => {
    const { column, value } = req.query;
    let result = []; // Allows to make queries on condition

    try {
        const client = await pool.connect();

        if (column !== undefined && value !== undefined) {
            result = await client.query(`SELECT * FROM agents WHERE ${column} = $1`, [value]);
        }

        else {
            result = await client.query(`SELECT * FROM agents`);
        }

        if (result.rows.length === 0) {
            // If no agent is found with the specified ID
            res.status(404).json({ error: 'No agents found with the specified criteria' });
        } else {
            const agents = result.rows;
            res.json(agents);
        }
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
};

// Route to fecth a single row
const getAgentsById = async (req, res) => {
    const agentId = req.params.id;
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM agents WHERE id_agent = $1', [agentId])
                .then(result => {
                    if (result.rows.length === 0) {
                        // If no agent is found with the specified ID
                        res.status(404).json({ error: 'Agent not found' });
                    } else {
                        res.json({ agents: [result.rows[0]] });
                    }
                })
                .catch(err => {
                    console.error('Error executing query', err);
                    res.status(500).send('Internal Server Error');
                })
                .finally(() => client.release());
        })
        .catch(err => {
            console.error('Error acquiring client', err);
            res.status(500).send('Internal Server Error');
        });
}

// Route to create an new agent
const createNewAgents = async (req, res) => {
    let {
        matr_agent,
        nom_agent,
        postnom_agent,
        prenom_agent,
        contact,
        email_agent,
        image,
        sexe,
        lieu_naiss,
        date_naiss,
    } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT INTO agents (matr_agent, nom_agent, postnom_agent, prenom_agent, contact, email_agent, image, sexe, lieu_naiss, date_naiss) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                matr_agent,
                nom_agent,
                postnom_agent,
                prenom_agent,
                contact,
                email_agent,
                image,
                sexe,
                lieu_naiss,
                date_naiss,
            ]
        );
        const newAgent = result.rows[0];
        res.json(newAgent);
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
};

// Route to update an agent
const updateAgent = async (req, res) => {
    const agentId = req.params.id;
    const {
        matr_agent,
        nom_agent,
        postnom_agent,
        prenom_agent,
        contact,
        email_agent,
        image,
        sexe,
        lieu_naiss,
        date_naiss,
    } = req.body;

    try {
        const client = await pool.connect();

        const result = await client.query(
            `UPDATE agents
         SET
           matr_agent = $1,
           nom_agent = $2,
           postnom_agent = $3,
           prenom_agent = $4,
           contact = $5,
           email_agent = $6,
           image = $7,
           sexe = $8,
           lieu_naiss = $9,
           date_naiss = $10
         WHERE id_agent = $11`,
            [
                matr_agent,
                nom_agent,
                postnom_agent,
                prenom_agent,
                contact,
                email_agent,
                image,
                sexe,
                lieu_naiss,
                date_naiss,
                agentId,
            ]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Agent not found' });
        } else {
            const newAgent = result.rows[0];
            res.json({ message: 'Agent updated successfully' });
            res.json({ data: { newAgent } })
        }

        client.release();
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getAgents,
    getAgentsById,
    createNewAgents,
    updateAgent
}
