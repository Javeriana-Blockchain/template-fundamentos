import { useState } from "react";
import { conectarWallet, cargarBalances, enviarPago, agregarTrustline, EXPLORER } from "./stellar.js";

export default function App() {
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState([]);
  const [activoSel, setActivoSel] = useState("XLM");
  const [hacia, setHacia] = useState("");
  const [monto, setMonto] = useState("1");
  const [memo, setMemo] = useState("JaveBlockchain");
  const [codigo, setCodigo] = useState("JAVE");
  const [emisor, setEmisor] = useState("");
  const [hash, setHash] = useState("");
  const [estado, setEstado] = useState("");

  async function refrescar(a) {
    setBalances(await cargarBalances(a));
  }

  async function conectar() {
    try {
      setEstado("Conectando con Freighter…");
      const a = await conectarWallet();
      setAddress(a);
      await refrescar(a);
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
      const activo = balances.find((b) => clave(b) === activoSel) ?? { codigo: "XLM", emisor: null };
      const h = await enviarPago({ desde: address, hacia, monto, memo, activo });
      setHash(h);
      setEstado(`Confirmada en ${((performance.now() - t0) / 1000).toFixed(1)} s`);
      await refrescar(address);
    } catch (e) {
      setEstado(`Error: ${e.message}`);
    }
  }

  async function confiar(ev) {
    ev.preventDefault();
    try {
      setEstado("Firmando changeTrust…");
      const h = await agregarTrustline({ desde: address, codigo: codigo.trim().toUpperCase(), emisor: emisor.trim() });
      setHash(h);
      setEstado("Trustline creada. Ahora puedes recibir ese activo.");
      await refrescar(address);
    } catch (e) {
      setEstado(`Error: ${e.message}`);
    }
  }

  const clave = (b) => (b.emisor ? `${b.codigo}:${b.emisor}` : "XLM");

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 600, margin: "40px auto", padding: 16 }}>
      <h1>jave-wallet-starter</h1>
      <p style={{ color: "#555" }}>Testnet · los XLM de aquí no valen nada.</p>

      {!address ? (
        <button onClick={conectar}>Conectar wallet (Freighter)</button>
      ) : (
        <>
          <p><b>Tu dirección:</b> <code>{address}</code></p>

          <h3>Balances</h3>
          <ul>
            {balances.map((b) => (
              <li key={clave(b)}>
                <b>{b.codigo}</b>: {b.balance}
                {b.emisor && <span style={{ color: "#777" }}> · emisor {b.emisor.slice(0, 4)}…{b.emisor.slice(-4)} · límite {b.limite}</span>}
              </li>
            ))}
          </ul>

          <h3>Agregar un activo (trustline)</h3>
          <form onSubmit={confiar} style={{ display: "grid", gap: 8 }}>
            <input placeholder="Código (JAVE)" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
            <input placeholder="Cuenta emisora (G...)" value={emisor} onChange={(e) => setEmisor(e.target.value)} required />
            <button type="submit">Confiar en este activo (cuesta 0,5 XLM de reserva)</button>
          </form>

          <h3>Enviar</h3>
          <form onSubmit={pagar} style={{ display: "grid", gap: 8 }}>
            <select value={activoSel} onChange={(e) => setActivoSel(e.target.value)}>
              {balances.map((b) => (
                <option key={clave(b)} value={clave(b)}>{b.codigo} ({b.balance})</option>
              ))}
            </select>
            <input placeholder="Dirección destino (G...)" value={hacia} onChange={(e) => setHacia(e.target.value)} required />
            <input type="number" min="0.0000001" step="0.0000001" value={monto} onChange={(e) => setMonto(e.target.value)} required />
            <input placeholder="Memo (opcional, máx. 28 caracteres)" value={memo} onChange={(e) => setMemo(e.target.value)} />
            <button type="submit">Enviar</button>
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
