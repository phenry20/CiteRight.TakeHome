using System;
using Newtonsoft.Json;
using Supabase.Realtime.Models;

namespace CiteRight.TakeHomeNative.Models.Broadcast
{
    class ConnectedBroadcast : BaseBroadcast<ConnectedState> {}

    class ConnectedState
    {
        public ConnectedState(string type)
        {
            this.Type = type;
        }

        [JsonProperty("type")]
        public string Type { get; set; }
    }
}

