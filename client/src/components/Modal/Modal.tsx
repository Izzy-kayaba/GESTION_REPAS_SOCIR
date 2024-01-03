import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

type ModalFormProps = {
    show: boolean;
    onHide: () => void;
    onSubmit: (formData: any) => void;
};

type AgentFormData = {
    matr_agent: string;
    nom_agent: string;
    postnom_agent: string;
    prenom_agent: string;
    contact: string;
    email_agent: string;
    image: string; // Supposant que vous convertissez les données BYTEA en une chaîne base64
    sexe: string;
    lieu_naiss: string;
    date_naiss: string;
}

const ModalTemplate: React.FC<ModalFormProps> = ({ show, onHide, onSubmit }) => {

    const initialFormData: AgentFormData = {
        matr_agent: '',
        nom_agent: '',
        postnom_agent: '',
        prenom_agent: '',
        contact: '',
        email_agent: '',
        image: '',
        sexe: '',
        lieu_naiss: '',
        date_naiss: '',
    };

    const [formData, setFormData] = useState<any>(initialFormData);
    //   const [formErrors, setFormErrors] = useState<Partial<AgentFormData>>({});

    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form
        // const isValid = validateForm();

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
                onSubmit(formData);
                onHide();
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
        <Modal show={show} onHide={() => { resetForm(); onHide(); }} centered>
            <Modal.Header closeButton>
                <Modal.Title className="my-0">Ajouter un nouvel agent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="matr_agent">
                        <Form.Label>Matricule</Form.Label >
                        <Form.Control
                            type="text"
                            name="matr_agent"
                            value={formData.matr_agent}
                            onChange={handleChange}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="nom_agent">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom_agent"
                            value={formData.nom_agent}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.nom_agent}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.nom_agent} */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="postnom_agent">
                        <Form.Label>Postnom</Form.Label>
                        <Form.Control
                            type="text"
                            name="postnom_agent"
                            value={formData.postnom_agent}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.postnom_agent}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.postnom_agent} */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="prenom_agent">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="prenom_agent"
                            value={formData.prenom_agent}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.prenom_agent}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.prenom_agent} */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.contact}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.contact} */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email_agent">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email_agent"
                            value={formData.email_agent}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.email_agent}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.email_agent} */}
                        </Form.Control.Feedback>
                    </Form.Group>

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
                    </Form.Group> */}

                    <Form.Group controlId="sexe">
                        <Form.Label>Sexe</Form.Label>
                        <Form.Control
                            as="select"
                            name="sexe"
                            value={formData.sexe}
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
                    </Form.Group>

                    <Form.Group controlId="lieu_naiss">
                        <Form.Label>Lieu de Naissance</Form.Label>
                        <Form.Control
                            type="text"
                            name="lieu_naiss"
                            value={formData.lieu_naiss}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.lieu_naiss}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.lieu_naiss} */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="date_naiss">
                        <Form.Label>Date de Naissance</Form.Label>
                        <Form.Control
                            type="date"
                            name="date_naiss"
                            value={formData.date_naiss}
                            onChange={handleChange}
                            // isInvalid={!!formErrors.date_naiss}
                            className="my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* {formErrors.date_naiss} */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button variant="primary" type="submit">
                        Ajouter Agent
                    </Button>

                    {/* Display errors at the top of the form */}
                    {/* {Object.keys(formErrors).length > 0 && (
                        <Alert variant="danger" className="mt-3">
                            Il y a des erreurs dans le formulaire. Veuillez les corriger.
                        </Alert>
                    )} */}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalTemplate;
