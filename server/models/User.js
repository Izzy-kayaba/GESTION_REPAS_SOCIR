const bcrypt = require("bcrypt");
const { pool } = require("../config/dbConfig");

class User {
    static async create(username, email, password) {
        try {
            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query("INSERT INTO utilisateurs (nom_utilisateur, email_utilisateur, mot_de_passe) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hashedPassword]);
            return result.rows[0];
        } catch (error) {
            throw error
        }
    }

    static async findByEmail(email) {
        try {
            const result = await pool.query("SELECT * FROM utilisateurs WHERE email_utilisateur = $1", [email]);
            return result.rows[0];

        } catch (error) {
            throw error
        }

    }
}

module.exports = User;