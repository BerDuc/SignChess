//utilitaires
function enable_buttons(array_btn) {
    array_btn.forEach(btn => document.getElementById(btn).disabled = false); 
}


function couleur_inverse(couleur) {
    if (couleur == "blanc") {
        return "noir";
    } else {
        return "blanc";
    }
}


function get_joueur() {
    ce_joueur = document.getElementById("nom_joueur").innerHTML;
    if (partie_en_cours.joueur1.nom == ce_joueur) {
        return partie_en_cours.joueur1;
    } else {
        return partie_en_cours.joueur2;
    }
}

function destination_tuile(destination) {
    if (destination.split("_")[0] != "tuile") {
        destination = document.getElementById(destination).parentNode.id;
    }
    return destination;
}

function enregistrer_coup(coup) {

}