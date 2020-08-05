class Joueur {

    constructor(nom, couleur) {
        this._nom = nom;
        this._couleur = couleur;
        this._roi_a_bouge = false;
        this._tour1_a_bouge = false;
        this._tour2_a_bouge = false; 
    }

    get nom() {
        return this._nom;
    }
    set nom(val) {
        this._nom = val;
    }
    get couleur() {
        return this._couleur;
    }
    set couleur(val) {
        this._couleur = val;
    }
    get roi_a_bouge() {
        return this._roi_a_bouge;
    }
    set roi_a_bouge(val) {
        this._roi_a_bouge = val;
    }
    get tour1_a_bouge() {
        return this._tour1_a_bouge;
    }
    set tour1_a_bouge(val) {
        this._tour1_a_bouge = val;
    }
    get tour2_a_bouge() {
        return this._tour2_a_bouge;
    }
    set tour2_a_bouge(val) {
        this._tour2_a_bouge = val;
    }
};

