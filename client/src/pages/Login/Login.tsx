import React, { FormEvent, useState } from 'react';
import style from "./Login.module.css"
import { useUserContext } from '../../helpers/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePost from '../../hooks/usePost';
import Loader from '../../elements/Loader/Loader';

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
    const {
        state: { data, isLoading, isError },
        httpPost
    } = usePost({ endpoint: "auth/login" });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        httpPost(formValues)
            .then(() => {
                if (data !== null) {
                    // Save user details to session storage
                    sessionStorage.setItem('userDetails', JSON.stringify(data?.userWithoutPassword));
                    // Update user context value using setUserProfile
                    setUserProfile(data?.userWithoutPassword);

                    // Redirect to the specified URL
                    router(data.redirectUrl);
                }

            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className={style.cover}>
            <div className={style.carte_parent}>
                <div className={style.carte}>
                    <h2 className={style.h2}>
                        SOCIR
                    </h2>
                    <h4 className={style.h4}>GESTION REPAS </h4>
                    <form onSubmit={handleSubmit} className={style.form}>
                        <input type="email" name="email_utilisateur" id="email_utilisateur" placeholder="Adresse email" onChange={handleChange} className={style.input} />
                        <input type="password" name="mot_de_passe" id="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} className={style.input} />
                        <button type="submit" className={style.login_bouton} >Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login