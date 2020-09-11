class Partie {

    constructor(id, joueur1, joueur2) {
        this._id = id;
        this._joueur= joueur1;
        this._adversaire = joueur2; 
        this._coups_joues = [];
    }

    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    get joueur() {
        return this._joueur;
    }
    set joueur(val) {
        this._joueur = val;
    }
    get adversaire() {
        return this._adversaire;
    }
    set adversaire(val) {
        this._adversaire = val;
    }
    get coups_joues() {
        return this._coups_joues;
    }
    set coups_joues(val) {
        this._coups_joues = val;
    }
}