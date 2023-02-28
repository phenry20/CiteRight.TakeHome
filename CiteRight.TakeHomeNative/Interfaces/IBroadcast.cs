using System;
namespace CiteRight.TakeHomeNative.Interfaces
{
    public interface IBroadcast
    {
        public void SendBroadcast(string payload);
        public void onMessageReceived(string payload);
    }
}

