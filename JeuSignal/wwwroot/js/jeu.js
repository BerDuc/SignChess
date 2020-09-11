"use strict";


//Désactiver les boutons jusqu'à ce que la connexion soit établie
document.getElementById("btnUser").disabled = true;
document.getElementById("btnCreerPartie").disabled = true; 
document.getElementById("btnJoindre").disabled = true; 


//variable partie
let partie_en_cours;
let coups_joues;
let tour; 

//établir la connexion
var connection = new signalR.HubConnectionBuilder().withUrl("/jeuHub").build();

connection.start().then(function () {
	document.getElementById("btnUser").disabled = false;
}).catch(function (err) {
	return console.error(err.toString());
});  

//gestion des parties: fonctions

function create_partie_en_cours(partie) {
	let ce_joueur = document.getElementById("nom_joueur").innerHTML; 
	let joueur, adversaire;

	if (partie.joueur1 == ce_joueur) {
		joueur = new Joueur(partie.joueur1, partie.couleur_Joueur1);
		adversaire = new Joueur(partie.joueur2, couleur_inverse(partie.couleur_Joueur1));
	} else {
		joueur = new Joueur(partie.joueur2, couleur_inverse(partie.couleur_Joueur1));
		adversaire = new Joueur(partie.joueur1, partie.couleur_Joueur1);
    }
	partie_en_cours = new Partie(partie.id, joueur, adversaire); 
}



function removeGame(game_id) {
	var liste = document.getElementById("liste_parties");
	for (var i = 0; i < liste.length; i++) {
		if (liste[i].value == game_id) {
			liste.remove(i); 
        }
    }
}

function setTablePartie() {
	document.getElementById("joueur1_nom").innerHTML = partie_en_cours.joueur.nom;
	document.getElementById("joueur2_nom").innerHTML = partie_en_cours.adversaire.nom;

	document.getElementById("joueur1_couleur").innerHTML = partie_en_cours.joueur.couleur;
	document.getElementById("joueur2_couleur").innerHTML = partie_en_cours.adversaire.couleur;
}



