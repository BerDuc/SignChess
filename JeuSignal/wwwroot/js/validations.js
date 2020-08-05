function valider_coup(coup) {
    let valide; 
    switch (coup.piece.split[0]) {
        case "pion":
            valide = valider_pion(coup);
            break;
        case "cavalier":
            valide = valider_cavalier(coup); 
            break;
        case "fou":
            valide = valider_fou(coup); 
            break;
        case "tour":
            valide = valider_tour(coup); 
            break;
        case "dame":
            valide = valider_dame(coup); 
            break;
        case: "roi"
            valide = valider_roi(coup); 
            break;
        default:
            valide = false; 
    }
    return valide;
}


function est_prise(couleurJoueur, destination) {    
    prise = false; 

    if (destination.hasChildNodes) {
        piece = destination.firstChild().id.split("_");
        if (piece[1] != couleurJoueur) {
            prise = true; 
        }
    }

    return prise; 
}