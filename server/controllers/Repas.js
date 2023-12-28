const { pool } = require("../config/dbConfig");

// Route to fetch data from the 'agents' table
const getRepas = async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM Repas')
                .then(result => {
                    const repas = result.rows;
                    res.json(repas);
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
};

module.exports = {
    getRepas
}