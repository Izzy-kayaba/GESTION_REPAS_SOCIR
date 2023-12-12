const express = require("express");
const passport = require("../config/passport");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    const { nom_utilisateur, email_utilisateur, mot_de_passe } = req.body;

    try {
        const existingUser = await User.findByEmail(email_utilisateur);

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newUser = await User.create(nom_utilisateur, email_utilisateur, mot_de_passe);
        res.status(201).json({ message: "User registrered successfully !", user: newUser });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Internal Server Error !" })

    }
})

// Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
    const { email_utilisateur, mot_de_passe } = req.body;

    try {
        const user = await User.findByEmail(email_utilisateur);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

        if (match) {
            const token = jwt.sign(
                { userId: user.id_utilisateur },
                process.env.SECRET_CODE,
                { expiresIn: "1h" }
            )
            const { mot_de_passe, ...userWithoutPassword } = user;
            return res.status(200).json({ userWithoutPassword, token, redirectUrl:"/admin", message: 'Login successful',  });
        } else {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


// Logout
router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success","Successfully logged out !");
    res.status(200).json({redirectUrl:"/"})
})


module.exports = router;