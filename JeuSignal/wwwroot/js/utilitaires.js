//utilitaires
function enable_buttons(array_btn) {
    array_btn.forEach(btn => document.getElementById(btn).disabled = false); 
}

function couleur_inverse(couleur) {
    if (couleur == "blancs") {
        return "noirs";
    } else {
        return "blancs";
    }
}