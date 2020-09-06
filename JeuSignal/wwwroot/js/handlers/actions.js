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
	var partie = document.getElementById("liste_parties").value;
	connection.invoke("Join_Game", partie, user).catch(function (err) {
		return console.error(err.toString());
	});
	event.preventDefault();
});



document.getElementById('btnUser').addEventListener("click", function (event) {
	var nomJoueur = document.getElementById("txt_nom_joueur").value;
	document.getElementById("nom_joueur").innerHTML = nomJoueur;
	enable_buttons(["btnCreerPartie", "btnJoindre"]);
	event.preventDefault();
});


//drag and drop


function drag(ev) {
	ev.dataTransfer.setData("piece_id", ev.target.id);
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drop(ev) {
	ev.preventDefault();
	let data = ev.dataTransfer.getData("piece_id");
	let origine = document.getElementById(data).parentNode.id;
	let destination = destination_tuile(ev.target.id);
	let coup = new Coup(data, origine, destination);
	let joueur = get_joueur(); 
	if (valider_coup(joueur.couleur, coup)) {
		console.log("coup valide"); 
		ev.target.appendChild(document.getElementById(data));
		document.getElementById(data).value = ev.target.id;
		coups_joues.push(coup); 
		connection.invoke("SignalerCoup", partie_en_cours.id, coup).catch(function (err) {
			return console.error(err.toString());
		});
	} else {
		console.log("coup invalide"); 
		coup.destination = coup.origine;
		deplacerPiece(coup); 
    }
	event.preventDefault();
}



function deplacerPiece(coup) {
	let piece = document.getElementById(coup.piece);
	document.getElementById(coup.origine).removeChild(piece);
	document.getElementById(coup.destination).appendChild(piece);
}
