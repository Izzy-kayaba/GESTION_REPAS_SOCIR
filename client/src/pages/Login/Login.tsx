import React from 'react';
import "./Login.css"

function Login() {

    const date = new Date()

    console.log("date", date.getDate())
    return (
        <div className="cover">
            <div className="carte_parent">
                <div className="carte">
                    <h4>
                        SOCIR
                    </h4>
                    <h1> GESTION REPAS </h1>
                    <form>
                        <input type="email" name="email" id="email" placeholder="Adresse email" />
                        <input type="password" name="password" id="password" placeholder="Mot de passe" />
                        <button className="login_bouton">Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login