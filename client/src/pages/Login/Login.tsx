import React from 'react';
import "./Login.css";
import { useUserContext } from '../../Helpers/UserContext';


function Login() {

const userDetails = useUserContext();

console.log(useUserContext().setUserProfile)



    return (
        <div className="cover">
            <div className="carte_parent">
                <div className="carte">
                    <h2>
                        SOCIR
                    </h2>
                    <h4>GESTION REPAS </h4>
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