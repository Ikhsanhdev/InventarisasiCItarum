using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IrigasiManganti.Hubs
{
    public class FlowMeterHub : Hub
    {
        public async Task SendToAll(string message)
        {
            await Clients.All.SendAsync("FlowMeterReading", message);
        }
    }
}
