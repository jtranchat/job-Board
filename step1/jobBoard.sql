CREATE TABLE `Annonce` ( 
`idAnnonce` int AUTO_INCREMENT,
`idEntreprise` int,
`idPersonne` int,
`nom` varchar(50), 
`description` varchar(255), 
`place` int,
`salaires` int,
`tempDeTravailParSemaine` int,
`contrat` varchar(30),
primary key (idAnnonce)
);

CREATE TABLE `Entreprise` (
`idEntreprise` int AUTO_INCREMENT,
`nomEntreprise` varchar(50),
`localisation` varchar(150),
`activite` varchar(255),
primary key (idEntreprise)
);

CREATE TABLE `Personne` (
`idPersonne` int AUTO_INCREMENT,
`nom` varchar(50), 
`prenom` varchar(50),
`sexe` varchar(20),
`mail` varchar(100),
`telephone` varchar(10),
`identifiant` varchar(20),
`motDePasse` varchar(20),
`status` varchar(20),
primary key (idPersonne)
);

CREATE TABLE `Candidature` (
`idCandidature` int AUTO_INCREMENT,
`idAnnonce` int,
`idPersonne` int,
`contenuMail` varchar(10000),
primary key (idCandidature)
);

ALTER TABLE `Annonce` ADD FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprise`(idEntreprise);

ALTER TABLE `Annonce` ADD FOREIGN KEY (`idPersonne`) REFERENCES `Personne`(idPersonne);

ALTER TABLE `Candidature` ADD FOREIGN KEY (`idAnnonce`) REFERENCES `Annonce`(idAnnonce);

ALTER TABLE `Candidature` ADD FOREIGN KEY (`idPersonne`) REFERENCES `Personne`(idPersonne);

ALTER TABLE Personne ADD UNIQUE (mail);

INSERT INTO Entreprise (nomEntreprise, localisation, activite)
VALUES
('Epitech', '3 Place Paul Bec, 34000 Montpellier', 'Ecoles informatique'),
('Google', '38 avenue de lopéra', 'Moteur de recherche web plutôt célèbre'),
('Twitter', '10 rue de la paix, 75002 Paris', 'Réseaux social'),
('facebook', '6 rue Menars, 75002 Paris', 'Réseaux social'),
('Snapchat', '16 rue de la rochefoucauld, 75009 Paris', 'Réseaux social');

INSERT INTO Personne (nom, prenom, sexe, mail, telephone,identifiant, motDePasse, status)
VALUES
('Rochas','Alban','homme','alban.rochas@epitech.eu','0658795879','a.rochas','sparkyoto','demandeur'),
('Tranchat','Joffrey','homme','joffrey.tranchat@epitech.eu','0768785945','j.tranchat','tranchat','demandeur'),
('Mathieu','Arthur','homme','arthur.mathieu@gmail.com','0769696969','a.mathieu','mathieu','demandeur'),
('Villeseche','Ethan','homme','ethan.villeseche@gmail.com','0712121212','e.villeseche','villeseche','employeur'),
('Legger','Pierre-Antoine','homme','pierre-antoine.legger@gmail.com','0659783241','pa.legger','legger','employeur'),
('Bounoir','Fabien','homme','fabien.bounoir@gmail.com','0678415295','f.bounoir','bounoir','employeur');

INSERT INTO Annonce (idEntreprise, idPersonne, nom, description, place, salaires, tempDeTravailParSemaine, contrat)
VALUES
('1','4','Ingénieur informatique','cherche ingénieur informatique','1','2500', '35', 'CDI'),
('2','5','dévellopeur web','cherche dévellopeur web Javascript','1','2500', '35', 'CDD'),
('3','6','dévellopeur fullstack','cherche dévellopeur fullstack','1','2500', '35', 'CDD');
