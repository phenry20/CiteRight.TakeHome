using System;
using Newtonsoft.Json;
using Supabase.Realtime.Models;

namespace CiteRight.TakeHomeNative.Models.Broadcast
{
    class DocsBroadcast : BaseBroadcast<DocsState> { }
    class DocsState
    {
        [JsonProperty("text")]
        public string Text { get; set; }
    }
}

