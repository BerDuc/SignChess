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

connection.on("GameOn", function (partie) {
	partie_en_cours = new Partie(
		partie.id,
		new Joueur(partie.joueur1, partie.couleur_Joueur1),
		new Joueur(partie.joueur2, couleur_inverse(partie.couleur_Joueur1))
	);
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


