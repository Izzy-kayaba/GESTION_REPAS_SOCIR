import React, { FormEvent, useState } from 'react';
import "./Login.css";
import { useUserContext } from '../../Helpers/UserContext';
import { NavLink, Router, useNavigate } from 'react-router-dom';

type formType = {
    email_utilisateur: string,
    mot_de_passe: string
}

function Login() {

    let { setUserProfile } = useUserContext();

    const router = useNavigate();

    const initialState = {
        email_utilisateur: "",
        mot_de_passe: ""
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target ?? {}; // Use nullish coalescing to provide an empty object as default
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [formValues, setFormValues] = useState<formType>(initialState);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1100/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                // Successful submission
                console.log('Logged in successfully!');
                const data = await response.json();

                // Save user details to session storage
                sessionStorage.setItem('userDetails', JSON.stringify(data?.userWithoutPassword));

                // Update user context value using setUserProfile
                setUserProfile(data?.userWithoutPassword);

                // Redirect to the specified URL
                router(data.redirectUrl);
            }
            else {
                console.log("Error", response)
            }

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="cover">
            <div className="carte_parent">
                <div className="carte">
                    <h2>
                        SOCIR
                    </h2>
                    <h4>GESTION REPAS </h4>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email_utilisateur" id="email_utilisateur" placeholder="Adresse email" onChange={handleChange} />
                        <input type="password" name="mot_de_passe" id="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} />
                        <button className="login_bouton" type="submit">Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login