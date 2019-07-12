-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 12 juil. 2019 à 13:37
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

--
-- Déchargement des données de la table `t_client`
--

INSERT INTO `t_client` (`id`, `email`, `mdp`, `nom`, `prenom`, `tel`) VALUES
(1, 'client1@gmail.com', '$2b$11$1ngYdq550ztQT9wdApMg.uCrMAum44I0jAD5WqSRilSQqZoLmnVba', 'Testboy', 'Testkun', 784569235),
(28, 'a@a', '$2b$11$A48vd.ZJn79yAOjMRwaqoelFxYkqNIOKfnGdB3hIATkSfl4wbSydG', 'Meldin', 'David', 760064168),
(29, 'b@b', '$2b$11$8OHCpBMmJFmON6h8/VR4c.wLw2Z03AKQj.oYQbGSPwrgOzkll6CTa', 'r', 'r', 123456789),
(31, 'c@c', '$2b$11$9b/pZLt95UEnI8ezwn01jOEBBJ5oo3A4tZCrnMh1Z..YN7Di3ZM0e', 'r', 'r', 123456789),
(32, 'd@d', '$2b$11$PUqr9KxHWHmOIAnlLOIOqucJUexQFyVItufoARXBtFPmy/CUxVojW', 'Robinsn', 'crusoé', 987856236),
(34, 'f@f', '$2b$11$lR273w/wF8oEWL0F25eosOlDC66wtNSrdRUJnYeTeTyXhLGUAERYO', 'Nelson', 'Sarah', 896458710),
(38, 'test1@gmail.com', '$2b$11$tx4iWzl70Qy2eLgDQkp/t.vh3.b.bBch9O.cZqW5aBDDie06LL2Dq', 'Polvis', 'Rabie', 760064168),
(39, 'test2@gmail.com', '$2b$11$0yWIzHupleanGwOTXV2Ht.7RNsd2K9X7.yA09d07NEp9.JjTSclCq', 'Bougedrawi', 'Rabie', 760064168),
(40, '1@1', '$2b$11$.zv3hfbWYxXfp7/V8tqLn.MXPvXa.Oh3KiJi3NSfLra.NbD8Qjwly', 'Durian', 'Dupon', 760064168);

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

--
-- Déchargement des données de la table `t_medecin`
--

INSERT INTO `t_medecin` (`id`, `email`, `mdp`, `nom`, `prenom`, `specialite`, `tel`, `cabinet_tel`, `adresse`, `ville`, `bio_profil`) VALUES
(1, 'rabie1997@gmail.com', '$2b$11$0DrVTRzIza38.iBpqupt2.Gr0RcnN4Egx/hDQGFh9QWorFd1.pO5S', 'bougedrawi', 'abdesselam', 'Reeducation Physique', '760064168', '760064162', '46 Rue des Cigognes\r\n', 'Strasbourg', ''),
(8, 'a@a', '$2b$11$5UrMrK1BloOSJlYZkKExVelXFz.07guMkZ0czVPXfKmEQELZMwOty', 'Perlin', 'Davis', 'Dentiste Pediatre', '760064168', '760064168', '46 Rue des Cigognes', 'Ostwald', NULL),
(9, 'b@b', '$2b$11$z5bnCk7.2em6/QZB0TiP7.pSzbz8XE/a/P/T2GdvadNn0KB260DHK', 'poireau', 'Melvin', 'Dentiste', '1234589678', '2234569877', '9 Rue du compagnard', 'Paris', 'JE suis un medecin de qualité\r\n\r\nRendez vous avec confirmation\r\n\r\nblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'),
(10, 'd@d', '$2b$11$PgcVFJZMqIZ0iTiYlSXlFeGYTd.NflcVH/rpPWjaAyQY8RZIkXBIi', 'pold', 'Maria', 'Pediatre', '0784659312', '0784659312', '50 Rue Tibet', 'Rabat', NULL),
(11, 'oftalmo@gmail.com', '$2b$11$e0PsETycaXdLhP3bK05BUe08MhnTKUYORIj2o7oL/WyaQTLF0IHS2', 'Johns', 'Bryan', 'Ophtalmo', '0358974569', '0358974569', '98 rue de Brionsant', 'Toulouse', NULL),
(14, 'test2@gmail.com', '$2b$11$olG7WlO9kg0RfwH4nojPTO.8rOEybAtqy9Tok51WfOIbFTKNMKLUm', 'Johnes', 'Bryan', 'Ophtalmo, Pediatre', '1234567890', '0760064168', '46 Rue des Cigognes', 'Otswald', NULL),
(15, 'test1@gmail.com', '$2b$11$/xp4qSEq3NSWNe/oRm/OA.TFDlrcDifD0XBYzxo/h2hz97UUWkwvO', 'Bougedrawi', 'Abd', 'Pediatre', '0760064168', '0760064168', '46 Rue des Cigognes', 'Otswald', NULL),
(16, '2@2', '$2b$11$mDN13CuHICObfzRHWym/HuwY3R1EUMQUXNZSWYNFxdXIXTzqYIDvS', 'Martinet', 'Dan', 'Pediatre, Dentiste', '0760064168', '0760064168', '46 Rue des Cigognes', 'Otswald', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `t_medecin_has_specialite`
--

INSERT INTO `t_medecin_has_specialite` (`id`, `id_medecin`, `id_specialite`) VALUES
(1, 1, 1),
(2, 1, 2);

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
  KEY `id_client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `t_rdv`
--

INSERT INTO `t_rdv` (`id_rdv`, `id_medecin`, `id_client`, `date_rdv`, `presence`, `confirmation`) VALUES
(3, 1, 1, '10/05/2019 09:00:00', 'Present', 'En Attente'),
(15, 11, 29, '10/10/2019 10:10:00', 'Aucun', 'Confirmer'),
(22, 1, 39, '6/30/2019 10:00:00', 'Aucun', 'En Attente'),
(24, 15, 40, '6/30/2019 10:00:00', 'Aucun', 'En Attente'),
(25, 16, 28, '6/30/2019 09:30:00', 'Aucun', 'Confirmer');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `t_secretaire`
--

INSERT INTO `t_secretaire` (`id`, `id_medecin`, `email`, `mdp`) VALUES
(1, 8, 'b@b', '$2b$11$XsoSsv7BjudZ.mzG36jVWec1YzllghSISNL8eARHk0PeRkzF7XHum'),
(2, 9, 'c@c', '$2b$11$6m1kDN3UW/.WJ.AooYgTnO5VrdlUpJDgOJOzDMNfDbL3lz1yNrIUK'),
(3, 9, 'm@m', '$2b$11$YT2UcZ76OMro9Ec2oE6Dou.z2XsctRKaAyWoo2rYgj4bRJor9LXmS'),
(6, 16, '1@1', '$2b$11$d.Vy9t7Nn0Hh1E6BuCqtluUC.j65bF7XUuZfw1d/jeK1.ylHYtSV.');

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
  ADD CONSTRAINT `t_rdv_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `t_client` (`id`);

--
-- Contraintes pour la table `t_secretaire`
--
ALTER TABLE `t_secretaire`
  ADD CONSTRAINT `t_secretaire_ibfk_1` FOREIGN KEY (`id_medecin`) REFERENCES `t_medecin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
