using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace JeuSignal.model
{
    public class Partie
    {

        private string _id;
        private string _joueur1;
        private string _joueur2;
        private string _couleur_joueur1;

        public Partie() { }

        public Partie(string joueur1)
        {
            this._joueur1 = joueur1;
            this._id = Path.GetRandomFileName().Replace(".", "");
            this._couleur_joueur1 = getRandomColor();
        }

        private string getRandomColor()
        {
            string couleur; 
            Random rd = new Random();
            if (rd.Next(1, 3) == 1)
                couleur = "blancs";
            else
                couleur = "noirs";
            return couleur; 
        }

        public string Id 
        { 
            get { return this._id; }
            set { this._id = value; }
        }
        public string Joueur1 
        {
            get { return this._joueur1; }
            set { this._joueur1 = value;  }
        }
        public string Joueur2
        {
            get { return this._joueur2; }
            set { this._joueur2 = value; }
        }

        public string Couleur_Joueur1
        {
            get { return this._couleur_joueur1; }
            set { this._couleur_joueur1 = value; }
        }
    }
}
