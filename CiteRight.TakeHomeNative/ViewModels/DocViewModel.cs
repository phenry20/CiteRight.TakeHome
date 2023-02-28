using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Windows.Input;
using CiteRight.TakeHomeNative.Helpers;
using CiteRight.TakeHomeNative.Models;
using CiteRight.TakeHomeNative.Models.Broadcast;
using RestSharp;
using static System.Net.Mime.MediaTypeNames;

namespace CiteRight.TakeHomeNative.ViewModels
{
    public class DocViewModel
    {
        private DocModel docModel;
        private Supabase.Client client;

        public DocModel DocModel { get; set; }
        public ICommand AppendTextCommand { get; private set; }


        public DocViewModel() {
            DocModel = new DocModel("");
        }

        public DocViewModel(Supabase.Client client) : this()
        {
            this.client = client;
            this.AppendTextCommand = new AppendTextCommand(client);


            var channel = client.Realtime.Channel("docs");
            var broadcast = channel.Register<DocsBroadcast>(false, true);
            broadcast.OnBroadcast += (sender, args) =>
            {
                var state = broadcast.Current();
                DocModel.Text = state.Payload.Text;
                Console.WriteLine("TEXT:");
            };

            var payload = new ConnectedBroadcast { Event = "connected", Payload = new ConnectedState("client") };

            AsyncHelper.RunSync(() => channel.Subscribe());
            AsyncHelper.RunSync(() => channel.Send(Supabase.Realtime.Constants.ChannelEventName.Broadcast, "connected",  payload));
        }
    }

    class AppendTextCommand : ICommand
    {
        private Supabase.Client client;
        private RestClient restClient = new RestClient("http://localhost:5050/doc");

        public AppendTextCommand(Supabase.Client client)
        {
            this.client = client;
        }

        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter)
        {
            return true;
        }

        public void Execute(object parameter)
        {
            var request = new RestRequest().AddJsonBody<DocsState>(new DocsState { Text = (string)parameter });

            var response = AsyncHelper.RunSync(() => restClient.PutAsync(request));
        }
    }
}

