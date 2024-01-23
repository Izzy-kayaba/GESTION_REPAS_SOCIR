const { pool } = require("../config/dbConfig");

// Route to fetch data from the 'agents' table
const getDepartements = async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM dep_service')
                .then(result => {
                    const departements = result.rows;
                    res.json({"data" : departements, "meta": "pagination"});
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
    getDepartements
}