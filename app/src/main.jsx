import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import App from "./App.jsx";

// El SDK de Stellar usa Buffer (API de Node); en el navegador hay que proveerlo.
if (!window.Buffer) window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
