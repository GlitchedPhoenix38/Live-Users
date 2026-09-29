import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to the backend once, outside the component tree so
// React StrictMode doesn't create a duplicate connection in dev.
const socket = io("http://localhost:4000", {
  autoConnect: true,
  reconnection: true,          // reconnect on network drops
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

export default function App() {
  const [count, setCount] = useState(0);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    // ─── Listen for the live count broadcast ───
    const onCount = (value) => setCount(value);
    socket.on("online-count", onCount);

    // ─── Track connection status ───
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // ─── Cleanup on unmount ───
    return () => {
      socket.off("online-count", onCount);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="container">
      <div className={`card ${connected ? "pulse" : "disconnected"}`}>
        <div className="status-dot" />

        <h1 className="title">
          <span className="green-dot" /> Online Users
        </h1>

        <p className="count">{count}</p>

        <p className={`connection-badge ${connected ? "ok" : "err"}`}>
          {connected ? "Connected" : "Reconnecting..."}
        </p>
      </div>
    </div>
  );
}
