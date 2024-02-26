import React, { useState, useEffect } from "react";
import { Formik } from "formik"
import female from "../../assets/female.jpg"
import male from "../../assets/male.jpg"
import style from "../../components/Form/Form.module.css";
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import FormTemplate from "../../components/Form/FormTemplate";
import usePost from "../../hooks/usePost";
import useUpdate from "../../hooks/useUpdate";

type AgentType = {
    id_agent: string,
    matr_agent: string,
    nom_agent: string,
    postnom_agent: string,
    id_dep: number,
    id_fonction: number,
    id_entite: number,
    prenom_agent: string,
    sexe: 'M' | 'F';
    contact: string;
    email_agent: string;
    lieu_naiss: string;
    date_naiss: string;
}

const initial_state: AgentType = {
    id_agent: "",
    matr_agent: "",
    nom_agent: "",
    postnom_agent: "",
    prenom_agent: "",
    id_dep: 1,
    id_entite: 1,
    id_fonction: 1,
    sexe: "M",
    contact: "",
    email_agent: "",
    lieu_naiss: "",
    date_naiss: ""
}

const AgentsForm: React.FC = () => {

    // Destructure id from the URL parameters
    const { id } = useParams();

    // A more descriptive name for navigation functionality
    const navigation = useNavigate();
    const [url, setUrl] = useState("api/agents");
    const [formData, setFormData] = useState<AgentType>(initial_state);

    // Conditionally create the API endpoint based on whether id is defined
    const apiEndpoint = id ? `api/agents/${id}?populate=*` : undefined;
    const { data: agent, isLoading, isError }: any = useFetch({ endpoint: apiEndpoint });
    console.log(agent)

    // Other api calls for select options
    const entites: any = useFetch({ endpoint: "api/entites" });
    const departements: any = useFetch({ endpoint: "api/departements" });
    const { data: fonctions }: any = useFetch({ endpoint: "api/fonctions" });

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id) {
            setUrl(`api/agents/${id}`)
            setFormData(agent?.data?.attributes);
        }

    }, [agent]);

    const { httpPost } = usePost({ endpoint: url });
    const { httpPut } = useUpdate({ endpoint: url });

    const resetForm = () => {
        setFormData(initial_state);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form before submission

        if (id) {
            httpPut(formData)
                .then(() => {
                    setFormData(initial_state);
                    navigation("../agents")
                })
        } else {
            //If there is no presence of ID
            httpPost(formData)
                .then(() => {
                    setFormData(initial_state);
                })
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between px-2">
                <button className={style.bouton}>
                    Annuler
                </button>

                <NavLink to={"../agents"} className="nav-link d-inline border border-1 rounded-2 p-2 ">
                    Voir tableau
                </NavLink>
            </div>
            <FormTemplate>
                <Formik
                    initialValues={{ name: 'jared' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className={`row ${style.row}`}>
                                <h5 className="fw-bold">MATRICULE ET PHOTO</h5>
                                <div className='col-12 col-md-6'>
                                    <label>MATRICULE</label >
                                    <input
                                        type="text"
                                        name="matr_agent"
                                        value={formData?.matr_agent}
                                        onChange={handleChange}
                                        className={style.formControl}
                                    />
                                </div>

                                <div className='col-12 col-md-6'>
                                    <div className="d-flex justify-content-center px-5">
                                        <img
                                            src={formData?.sexe === "M" ? male : female}
                                            alt={`image ${formData?.sexe}`}
                                            className={style.avatar}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`row ${style.row}`}>
                                <h5 className="fw-bold">COORDONNÉES PERSONNELLES</h5>
                                <div className="col-12 col-md-6">
                                    <label>NOM</label>
                                    <input
                                        type="text"
                                        name="nom_agent"
                                        value={formData?.nom_agent}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.nom_agent}
                                        className="my-0"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>POSTNOM</label>
                                    <input
                                        type="text"
                                        name="postnom_agent"
                                        value={formData?.postnom_agent}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.postnom_agent}
                                        className="my-0"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>PRENOM</label>
                                    <input
                                        type="text"
                                        name="prenom_agent"
                                        value={formData?.prenom_agent}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.prenom_agent}
                                        className="my-0"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>GENRE</label>
                                    <select
                                        name="sexe"
                                        value={formData?.sexe}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.sexe}
                                        className="my-0"
                                    >
                                        <option value="">Sélectionnez le sexe</option>
                                        <option value="M">Masculin</option>
                                        <option value="F">Féminin</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`row ${style.row}`}>
                                <h5 className="fw-bold">COORDONNÉES DE CONTACT</h5>
                                <div className="col-12 col-md-6">
                                    <label>NUMERO DE TEL.</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData?.contact}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.contact}
                                        className="my-0"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>ADRESSE E-MAIL</label>
                                    <input
                                        type="text"
                                        name="email_agent"
                                        value={formData?.email_agent}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.email_agent}
                                        className="my-0"
                                    />
                                </div>
                            </div>

                            <div className={`row ${style.row}`}>
                                <h5 className="fw-bold">FONCTIONALITES</h5>
                                <div className="col-12 col-md-6">

                                    <label>Fonction</label>
                                    <select aria-label="Default select example"
                                        name="id_fonction"
                                        defaultValue={formData?.id_fonction}
                                        onChange={handleChange}>
                                        <option >Open this select menu</option>
                                        {fonctions?.data?.map((fonction: any, index: React.Key | null | undefined) =>
                                        (
                                            <option key={index}
                                                value={parseInt(fonction?.id)}>
                                                {fonction?.nom_fonction}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="col-12 col-md-6">
                                    <label>ADRESSE E-MAIL</label>
                                    <input
                                        type="text"
                                        name="email_agent"
                                        value={formData?.email_agent}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.email_agent}
                                        className="my-0"
                                    />
                                </div>
                            </div>

                            <div className={`row ${style.row}`}>
                                <h5 className="fw-bold">INFORMATIONS DE NAISSANCE ET DE RÉSIDENCE</h5>
                                <div className="col-12 col-md-6">
                                    <label>LIEU DE NAISSANCE</label>
                                    <input
                                        type="text"
                                        name="lieu_naiss"
                                        value={formData?.lieu_naiss}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.lieu_naiss}
                                        className="my-0"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>DATE DE NAISSANCE</label>
                                    <input
                                        type="date"
                                        name="date_naiss"
                                        value={formData?.date_naiss?.slice(0, 10)}
                                        onChange={handleChange}
                                        // isInvalid={!!formErrors.date_naiss}
                                        className="my-0"
                                    />
                                </div>
                            </div>

                            {/* Display errors at the top of the form */}
                            {/* {Object.keys(formErrors).length > 0 && (
                        <Alert variant="danger" className="mt-3">
                            Il y a des erreurs dans le formulaire. Veuillez les corriger.
                        </Alert>
                    )} */
                            }

                            <div className="text-center">
                                {/* Submit Button */}
                                <button>
                                    {id ? <> Modifier</> : <>Ajouter</>}
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </FormTemplate >
        </>

    )
}

export default AgentsForm;
