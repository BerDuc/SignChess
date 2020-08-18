

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

    console.log(couleurJoueur); 
    switch (coup.piece.split("_")[0]) {
        case "pion":
            return valider_pion(couleurJoueur, coup);
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
function renverserCoup(coup) {
    coup[1] = 9 - coup[1]; 
    return coup;
}

function valider_pion(couleurJoueur, coup) {
    let valide = true;   
    let origine = coup.origine.split("_");    
    let destination = coup.destination.split("_");
    if (couleurJoueur == "noir") {
        origine = renverserCoup(origine);
        destination = renverserCoup(destination);
    }
    let caseDepart = 2; 
    let caseEnPassant = 5;
    let mouv= 1;
    let mouvDepart = 2;
    console.log("destination[1] = " + destination[1]);
    console.log("origine[1] = " + origine[1]);

    if (est_prise(couleurJoueur, document.getElementById(coup.destination))) {
        console.log("est prise");
        console.log((Math.abs(destination[2] - origine[2])))
        if (destination[1] - origine[1] != mouv || Math.abs(destination[2] - origine[2]) != 1) {
            valide = false;
        }
    } else {
        console.log("pas prise");
        //if en_passant
        if (destination[2] - origine[2] != 0) {
            console.log("pas devant?");
            valide = false;
        } else {
            if (origine[1] == caseDepart) {
                if (destination[1] - origine[1] > mouvDepart || destination[1] - origine[1] < 0) {
                    valide = false;                  
                }
                if (valide) {
                    if (couleurJoueur == "noir") {
                        origine = renverserCoup(origine);
                        destination = renverserCoup(destination);
                    }
                    valide = verifier_trajectoire_tour(origine, destination);
                }
            } else {
                if (destination[1] - origine[1] > mouv || destination[1] - origine[1] < 0) {
                    valide = false;
                }
            }
        }
    }

   

    return valide;
}



function valider_cavalier(coup) {
    valide = false;
    origine = coup.origine.split("_");
    destination = coup.destination.split("_");

    if (Math.abs(origine[1] - destination[1]) == 2 || Math.abs(origine[2] - destination[2]) == 2) {
        if (Math.abs(origine[1] - destination[1]) == 2) {
            if (Math.abs(origine[2] - destination[2]) == 1) {
                valide = true;
            }
        } else {
            if (Math.abs(origine[1] - destination[1]) == 1) {
                valide = true;
            }
        }
    }
    
    return valide;
}

function valider_fou(coup) {
    valide = true;
    origine = coup.origine.split("_");
    destination = coup.destination.split("_");
    
    if (Math.abs(origine[1] - destination[1]) != Math.abs(origine[2] - destination[2])) {
        valide = false;
    }

    if (valide) {
        valide = verifier_trajectoire_fou(origine, destination); 
    }

    return valide;
}

function verifier_trajectoire_fou(origine, destination) {
    
    if (origine[1] > destination[1] && origine[2] > destination[2]) {
        let j = +destination[2] + 1;
        for (let i = +destination[1] + 1; i < origine[1]; i++) {
            let case_id = "tuile_" + i + "_" + j;
            tuile = document.getElementById(case_id);
            if (case_occupee(tuile)) {
                return false;
            }
            j++;
        }
    }

    if (origine[1] < destination[1] && origine[2] < destination[2]) {
        let j = destination[2]-1;
        for (let i = destination[1]-1; i > origine[1]; i--) {
            let case_id = "tuile_" + i + "_" + j;
            tuile = document.getElementById(case_id);
            if (case_occupee(tuile)) {
                        return false;
            }
            j--;
        }

    }

    if(origine[1] > destination[1] && origine[2] < destination[2]) {
        let j = destination[2]-1;
        for (let i = +destination[1]+1; i < origine[1]; i++) {
            let case_id = "tuile_" + i + "_" + j;
            tuile = document.getElementById(case_id);
            if (case_occupee(tuile)) {

                return false;
            }
            j--;
        }
    }


    if (origine[1] < destination[1] && origine[2] > destination[2]) {

        let j = +destination[2]+1;
        for (let i = destination[1]-1; i  > origine[1]; i--) {
            let case_id = "tuile_" + i + "_" + j;
            tuile = document.getElementById(case_id);
            if (case_occupee(tuile)) {
                return false;
            }
            j++;
        }
    }

    return true;
}


function valider_tour(coup) {
    valide = true;
    origine = coup.origine.split("_");
    destination = coup.destination.split("_");

    if (origine[1] != destination[1] && origine[2] != destination[2]) {
        valide = false;
    }

    if (valide) {
        valide = verifier_trajectoire_tour(origine, destination);
    }
    return valide;
}

function verifier_trajectoire_tour(origine, destination) {
    valide = true;

    if (origine[1] == destination[1]) {
        let i = origine[1];
        if (origine[2] < destination[2]) {
            for (let j = destination[2]-1; j > origine[2]; j--) {
                let case_id = "tuile_" + i + "_" + j;
                tuile = document.getElementById(case_id);
                if (case_occupee(tuile)) {
                    return false;
                }
            }
        } else {
            for (let j = +destination[2]+1; j < origine[2]; j++) {
                let case_id = "tuile_" + i + "_" + j;
                tuile = document.getElementById(case_id);
                if (case_occupee(tuile)) {
                    return false;
                }
            }
        }
    }
    if (origine[2] == destination[2]) {
        let j = origine[2];
        if (origine[1] < destination[1]) {
            for (let i = destination[1]-1; i > origine[1]; i--) {
                let case_id = "tuile_" + i + "_" + j;
                tuile = document.getElementById(case_id);
                if (case_occupee(tuile)) {
                    return false;
                }
            }

        } else {
            for (let i = +destination[1]+1; i < origine[1]; i++) {
                let case_id = "tuile_" + i + "_" + j;
                tuile = document.getElementById(case_id);
                if (case_occupee(tuile)) {
                    return false;
                }
            }
        }
    }

    return true;
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
    if (Math.abs(origine[1] - destination[1]) > 1 || Math.abs(origine[2] - destination[2]) > 1) {
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