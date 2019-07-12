-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 12 juil. 2019 à 13:53
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `solucdocteur_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_client`
--

DROP TABLE IF EXISTS `t_client`;
CREATE TABLE IF NOT EXISTS `t_client` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `nom` varchar(256) DEFAULT NULL,
  `prenom` varchar(256) DEFAULT NULL,
  `tel` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COMMENT='Table des clients';

-- --------------------------------------------------------

--
-- Structure de la table `t_medecin`
--

DROP TABLE IF EXISTS `t_medecin`;
CREATE TABLE IF NOT EXISTS `t_medecin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `specialite` varchar(255) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `cabinet_tel` varchar(10) NOT NULL,
  `adresse` text,
  `ville` varchar(255) NOT NULL,
  `bio_profil` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `specialite` (`specialite`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COMMENT='Table des medecins';

-- --------------------------------------------------------

--
-- Structure de la table `t_medecin_has_specialite`
--

DROP TABLE IF EXISTS `t_medecin_has_specialite`;
CREATE TABLE IF NOT EXISTS `t_medecin_has_specialite` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_medecin` int(255) NOT NULL,
  `id_specialite` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_medecin` (`id_medecin`),
  KEY `id_specialite` (`id_specialite`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `t_rdv`
--

DROP TABLE IF EXISTS `t_rdv`;
CREATE TABLE IF NOT EXISTS `t_rdv` (
  `id_rdv` int(255) NOT NULL AUTO_INCREMENT,
  `id_medecin` int(255) NOT NULL,
  `id_client` int(255) NOT NULL,
  `date_rdv` varchar(255) NOT NULL,
  `presence` enum('Aucun','Present','Absent','') NOT NULL DEFAULT 'Aucun',
  `confirmation` enum('En Attente','Confirmer','Refuser') NOT NULL DEFAULT 'En Attente',
  PRIMARY KEY (`id_rdv`,`id_medecin`,`id_client`),
  KEY `Id_Medecin` (`id_medecin`),
  KEY `Id_cleint` (`id_client`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `t_secretaire`
--

DROP TABLE IF EXISTS `t_secretaire`;
CREATE TABLE IF NOT EXISTS `t_secretaire` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_medecin` int(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `id_medecin` (`id_medecin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `t_specialite_enum`
--

DROP TABLE IF EXISTS `t_specialite_enum`;
CREATE TABLE IF NOT EXISTS `t_specialite_enum` (
  `id_specialite` int(255) NOT NULL AUTO_INCREMENT,
  `nom_specialite` varchar(255) NOT NULL,
  PRIMARY KEY (`id_specialite`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `t_specialite_enum`
--

INSERT INTO `t_specialite_enum` (`id_specialite`, `nom_specialite`) VALUES
(1, 'Medecin Generaliste'),
(2, 'Rhumatologue'),
(3, 'Ophtalmo'),
(4, 'Reeducation Physique'),
(5, 'Dentiste'),
(6, 'Pediatre');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_medecin_has_specialite`
--
ALTER TABLE `t_medecin_has_specialite`
  ADD CONSTRAINT `t_medecin_has_specialite_ibfk_1` FOREIGN KEY (`id_medecin`) REFERENCES `t_medecin` (`id`),
  ADD CONSTRAINT `t_medecin_has_specialite_ibfk_2` FOREIGN KEY (`id_specialite`) REFERENCES `t_specialite_enum` (`id_specialite`);

--
-- Contraintes pour la table `t_rdv`
--
ALTER TABLE `t_rdv`
  ADD CONSTRAINT `Id_Medecin` FOREIGN KEY (`id_medecin`) REFERENCES `t_medecin` (`id`),
  ADD CONSTRAINT `Id_cleint` FOREIGN KEY (`id_client`) REFERENCES `t_client` (`id`);

--
-- Contraintes pour la table `t_secretaire`
--
ALTER TABLE `t_secretaire`
  ADD CONSTRAINT `t_secretaire_ibfk_1` FOREIGN KEY (`id_medecin`) REFERENCES `t_medecin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
