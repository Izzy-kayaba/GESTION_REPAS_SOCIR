const { pool } = require("../config/dbConfig");

// Route to fetch data from the 'agents' table
const getAccompagnements = async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM accompagnements')
                .then(result => {
                    const accompagnements = result.rows;
                    res.json({"data" : accompagnements, "meta": "pagination"});
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
    getAccompagnements
}