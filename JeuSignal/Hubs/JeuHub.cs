using JeuSignal.DataProviders;
using JeuSignal.model;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JeuSignal.Hubs
{
    public class JeuHub : Hub
    {
        public async Task Create_Game(string joueur)
        {
            Partie partie = new Dpo_Parties().AddGame(joueur);

            await Groups.AddToGroupAsync(Context.ConnectionId, partie.Id);
            await Clients.All.SendAsync("GameProposed", partie.Joueur1, partie.Id);
        }

        public async Task Join_Game(string game_id, string joueur2)
        {
            Console.WriteLine("Join_Game; "+game_id);
            Dpo_Parties provider = new Dpo_Parties();
            Partie partie = provider.FindGame(game_id);

            if (partie.Joueur2 == null || partie.Joueur2 == "")
            {
                provider.AddPlayer(partie.Id, joueur2);
                partie.Joueur2 = joueur2;

                await Groups.AddToGroupAsync(Context.ConnectionId, partie.Id); 
                await Clients.Group(partie.Id).SendAsync("GameOn", partie);
                await Clients.All.SendAsync("RemoveGame", game_id);
            }
            else
            {
                await Clients.Caller.SendAsync("PartieIndisponible", partie.Id);
            }

        } 


            public async Task SignalerCoup(string partie, string coup)
        {
            await Clients.OthersInGroup(partie).SendAsync("ReceiveMessage", coup);
        }

        /*créer un objet "partie" avec un nom et deux joueurs possibles. Le nom de la partie dois 
         * servir à identifier un groupe. 
         * 
         * faire en sorte qu'il ne puisse pas y avoir plus que deux connexions par groupe
         * 
         * partager le même damier?
         * un joueur qui crée la partie (et le damier) et un autre qui la rejoint
         * 
         * ensuite, partage à travers le groupe.
         */


            /*
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("console", "onconnectedAsync message");
            await base.OnConnectedAsync();
        }
        */


    }
}
