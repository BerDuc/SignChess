class Tour {
    constructor(numero, joueur) {
        this._numero = numero; 
        this._joueur = joueur;
    }

    get numero() {
        return this._numero;
    }
    set numero(val) {
        this._numero = val;
    }
    get joueur() {
        return this._numero;
    }
    set joueur(val) {
        this._joueur = val;
    }
}