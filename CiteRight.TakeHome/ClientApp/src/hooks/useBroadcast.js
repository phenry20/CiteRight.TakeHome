// NOTE: Duplicated in JS Client. It would be best to create a shared module, but it requires a bit of configuration for React using hooks

import { useEffect } from "react";
const { createClient } = require("@supabase/supabase-js");

export default function useBroadcast({
  channelName,
  broadcastEvent,
  onTrigger,
}) {
  useEffect(() => {
    const supabase = getSupabaseClient();
    const channel = supabase.channel(channelName);

    channel
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.send({
            type: "broadcast",
            event: "connected",
            payload: { type: "client" },
          });
        }
      })
      .on("broadcast", { event: broadcastEvent }, ({ payload }) =>
        onTrigger(payload)
      );
  }, [channelName, broadcastEvent, onTrigger]);
}

const getSupabaseClient = () => {
  if (!global.__supabase) {
    // Would never do this in production code, but just hardcoding it here for simplicity.

    const SUPABASE_URL = "https://ldtfrwppvqpsdydwieem.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGZyd3BwdnFwc2R5ZHdpZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MTMyOTQsImV4cCI6MTk5MzA4OTI5NH0.fBEJvKs4rh14RSIpGMfWeKsKRrq2EhojeZyEUEyp9Fw";

    global.__supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  return global.__supabase;
};
