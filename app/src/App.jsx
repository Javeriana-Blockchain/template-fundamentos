import { useState } from "react";
import { conectarWallet, cargarBalances, enviarPago, EXPLORER } from "./stellar.js";

export default function App() {
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState([]);
  const [hacia, setHacia] = useState("");
  const [monto, setMonto] = useState("1");
  const [memo, setMemo] = useState("JaveBlockchain");
  const [hash, setHash] = useState("");
  const [estado, setEstado] = useState("");

  async function conectar() {
    try {
      setEstado("Conectando con Freighter…");
      const a = await conectarWallet();
      setAddress(a);
      setBalances(await cargarBalances(a));
      setEstado("");
    } catch (e) {
      setEstado(`Error: ${e.message}`);
    }
  }

  async function pagar(ev) {
    ev.preventDefault();
    try {
      setEstado("Firmando y enviando…");
      const t0 = performance.now();
      const h = await enviarPago({ desde: address, hacia, monto, memo });
      const seg = ((performance.now() - t0) / 1000).toFixed(1);
      setHash(h);
      setEstado(`Confirmada en ${seg} s`);
      setBalances(await cargarBalances(address));
    } catch (e) {
      setEstado(`Error: ${e.message}`);
    }
  }

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h1>jave-wallet-starter</h1>
      <p style={{ color: "#555" }}>Testnet · los XLM de aquí no valen nada.</p>

      {!address ? (
        <button onClick={conectar}>Conectar wallet (Freighter)</button>
      ) : (
        <>
          <p><b>Tu dirección:</b> <code>{address}</code></p>
          <ul>
            {balances.map((b) => (
              <li key={b.codigo}>{b.codigo}: {b.balance}</li>
            ))}
          </ul>

          <form onSubmit={pagar} style={{ display: "grid", gap: 8 }}>
            <input placeholder="Dirección destino (G...)" value={hacia} onChange={(e) => setHacia(e.target.value)} required />
            <input type="number" min="0.0000001" step="0.0000001" value={monto} onChange={(e) => setMonto(e.target.value)} required />
            <input placeholder="Memo (opcional, máx. 28 caracteres)" value={memo} onChange={(e) => setMemo(e.target.value)} />
            <button type="submit">Enviar XLM</button>
          </form>

          {hash && (
            <p>
              Hash: <a href={`${EXPLORER}/tx/${hash}`} target="_blank" rel="noreferrer"><code>{hash}</code></a>
            </p>
          )}
        </>
      )}
      {estado && <p>{estado}</p>}
    </main>
  );
}
