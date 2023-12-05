CREATE TABLE agents (
    id_agent SERIAL PRIMARY KEY,
    matr_agent VARCHAR(50) UNIQUE,
    nom_agent VARCHAR(100) NOT NULL,
    postnom_agent VARCHAR(100),
    prenom_agent VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    email_agent VARCHAR(100),
    image BYTEA,
    sexe CHAR(1),
    lieu_naiss VARCHAR(100),
    date_naiss DATE
);

CREATE TABLE aliments (
    id_aliment SERIAL PRIMARY KEY,
    nom_aliment VARCHAR(255) NOT NULL
);

CREATE TABLE condiments (
    id_condiment SERIAL PRIMARY KEY,
    nom_condiment VARCHAR(255) NOT NULL
);

CREATE TABLE accompagnements (
    id_accompagnement SERIAL PRIMARY KEY,
    nom_accompagnement VARCHAR(255) NOT NULL
);

CREATE TABLE fonctions (
    id_fonction SERIAL PRIMARY KEY,
    nom_fonction VARCHAR(255) NOT NULL
);

CREATE TABLE tours (
    id_tour SERIAL PRIMARY KEY,
    nom_tour VARCHAR(255) NOT NULL
);

CREATE TABLE entites (
    id_entite SERIAL PRIMARY KEY,
    code_entite VARCHAR(255) NOT NULL,
    nom_entite VARCHAR(255) NOT NULL
);

CREATE TABLE dep_service (
    id_dep SERIAL PRIMARY KEY,
    code_dep VARCHAR(255) NOT NULL,
    nom_dep VARCHAR(255) NOT NULL
);

CREATE TABLE utilisateurs (
    id_utilisateur SERIAL PRIMARY KEY,
    nom_utilisateur VARCHAR(255) NOT NULL,
    email_utilisateur VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL DEFAULT user,
    mot_de_passe VARCHAR(255) NOT NULL,
);

CREATE TABLE repas_agents (
    id_repas_agent SERIAL PRIMARY KEY,
    id_agent INT NOT NULL,
    nom_agent VARCHAR(255) NOT NULL, -- Assuming the name is a string
    id_condiment INT NOT NULL,
    id_accompagnement INT NOT NULL,
    id_aliments INT NOT NULL,
    prix numeric NOT NULL,
    date_cree TIMESTAMP, -- Assuming you want a timestamp, not DATETIME
    date_efface TIMESTAMP,
    commentaires TEXT,
    FOREIGN KEY (id_agent) REFERENCES agents(id_agent),
    FOREIGN KEY (id_condiment) REFERENCES condiments(id_condiment),
    FOREIGN KEY (id_accompagnement) REFERENCES accompagnements(id_accompagnement),
    FOREIGN KEY (id_aliments) REFERENCES aliments(id_aliment)
);


