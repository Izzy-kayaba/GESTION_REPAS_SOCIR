const { pool } = require("../config/dbConfig");

// Route to fetch data from the 'agents' table
const getCondiments = async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM condiments')
                .then(result => {
                    const condiments = result.rows;
                    res.json({"data" : condiments, "meta": "pagination"});
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
    getCondiments
}