# Live Users

A real-time online users counter built with React + Vite (frontend), Node.js + Express + Socket.IO (backend).

## Project Structure

```
Live Users/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── index.css
└── README.md
```

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The backend starts on **http://localhost:4000**.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on **http://localhost:5173** and opens automatically.

## How It Works

- Each browser tab connects to the Socket.IO server and is assigned a unique socket ID.
- The server tracks all active socket IDs in a `Set`, which prevents duplicates.
- On every connect/disconnect the server broadcasts the updated count to **all** clients.
- When a tab is closed, refreshed, or loses network, Socket.IO fires a `disconnect` event and the user is removed from the count instantly.

## Testing

1. Open **http://localhost:5173** in one tab — count shows **1**.
2. Open the same URL in a second tab — count updates to **2** on both tabs.
3. Close one tab — count drops back to **1**.
4. You can also test across different devices on the same network by replacing `localhost` with your machine's local IP in both `vite.config.js` (origin) and `server.js` (CORS origin + `socket.io-client` URL in `App.jsx`).

## Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | React 18, Vite 5              |
| Backend  | Node.js, Express 4, Socket.IO 4 |
| Styling  | Pure CSS (dark mode, animations) |
