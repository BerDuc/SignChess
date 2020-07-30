using JeuSignal.model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JeuSignal.DataProviders
{

    public class Dpo_Parties
    {
        private readonly string CONNSTRING = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Jeu_SignalR;Integrated Security=True";

        public Partie AddGame(string joueur)
        {
            Partie partie = new Partie(joueur);
            SqlConnection connexion = new SqlConnection();
            connexion.ConnectionString = CONNSTRING;

            //il me semble qu'on peut utiliser les propriétés comme des tableau, ça serait à voir pour améliorer ce code
            SqlCommand commande = new SqlCommand();
            commande.CommandType = CommandType.Text;
            commande.CommandText = "INSERT INTO Parties VALUES (@id, @joueur1, '', @couleur)";
            SqlParameter param = new SqlParameter("id", partie.Id);
            SqlParameter param2 = new SqlParameter("joueur1", partie.Joueur1);
            SqlParameter param3 = new SqlParameter("couleur", partie.Couleur_Joueur1);
            commande.Parameters.Add(param);
            commande.Parameters.Add(param2);
            commande.Parameters.Add(param3);
            commande.Connection = connexion;
            
            try
            {
                connexion.Open();
                int res = commande.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            finally
            {
                commande.Dispose();
                commande = null;
                connexion.Close();
            }
            return partie; 
        }

        public void AddPlayer(string id, string joueur2)
        {
            SqlConnection connexion = new SqlConnection();
            connexion.ConnectionString = CONNSTRING;

            SqlCommand commande = new SqlCommand();
            commande.CommandType = CommandType.Text;
            commande.CommandText = "UPDATE Parties SET joueur2 = @joueur2 WHERE Id LIKE @id";
            SqlParameter param = new SqlParameter("id", id);
            SqlParameter param2 = new SqlParameter("joueur2", joueur2);
            commande.Parameters.Add(param);
            commande.Parameters.Add(param2);
            commande.Connection = connexion;

            try
            {
                connexion.Open();
                int res = commande.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            finally
            {
                commande.Dispose();
                commande = null;
                connexion.Close();
            }

        }

        public Partie FindGame(string id)
        {

            Partie partie = new Partie();

            SqlConnection connexion = new SqlConnection();
            connexion.ConnectionString = CONNSTRING;

            SqlCommand commande = new SqlCommand();
            commande.CommandType = CommandType.Text;
            commande.CommandText = "SELECT * FROM Parties WHERE Id LIKE @id";
            SqlParameter param = new SqlParameter("id", id);
            commande.Parameters.Add(param);
            commande.Connection = connexion;

            try
            {
                connexion.Open();

                SqlDataReader reader = commande.ExecuteReader();
                while (reader.Read())
                {
                    partie.Id = (string)reader["Id"];
                    partie.Joueur1 = (string)reader["Joueur1"];
                    partie.Joueur2 = (string)reader["Joueur2"];
                    partie.Couleur_Joueur1 = (string)reader["couleur_joueur1"];
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            finally
            {
                commande.Dispose();
                commande = null;
                connexion.Close();
            }
            return partie;
        }
    }
}
