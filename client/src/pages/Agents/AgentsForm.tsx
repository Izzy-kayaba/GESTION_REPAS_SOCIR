import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from 'react-bootstrap';
import style from "../../elements/Form/Form.module.css";
import { NavLink, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import FormTemplate from "../../elements/Form/FormTemplate";

const AgentsForm: React.FC = () => {
    const router = useParams();
    const agent: any = useFetch({ endpoint: `api/agents/${router?.id}` })

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({});
    };

    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (agent?.data?.agents?.length > 0) {
            setFormData(agent.data?.agents[0]);
        }
    }, [agent])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Perform the submit action (e.g., send data to the server)
        try {
            const response = await fetch('http://localhost:1100/api/agents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Successful submission
                console.log('Agent added successfully!');
            } else {
                // Handle error responses from the server
                console.error('Failed to add agent:', response.statusText);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between px-2">
                <NavLink to={"../"} className="nav-link d-inline border border-1 rounded-2 p-2 ">
                    Precedent
                </NavLink>

                <Button variant="primary">
                    Voir tableau
                </Button>
            </div>
            <FormTemplate>
                <Form onSubmit={handleSubmit}>
                    <div className={`row ${style.row}`}>
                        <h5 className="fw-bold">Titre</h5>
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
                            {/* <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            isInvalid={!!formErrors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.image}
                        </Form.Control.Feedback>
                    </Form.Group> */
                            }
                        </div>
                    </div>

                    <div className={`row ${style.row}`}>
                        <h5 className="fw-bold">Titre</h5>
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

                    <div className={`row ${style.row}`}>
                        <h5 className="fw-bold">Titre</h5>
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

                    <div className={`row ${style.row}`}>
                        <h5 className="fw-bold">Titre</h5>
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
