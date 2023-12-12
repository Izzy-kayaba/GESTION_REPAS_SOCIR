const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");


// Passport Serialization
// Storing the user's id in the session
passport.serializeUser((user, done) => {
    done(null, user.id_utilisateur);
})

passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query("SELECT * FROM utilisateurs WHERE id_utilisateur = $1", [id]);
        const user = result.rows[0];
        done(null, user);

    } catch (error) {
        done(error, null);
    }
})

// Local Strategy for email/password login
passport.use(
    new LocalStrategy(
        {
            usernameField: "email_utilisateur",
            passwordField: "mot_de_passe"
        },
        async (email, password, done) => {
            try {
                // Check if the user exists in the database
                const result = await pool.query("SELECT * FROM utilisateurs WHERE email_utilisateur = $1", [email]);
                const user = result.rows[0];

                if (!user) {
                    return done(null, false, { message: "Incorrect email !" });
                }

                // Compare the provided password with the hashed password stored in the database
                const match = await bcrypt.compare(password, user.mot_de_passe);

                if (match) {
                    // If the password matches, user is authenticated
                    // The 'done' function is called with null (no error) and the authenticated user
                    return done(null, user);
                } else {
                    // If the password does not match, user is not authenticated
                    // The 'done' function is called with null (no error) and false (no user)
                    return done(null, false, { message: "Incorrect password !" });
                }
            } catch (error) {
                // If there's an error during the process, the 'done' function is called with the error
                return done(error);
            }
        }
    )
);


module.exports = passport;
