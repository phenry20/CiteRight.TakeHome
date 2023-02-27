import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import useBroadcast from "@/hooks/useBroadcast";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  useBroadcast({
    channelName: "docs",
    broadcastEvent: "text_updated",
    onTrigger: (payload) => {
      setRenderText(payload.text);
    },
  });

  const [renderText, setRenderText] = useState();
  const [textToAppend, setTextToAppend] = useState("");

  function onTextChanged(ev) {
    setTextToAppend(ev.target.value);
  }

  function onAppend() {
    axios.put("http://localhost:5050/doc", {
      text: textToAppend,
    });
  }

  return (
    <main className={styles.main}>
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <p>
              <strong>Current Doc:</strong>
            </p>

            {!renderText ? (
              "Loading..."
            ) : (
              <p style={{ color: "blue" }}>{renderText}</p>
            )}
          </div>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <p>Text to append to doc:</p>
            <input
              type="text"
              style={{ padding: "0.2rem" }}
              onChange={onTextChanged}
              value={textToAppend}
            />
            <div>
              <button onClick={onAppend}>Append</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
