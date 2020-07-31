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
            await Clients.Others.SendAsync("GameProposed", partie.Joueur1, partie.Id);
        }

        public async Task Join_Game(string game_id, string joueur2)
        {
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


         public async Task SignalerCoup(string partie, Coup coup)
        {
            await Clients.OthersInGroup(partie).SendAsync("ReceiveMessage", coup);
        }

      
        /*
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }
        */


    }
}
