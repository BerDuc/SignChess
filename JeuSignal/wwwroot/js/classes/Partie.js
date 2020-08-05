class Partie {

    constructor(id, joueur1, joueur2) {
        this._id = id;
        this._joueur1 = joueur1;
        this._joueur2 = joueur2; 
        this._coups_joues = [];
    }

    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    get joueur1() {
        return this._joueur1;
    }
    set joueur1(val) {
        this._joueur1 = val;
    }
    get joueur2() {
        return this._joueur2;
    }
    set joueur2(val) {
        this.joueur2 = val;
    }
    get coups_joues() {
        return this._coups_joues;
    }
    set coups_joues(val) {
        this._coups_joues = val;
    }
}