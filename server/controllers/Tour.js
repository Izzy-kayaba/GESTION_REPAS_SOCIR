const { pool } = require("../config/dbConfig");

// Route to fetch data from the 'agents' table
const getTours = async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM tours')
                .then(result => {
                    const tours = result.rows;
                    res.json(tours);
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
    getTours
}