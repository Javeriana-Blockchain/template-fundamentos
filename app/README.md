# jave-wallet-starter (v2 · sesión 3)

App mínima: conecta Freighter, muestra tus balances en testnet (XLM y cualquier activo con trustline), te deja **agregar un activo** (changeTrust) y **enviar pagos** en XLM o en ese activo.

```bash
cd app
npm install
npm run dev        # abre http://localhost:5173
```

Requisitos: Node 20 o superior y la extensión Freighter en modo TEST NET.

Archivos que vas a tocar:
- `src/App.jsx`: la interfaz (botones, formularios). Aquí van tus 3 pantallas.
- `src/stellar.js`: todo lo que habla con Stellar. Una función por operación: `enviarPago`, `agregarTrustline`, `trustlineYPago` (dos operaciones en una transacción, atómica).

Cómo agregar una operación nueva (p. ej. una oferta en el exchange):
1. En `stellar.js`, una función que arme la operación con `Operation.manageSellOffer({...})` y la pase a `firmarYEnviar`.
2. En `App.jsx`, un formulario que la llame y muestre el hash.
3. Prueba en testnet y busca el hash en stellar.expert.

Errores: Horizon devuelve `result_codes` (`op_no_trust`, `op_underfunded`, `tx_bad_seq`…); la app los muestra tal cual. La tabla de qué significan está en la guía de la sesión 2.

## Sin computador propio: GitHub Codespaces

Desde la página del repo en GitHub: **Code → Codespaces → Create codespace on main**. En la terminal del Codespace:

```bash
cd app && npm install && npm run dev
```

En la pestaña **Ports** aparece el 5173: ábrelo con el icono del globo (se abre en `https://...app.github.dev`). Freighter funciona en esa URL igual que en localhost. El `vite.config.js` ya detecta Codespaces (variable `CODESPACES`) y permite ese host.
