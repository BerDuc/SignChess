

function valider_coup(couleurJoueur, coup) {
    let couleurPiece = coup.piece.split("_")[1];

    if (couleurJoueur != couleurPiece) {
        return false;
    }

    if (coup.origine == coup.destination) {
        console.log(coup.origine + " = " + coup.destination); 
        return false;
    }

    let tuileDestination = document.getElementById(coup.destination);
    if (case_occupee(tuileDestination) && !est_prise(couleurJoueur, tuileDestination)) {
        return  false;
    }

    switch (coup.piece.split("_")[0]) {
        case "pion":
            return  valider_pion(coup);
            break;
        case "cavalier":
            return  valider_cavalier(coup);
            break;
        case "fou":
            return  valider_fou(coup);
            break;
        case "tour":
            return  valider_tour(coup);
            break;
        case "dame":
            return  valider_dame(coup);
            break;
        case "roi": 
            return  valider_roi(coup);
            break;
        default:
            return  false;
    }
}



function case_occupee(destination) {
    occupee = false;
    console.log(destination.id + " occupée? " + destination.hasChildNodes());
    if (destination.hasChildNodes()) {
        console.log("la case est occupée");
        occupee = true;
    }
    return occupee;
}

function est_prise(couleurJoueur, destination) {
    prise = false;
    if (destination.hasChildNodes()) {
        piece = destination.firstChild.id.split("_");
        if (piece[1] != couleurJoueur) {
            console.log("c'est une prise");
            prise = true;
        }
    }

    return prise;
}

function valider_pion(coup) {
    valide = true;
    return valide;
}

function valider_cavalier(coup) {
    valide = true;
    return valide;
}

function valider_fou(coup) {
    valide = true;
    origine = coup.origine.split("_");
    destination = coup.destination.split("_");

    if (Math.abs(origine[0] - destination[0]) != Math.abs(origine[1] - destination[1])) {
        valide = false;
    }

    return valide;
}

function valider_tour(coup) {
    valide = true;
    origine = coup.origine.split("_");
    destination = coup.destination.split("_");

    if (origine[0] != destination[0] && origine[1] != destination[1]) {
        valide = false;
    }

    return valide;
}

function valider_dame(coup) {
    valide = true;
    if (!valider_fou(coup) && !valider_tour(coup)) {
        valide = false;
    }
    return valide;
}

function valider_roi(coup) {
    valide = true;
    origine = coup.origine.split("_");
    destination = coup.destination.split("_");

    //cas normal: il bouge d'un
    if (Math.abs(origine[0] - destination[0]) > 1 || Math.abs(origine[1] - destination[1]) > 1) {
        valide = false;
    }


    //cas d'exception: le roque: c'est un déplacement latéral de deux cases.
    //s'il roque, il faut vérifier les conditions suivantes
    //1. toutes les cases entre le roi et la tour sont libres
    //2. aucune case entre le roi et la tour n'est menacée
    //3. le roi n'a jamais bougé de cette partie
    //4. la tour n'a jamais bougé de cette partie. 

    return valide;
}