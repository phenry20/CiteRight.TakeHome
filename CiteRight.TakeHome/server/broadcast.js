const { createClient } = require("@supabase/supabase-js");

// Would never do this in production code, but just hardcoding it here for simplicity.
const SUPABASE_URL = "https://ldtfrwppvqpsdydwieem.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGZyd3BwdnFwc2R5ZHdpZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MTMyOTQsImV4cCI6MTk5MzA4OTI5NH0.fBEJvKs4rh14RSIpGMfWeKsKRrq2EhojeZyEUEyp9Fw";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const channel = supabase.channel("docs", {
  config: {
    broadcast: { ack: true },
  },
});

async function broadcastTextUpdate() {
  const resp = await channel.send({
    type: "broadcast",
    event: "text_updated",
    payload: { text: global.text },
  });

  if (resp !== "ok") {
    // TODO: Resend on exponential backoff if failed.
  }
}

function broadcastSetup() {
  channel
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        let resp = await channel.send({
          type: "broadcast",
          event: "connected",
          payload: { type: "server" },
        });

        if (resp !== "ok") {
          // TODO: Resend on exponential backoff if failed.
        }
      }
    })
    .on("broadcast", { event: "connected" }, async ({ payload }) => {
      console.log("ON BROADCAST");
      if (payload.type !== "client") {
        return;
      }

      await broadcastTextUpdate(channel);
    });
}

module.exports = {
  broadcastSetup,
  broadcastTextUpdate,
};
