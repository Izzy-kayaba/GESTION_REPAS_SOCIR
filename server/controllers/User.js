const { pool } = require("../config/dbConfig");



const postUsers = async (req, res) => {
    let date = new Date();
    let { name, surname, email, password, confirmedPassword } = req.body;

    try {
        if(!name || !surname || !email || !password || !confirmedPassword ) {
            res.status(400).json({ error : { message : "All fields are required"}});
            return;
        }

    
        
    } catch (error) {
        
    }





}

// Route to fetch data from the 'agents' table
const getUsers = async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM utilisateurs')
                .then(result => {
                    const agents = result.rows;
                    res.json(agents);
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
    getUsers,
    postUsers
}