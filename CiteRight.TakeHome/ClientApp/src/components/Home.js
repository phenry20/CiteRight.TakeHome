import React, { useState } from "react";
import useBroadcast from "../hooks/useBroadcast";
import axios from "axios";

export function Home() {
  return (
    <iframe
      src="http://localhost:3000"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
