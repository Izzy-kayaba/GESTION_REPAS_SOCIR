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

CREATE TABLE entites (
    id_entite SERIAL PRIMARY KEY,
    code_entite VARCHAR(255) NOT NULL,
    nom_entite VARCHAR(255) NOT NULL,
);

CREATE TABLE dep_service (
    id_dep SERIAL PRIMARY KEY,
    code_dep VARCHAR(255) NOT NULL,
    nom_dep VARCHAR(255) NOT NULL,
);