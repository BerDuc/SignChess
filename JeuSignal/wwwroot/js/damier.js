﻿//preparation du jeu
function genererTuile(abs, ord) {
	var tuile = document.createElement("div");
	tuile.setAttribute("id", "tuile_" + abs + "_" + ord);
	tuile.setAttribute("ondrop", "drop(event)");
	tuile.setAttribute("ondragover", "allowDrop(event)");
	return tuile;
}

function genererPiece(type, couleur, id) {
	let piece = document.createElement("img");
	piece.setAttribute("src", "../img/" + type + "_" + couleur + ".png");
	piece.setAttribute("id", id);
	piece.setAttribute("name", type + "_" + couleur);
	piece.setAttribute("class", "piece");
	piece.setAttribute("ondragstart", "drag(event)");
	return piece;
}

function creerGrille(arrete) {
	let damier = document.getElementById("monDamier");
	damier.style.width = arrete * 100 + "px";

	let joueur = document.getElementById("nom_joueur").innerHTML

	let couleur = "blancs";
	if (joueur == partie_en_cours.joueur1) {
		couleur = partie_en_cours.couleur_Joueur1;
	} else {
		couleur = document.getElementById("joueur2_couleur").innerHTML
	}
	genererGrille(arrete, couleur, damier);
	quadrillage(arrete);

}

function genererGrille(arrete, joueur, grille_element) {
	console.log("genererGrille. joueur=" + joueur);
	if (joueur == "blancs") {
		for (let i = arrete; i > 0; i--) {
			for (let j = 1; j <= arrete; j++) {
				let tuile = genererTuile(i, j);
				grille_element.appendChild(tuile);
			}
		}
	} else {
		for (let i = 1; i <= arrete; i++) {
			for (let j = arrete; j > 0; j--) {
				let tuile = genererTuile(i, j);
				grille_element.appendChild(tuile);
			}
		}
	}
}

function quadrillage(arrete, couleurPremiere = "black", couleurSeconde = "white") {
	console.log("quadrillage");
	let couleurDepart = couleurPremiere;
	let couleur = couleurDepart;
	let tuile;
	for (let i = 1; i <= arrete; i++) {
		console.log(i);
		couleur = couleurDepart;
		for (let j = 1; j <= arrete; j++) {
			console.log(j);
			tuile = document.getElementById("tuile_" + i + "_" + j);
			console.log("couleur = ");
			console.log(couleur);
			tuile.style["backgroundColor"] = couleur;
			console.log("backgroundColor affecté");
			console.log(tuile.style["backgroundColor"]);
			if (couleur === couleurPremiere) {
				couleur = couleurSeconde;
			} else {
				couleur = couleurPremiere;
			}

		}

		if (couleurDepart === couleurPremiere) {
			couleurDepart = couleurSeconde;
		} else {
			couleurDepart = couleurPremiere;
		}
	}
}


function placerPieces() {
	placerPions();
	placerAutresPieces();
}

function placerPions() {
	console.log("placerPions");
	let pion;
	for (let i = 1; i <= 8; i++) {
		console.log("pions" + i)
		pion = genererPiece("pion", "blanc", "pion_blanc" + i);
		document.getElementById("tuile_2_" + i).appendChild(pion);
		pion = genererPiece("pion", "noir", "pion_noir" + i);
		document.getElementById("tuile_7_" + i).appendChild(pion);
	}


}

function placerAutresPieces() {
	console.log("autre pièces");
	//roi
	let piece = genererPiece("roi", "blanc", "roi_blanc");
	document.getElementById("tuile_1_5").appendChild(piece);
	piece = genererPiece("roi", "noir", "roi_noir");
	document.getElementById("tuile_8_5").appendChild(piece);

	//dame
	piece = genererPiece("dame", "blanche", "dame_blanche");
	document.getElementById("tuile_1_4").appendChild(piece);
	piece = genererPiece("dame", "noire", "dame_noire");
	document.getElementById("tuile_8_4").appendChild(piece);

	//tour
	piece = genererPiece("tour", "noire", "tour_noire1");
	document.getElementById("tuile_8_1").appendChild(piece);
	piece = genererPiece("tour", "noire", "tour_noire2");
	document.getElementById("tuile_8_8").appendChild(piece);

	piece = genererPiece("tour", "blanche", "tour_blanche1");
	document.getElementById("tuile_1_1").appendChild(piece);
	piece = genererPiece("tour", "blanche", "tour_blanche2");
	document.getElementById("tuile_1_8").appendChild(piece);

	//cavalier
	piece = genererPiece("cavalier", "noir", "cavalier_noir1");
	document.getElementById("tuile_8_2").appendChild(piece);
	piece = genererPiece("cavalier", "noir", "cavalier_noir2");
	document.getElementById("tuile_8_7").appendChild(piece);

	piece = genererPiece("cavalier", "blanc", "cavalier_blanc1");
	document.getElementById("tuile_1_2").appendChild(piece);
	piece = genererPiece("cavalier", "blanc", "cavalier_blanc2");
	document.getElementById("tuile_1_7").appendChild(piece);

	//fou
	piece = genererPiece("fou", "noir", "fou_noir1");
	document.getElementById("tuile_8_3").appendChild(piece);
	piece = genererPiece("fou", "noir", "fou_noir2");
	document.getElementById("tuile_8_6").appendChild(piece);

	piece = genererPiece("fou", "blanc", "fou_blanc1");
	document.getElementById("tuile_1_3").appendChild(piece);
	piece = genererPiece("fou", "blanc", "fou_blanc2");
	document.getElementById("tuile_1_6").appendChild(piece);
}


