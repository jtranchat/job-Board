CREATE TABLE `Annonce` ( 
`idAnnonce` int AUTO_INCREMENT, 
`nom` varchar(50), 
`description` varchar(255), 
`idEntreprise` int, 
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
`activites` varchar(255),
primary key (idEntreprise)
);

CREATE TABLE `Personne` (
`idPersonne` int AUTO_INCREMENT,
`nom` varchar(50), 
`prenom` varchar(50),
`age` int,
`sexe` varchar(20),
`mail` varchar(100),
`telephone` varchar(10),
`identifiant` varchar(20),
`motDePasse` varchar(20),
`status` varchar(20),
`diplome` varchar(255),
`experience` varchar(255),
primary key (idPersonne)
);

CREATE TABLE `Candidature` (
`idCandidature` int AUTO_INCREMENT,
`contenueMail` varchar(10000),
`idAnnonce` int,
`idDemandeur` int,
`idDestinataire` int,
primary key (idCandidature)
);

ALTER TABLE `Annonce` ADD FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprise`(idEntreprise);

ALTER TABLE `Candidature` ADD FOREIGN KEY (`idAnnonce`) REFERENCES `Annonce`(idAnnonce);

ALTER TABLE `Candidature` ADD FOREIGN KEY (`idDemandeur`) REFERENCES `Personne`(idPersonne);

ALTER TABLE `Candidature` ADD FOREIGN KEY (`idDestinataire`) REFERENCES `Personne`(idPersonne);

INSERT INTO Entreprise (nomEntreprise, localisation, activites)
VALUES
('Epitech', '3 Place Paul Bec, 34000 Montpellier', 'Ecoles informatique'),
('Google', '38 avenue de lopéra', 'Moteur de recherche web plutôt célèbre'),
('Twitter', '10 rue de la paix, 75002 Paris', 'Réseaux social'),
('facebook', '6 rue Menars, 75002 Paris', 'Réseaux social'),
('Snapchat', '16 rue de la rochefoucauld, 75009 Paris', 'Réseaux social');

INSERT INTO Personne (nom, prenom, age, sexe, mail, telephone,identifiant, motDePasse, status, diplome, experience)
VALUES
('Alban','Rochas','20','homme','alban.rochas@epitech.eu','0658795879','a.rochas','sparkyoto','demandeur','BTS, Bac','Contrat étudiant à Leroy Merlin'),
('Joffrey','Tranchat','20','homme','joffrey.tranchat@epitech.eu','0768785945','j.tranchat','Prodyy','demandeur','BTS Bac','stage Grand delta habitat à avignon pendant 6 semaines au services informatique'),
('Michel','Honteux','54','homme','michel.honteux@gmail.com','0769696969','m.honteux','honteux','demandeur',' Informatique','25 ans en freelance'),
('Patrick','Balkany','47','homme','Patrick.Balkany@gmail.com','0712121212','p.balkany','levallois','employeur','Ingénieur Informatique','25 ans cher google'),
('Pierre-Antoine','Legger','38','homme','pierre-antoine.legger@gmail.com','0659783241','pa.legger','password','employeur','ingénieur Informatique','10 ans chez snapchat'),
('Fabien','Bounoir','48','homme','fabien.bounoir@gmail.com','0678415295','','','employeur','ingénieur Informatique','10 ans facebook');

INSERT INTO Annonce (nom, description, idEntreprise, place, salaires, tempDeTravailParSemaine, contrat)
VALUES
('Ingénieur informatique','cherche ingénieur informatique','1','1','2500', '35', 'CDI'),
('dévellopeur web','cherche dévellopeur web Javascript','2','1','2500', '35', 'CDD'),
('dévellopeur fullstack','cherche dévellopeur fullstack','3','1','2500', '35', 'CDD');
