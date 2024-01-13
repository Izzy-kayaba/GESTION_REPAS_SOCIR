import React, { FormEvent, useState } from 'react';
import style from "./Login.module.css"
import { useUserContext } from '../../helpers/UserContext';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePost from '../../hooks/usePost';
import Loader from '../../components/Loader/Loader';

type formType = {
    identifier: string,
    password: string
}

function Login() {

    let { setUserProfile } = useUserContext();

    const router = useNavigate();

    const initialState = {
        identifier: "",
        password: ""
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target ?? {}; // Use nullish coalescing to provide an empty object as default
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [formValues, setFormValues] = useState<formType>(initialState);
    const { httpPost } = usePost({ endpoint: "api/auth/local" });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        httpPost(formValues)
            .then(async (response: any) => {

                if (response.ok) {

                    const data = await response.json();
                    // Update user context value using setUserProfile
                    setUserProfile(data);

                    // Save user details to session storage
                    sessionStorage.setItem('userDetails', JSON.stringify(data?.user));

                    toast.success('Connecte avec success !!', { position: toast.POSITION.TOP_RIGHT });

                    // Redirect to the specified URL
                    if (data?.redirectUrl) {
                        router(data?.redirectUrl);
                    } else router("/admin");

                }
            })
            .catch((err) => {
                console.error(err)
                toast.error('Error!!', { position: toast.POSITION.TOP_RIGHT });
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
                        <input type="email" name="identifier" id="identifier" placeholder="Adresse email" onChange={handleChange} className={style.input} />
                        <input type="password" name="password" id="password" placeholder="Mot de passe" onChange={handleChange} className={style.input} />
                        <button type="submit" className={style.login_bouton}>Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login