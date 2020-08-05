"use strict";


//Désactiver les boutons jusqu'à ce que la connexion soit établie
document.getElementById("btnUser").disabled = true;
document.getElementById("btnCreerPartie").disabled = true; 
document.getElementById("btnJoindre").disabled = true; 


//variable partie
let partie_en_cours; 
let joueur1;
let joueur2; 

//établir la connexion
var connection = new signalR.HubConnectionBuilder().withUrl("/jeuHub").build();

connection.start().then(function () {
	document.getElementById("btnUser").disabled = false;
}).catch(function (err) {
	return console.error(err.toString());
});  

//gestion des parties: fonctions

function removeGame(game_id) {
	var liste = document.getElementById("liste_parties");
	for (var i = 0; i < liste.length; i++) {
		if (liste[i].value == game_id) {
			liste.remove(i); 
        }
    }
}

function setTablePartie() {
	document.getElementById("joueur1_nom").innerHTML = partie_en_cours.joueur1;
	document.getElementById("joueur2_nom").innerHTML = partie_en_cours.joueur2;

	document.getElementById("joueur1_couleur").innerHTML = partie_en_cours.couleur_Joueur1;
	if (partie_en_cours.couleur_Joueur1 === "noirs") {
		document.getElementById("joueur2_couleur").innerHTML = "blancs";
    } else {
		document.getElementById("joueur2_couleur").innerHTML = "noirs";
    }	
}



