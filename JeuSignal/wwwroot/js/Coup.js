class Coup {
    constructor(piece, origine, destination) {
        this.Piece = piece;
        this.Origine = origine; 
        this.Destination = destination; 
    }

    get piece() {
        return this.Piece;
    }
    set piece(val) {
        this.Piece = val;
    }
    
    get origine() {
        return this.Origine;
    }
    set origine(val) {
        this.Origine = val;
    }
    
    get destination() {
        return this.Destination;
    }
    set destination(val) {
        this.Destination = val; 
    }
}