# jave-wallet-starter

App mínima: conecta Freighter, muestra tu dirección y balance en testnet, y envía un pago en XLM.

```bash
cd app
npm install
npm run dev        # abre http://localhost:5173
```

Requisitos: Node 20 o superior y la extensión Freighter en modo TEST NET.

Archivos que vas a tocar:
- `src/App.jsx`: la interfaz (botones, formulario).
- `src/stellar.js`: todo lo que habla con Stellar (Horizon, construir y firmar la transacción).
