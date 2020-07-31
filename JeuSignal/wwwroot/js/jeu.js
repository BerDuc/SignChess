"use strict";


//Désactiver les boutons jusqu'à ce que la connexion soit établie
document.getElementById("btnUser").disabled = true;
document.getElementById("btnCreerPartie").disabled = true; 
document.getElementById("btnJoindre").disabled = true; 


//variable partie
let partie_en_cours; 

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
	partie_en_cours = partie; 
	setTablePartie()
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


//réception d'un nouveau coup


connection.on("ReceiveMessage", function (coup) {
	//récupérer le coup - tuile de départ et tuile d'arrivée et le reproduire
	deplacerPiece(coup);
});
	


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
	console.log(data); 
	var origine = document.getElementById(data).parentNode.id; 
	var destination = ev.target.id;
	let coup = new Coup(data, origine, destination); 
	ev.target.appendChild(document.getElementById(data));
	document.getElementById(data).value = ev.target.id;
	console.log(partie_en_cours); 
	connection.invoke("SignalerCoup", partie_en_cours.id, coup).catch(function (err) {
		return console.error(err.toString());
	});
	console.log("Message envoyé");
	event.preventDefault();
}

function deplacerPiece(coup) {
	let piece = document.getElementById(coup.piece);
	document.getElementById(coup.origine).removeChild(piece); 
	document.getElementById(coup.destination).appendChild(piece); 
}


//utilitaires
function enabled_buttons() {
	document.getElementById("btnCreerPartie").disabled = false;
	document.getElementById("btnJoindre").disabled = false;
}

