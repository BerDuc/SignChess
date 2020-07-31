//import { Joueur } from "Joueur.js";
"use strict";


//Désactiver les boutons jusqu'à ce que la connexion soit établie
document.getElementById("btnUser").disabled = true;
document.getElementById("btnCreerPartie").disabled = true; 
document.getElementById("btnJoindre").disabled = true; 

//établir la connexion
var connection = new signalR.HubConnectionBuilder().withUrl("/jeuHub").build();

connection.start().then(function () {
	document.getElementById("btnUser").disabled = false;
}).catch(function (err) {
	return console.error(err.toString());
});  

//gestion des parties: réception

connection.on("GameProposed", function (joueur, partie) {
	var liste = document.getElementById("liste_parties");
	var opt = document.createElement("option");
	opt.innerHTML = joueur;
	opt.value = partie;
	liste.appendChild(opt);
});

connection.on("PartieIndisponible", function (partie_id) {
	console.log("PartieIndisponible: "+partie_id);
	alert("Partie indisponible");
	removeGame(partie_id);
});


connection.on("console", function (message) {
	console.log(message); 
});

connection.on("GameOn", function (partie) {
	console.log(JSON.stringify(partie));
	setTablePartie(partie)
	creerGrille(8);
});

connection.on("RemoveGame", function (game_id) {
	removeGame(game_id);  
});

//gestion des parties: envoie

document.getElementById("btnCreerPartie").addEventListener("click", function (event) {
	var joueur = document.getElementById("nom_joueur").innerHTML;
	connection.invoke("Create_Game", joueur).catch(function (err) {
		 console.log(err.toString());
	});
	event.preventDefault(); 
});

document.getElementById('btnJoindre').addEventListener("click", function (event) {
	var user = document.getElementById("nom_joueur").innerHTML;
	console.log("user = " + user);
	var partie = document.getElementById("liste_parties").value;
	console.log("partie= " + partie);
	connection.invoke("Join_Game", partie, user).catch(function (err) {
		console.log("catch d'erreur");
		return console.error(err.toString());
	});
	event.preventDefault();
});



document.getElementById('btnUser').addEventListener("click", function (event) {
	var nomJoueur = document.getElementById("txt_nom_joueur").value;
	document.getElementById("nom_joueur").innerHTML = nomJoueur;
	enabled_buttons();
	event.preventDefault();
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

function setTablePartie(partie) {
	document.getElementById("joueur1_nom").innerHTML = partie.joueur1;
	document.getElementById("joueur2_nom").innerHTML = partie.joueur2;

	document.getElementById("joueur1_couleur").innerHTML = partie.couleur_Joueur1;
	if (partie.couleur_Joueur1 === "noirs") {
		document.getElementById("joueur2_couleur").innerHTML = "blancs";
    } else {
		document.getElementById("joueur2_couleur").innerHTML = "noirs";
    }
	
}


//réception d'un nouveau coup

/*
connection.on("ReceiveMessage", function (user, coup) {
	//récupérer le coup - tuile de départ et tuile d'arrivée et le reproduire
	console.log("Message reçu!");
	console.log("coup: " + coup);
	*/
	/*	
		var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); //whaat???
		var encodedMsg = user + " says " + msg;
		var li = document.createElement("li"); //ajoute un message à la liste
		li.textContent = encodedMsg;
		document.getElementById("messagesList").appendChild(li);
	
});
	*/


//grille
	

function genererTuile(abs, ord) {
	var tuile = document.createElement("div");
	tuile.setAttribute("id", "tuile_" + abs + "_" + ord);
	tuile.setAttribute("ondrop", "drop(event)");
	tuile.setAttribute("ondragover", "allowDrop(event)");
	return tuile;
}



function genererGrille(arrete) {
	for (var i = 0; i < arrete; i++) {
		for (var j = 0; j < arrete; j++) {
			var tuile = genererTuile(i + 1, j + 1);
			switch (i) {
				case 1:
					var pion = document.createElement("img");
					pion.setAttribute("src", "../img/pion_blanc.png");
					pion.setAttribute("id", "pion_blanc" + j);
					pion.setAttribute("name", "pion_blanc");
					pion.setAttribute("class", "piece");
					pion.setAttribute("ondragstart", "drag(event)");
					pion.value = tuile.id;
					tuile.appendChild(pion);
					document.getElementById("monDamier").appendChild(tuile);
					break;
				case arrete - 2:
					var pion = document.createElement("img");
					pion.setAttribute("id", "pion_noir" + j);
					pion.setAttribute("name", "pion_noir");
					pion.setAttribute("class", "piece");
					pion.setAttribute("src", "../img/pion_noir.png");
					pion.setAttribute("ondragstart", "drag(event)");
					pion.value = tuile.id;
					tuile.appendChild(pion);
					document.getElementById("monDamier").appendChild(tuile);
					break;
				default:
					document.getElementById("monDamier").appendChild(tuile);
			}
		}
	}
}



function creerGrille(arrete) {
	document.getElementById("monDamier").style.width = arrete * 100 + "px";
	genererGrille(arrete);
}



//drag and drop


function drag(ev) {
	ev.dataTransfer.setData("piece_id", ev.target.id);
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("piece_id");
	ev.target.appendChild(document.getElementById(data));
	var coup = data + "-" + document.getElementById(data).value + "-" + ev.target.id;
	//par exemple, coup: "pion8-tuile_
	console.log("Coup joué: " + coup);
	document.getElementById(data).value = ev.target.id;
	var user = "usager standard";
	connection.invoke("SignalerCoup", user, coup).catch(function (err) {
		return console.error(err.toString());
	});
	console.log("Message envoyé");
	event.preventDefault();
}


//utilitaires
function enabled_buttons() {
	document.getElementById("btnCreerPartie").disabled = false;
	document.getElementById("btnJoindre").disabled = false;
}

