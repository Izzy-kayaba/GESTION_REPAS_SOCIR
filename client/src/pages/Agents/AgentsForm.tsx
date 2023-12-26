import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from 'react-bootstrap';
import female from "../../assets/female.jpg"
import male from "../../assets/male.jpg"
import styles from "../../elements/Form/Form.module.css";
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import FormTemplate from "../../elements/Form/FormTemplate";
import usePost from "../../hooks/usePost";
import useUpdate from "../../hooks/useUpdate";
import style from "./Agents.module.css"

type AgentType = {
    id_agent: string,
    matr_agent: string,
    nom_agent: string,
    postnom_agent: string,
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
    sexe: "M",
    contact: "",
    email_agent: "",
    lieu_naiss: "",
    date_naiss: ""
}

const AgentsForm: React.FC = () => {
    const router = useParams();
    const route = useNavigate();
    const agent: any = useFetch({ endpoint: `api/agents/${router?.id}` });
    const [formData, setFormData] = useState<AgentType>(initial_state);

    const [url, setUrl] = useState("api/agents");

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initial_state);
    };

    useEffect(() => {
        if (agent.data?.agents?.length > 0) {
            setFormData(agent.data?.agents[0]);
            setUrl(`api/agents/${router?.id}`)
        }
    }, [agent]);

    const { httpPost } = usePost({ endpoint: url });
    const { httpPut } = useUpdate({ endpoint: url });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData?.id_agent === undefined) {
            //If there is no presence of ID, c
            httpPost(formData)
                .then(() => {
                    setFormData(initial_state);
                })
        } else {
            httpPut(formData)
                .then(() => {
                    setFormData(initial_state);
                    route("../agents")
                })
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between px-2">
                <Button variant="primary">
                    Annuler
                </Button>

                <NavLink to={"../agents"} className="nav-link d-inline border border-1 rounded-2 p-2 ">
                    Voir tableau
                </NavLink>
            </div>
            <FormTemplate>
                <Form onSubmit={handleSubmit}>
                    <div className={`row ${styles.row}`}>
                        <h5 className="fw-bold">MATRICULE ET PHOTO</h5>
                        <div className='col-6'>
                            <Form.Label>Matricule</Form.Label >
                            <Form.Control
                                type="text"
                                name="matr_agent"
                                value={formData?.matr_agent}
                                onChange={handleChange}
                                className="my-0"
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </div>

                        <div className='col-6'>
                            <Form.Group controlId="image">
                                <img
                                    src={formData?.sexe === "M" ? male : female}
                                    alt={`image ${formData?.sexe}`}
                                    className={style.avatar}
                                />
                                <Form.Control.Feedback type="invalid" />
                            </Form.Group>
                        </div>
                    </div>

                    <div className={`row ${styles.row}`}>
                        <h5 className="fw-bold">COORDONNÉES PERSONNELLES</h5>
                        <div className="col-6">
                            <Form.Group controlId="nom_agent">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nom_agent"
                                    value={formData?.nom_agent}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.nom_agent}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.nom_agent} */}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group controlId="postnom_agent">
                                <Form.Label>Postnom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="postnom_agent"
                                    value={formData?.postnom_agent}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.postnom_agent}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.postnom_agent} */}
                                </Form.Control.Feedback>
                            </Form.Group></div>
                        <div className="col-6">
                            <Form.Group controlId="prenom_agent">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="prenom_agent"
                                    value={formData?.prenom_agent}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.prenom_agent}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.prenom_agent} */}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                as="select"
                                name="sexe"
                                value={formData?.sexe}
                                onChange={handleChange}
                                // isInvalid={!!formErrors.sexe}
                                className="my-0"
                            >
                                <option value="">Sélectionnez le sexe</option>
                                <option value="M">Masculin</option>
                                <option value="F">Féminin</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {/* {formErrors.sexe} */}
                            </Form.Control.Feedback>
                        </div>
                    </div>

                    <div className={`row ${styles.row}`}>
                        <h5 className="fw-bold">COORDONNÉES DE CONTACT</h5>
                        <div className="col-6">
                            <Form.Group controlId="contact">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contact"
                                    value={formData?.contact}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.contact}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.contact} */}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group controlId="email_agent">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email_agent"
                                    value={formData?.email_agent}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.email_agent}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.email_agent} */}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <div className={`row ${styles.row}`}>
                        <h5 className="fw-bold">INFORMATIONS DE NAISSANCE ET DE RÉSIDENCE</h5>
                        <div className="col-6">
                            <Form.Group controlId="lieu_naiss">
                                <Form.Label>Lieu de Naissance</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lieu_naiss"
                                    value={formData?.lieu_naiss}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.lieu_naiss}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.lieu_naiss} */}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group controlId="date_naiss">
                                <Form.Label>Date de Naissance</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date_naiss"
                                    value={formData?.date_naiss?.slice(0, 10)}
                                    onChange={handleChange}
                                    // isInvalid={!!formErrors.date_naiss}
                                    className="my-0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {formErrors.date_naiss} */}
                                </Form.Control.Feedback>
                            </Form.Group>
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
                        <Button variant="primary" type="submit">
                            Ajouter
                        </Button>
                    </div>
                </Form>
            </FormTemplate>
        </>

    )
}

export default AgentsForm;
