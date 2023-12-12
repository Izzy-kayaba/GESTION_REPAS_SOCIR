import React, { FormEvent, useState } from 'react';
import "./Registration.module.css";
import { useUserContext } from '../../Helpers/UserContext';
import { NavLink } from 'react-router-dom';
import { error } from 'console';


type formType = {
  nom_utilisateur: string,
  email_utilisateur: string,
  mot_de_passe: string
}

const Registration = () => {

  const initialState = {
    nom_utilisateur: "",
    email_utilisateur: "",
    mot_de_passe: ""
  }

  const [formValues, setFormValues] = useState<formType>(initialState);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1100/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Successful submission
        console.log('Agent added successfully!');
        setFormValues(initialState);
      }
      else {
        console.log("Error", response.status)
        console.log(e)
      }

    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className="cover">
      <div className="carte_parent">
        <div className="carte">
          <form onSubmit={handleSubmit}>
            <input type="text" id="nom_utilisateur" name="nom_utilisateur" placeholder="Nom d'utilisateur" onChange={handleChange} />
            <input type="email" name="email_utilisateur" id="email_utilisateur" placeholder="Adresse email" onChange={handleChange} />
            <input type="password" name="mot_de_passe" id="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} />
            <button type='submit' className="login_bouton">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration;