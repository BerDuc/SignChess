//gestion des parties: réception

connection.on("GameProposed", function (joueur, partie) {
	var liste = document.getElementById("liste_parties");
	var opt = document.createElement("option");
	opt.innerHTML = joueur;
	opt.value = partie;
	liste.appendChild(opt);
});

connection.on("PartieIndisponible", function (partie_id) {
	alert("Partie indisponible");
	removeGame(partie_id);
});


connection.on("console", function (message) {
	console.log(message);
});

connection.on("GameOn", function (partie) {
	partie_en_cours = partie;
	setTablePartie();
	creerGrille(8);
	placerPieces();
});

connection.on("RemoveGame", function (game_id) {
	removeGame(game_id);
});

//réception d'un nouveau coup


connection.on("ReceiveMessage", function (coup) {
	//récupérer le coup - tuile de départ et tuile d'arrivée et le reproduire
	deplacerPiece(coup);
});


