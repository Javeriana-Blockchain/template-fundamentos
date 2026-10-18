// Todo lo que habla con la red Stellar vive aquí.
import {
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo,
} from "@stellar/stellar-sdk";
import { requestAccess, getAddress, signTransaction } from "@stellar/freighter-api";

export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const NETWORK_PASSPHRASE = Networks.TESTNET;
export const EXPLORER = "https://stellar.expert/explorer/testnet";

const server = new Horizon.Server(HORIZON_URL);

/** Pide permiso a Freighter y devuelve la dirección pública (G...). */
export async function conectarWallet() {
  const acceso = await requestAccess();
  if (acceso.error) throw new Error(acceso.error);
  const { address, error } = await getAddress();
  if (error) throw new Error(error);
  return address;
}

/** Devuelve los balances de una cuenta (XLM y activos con trustline). */
export async function cargarBalances(address) {
  const cuenta = await server.loadAccount(address);
  return cuenta.balances.map((b) => ({
    codigo: b.asset_type === "native" ? "XLM" : b.asset_code,
    balance: b.balance,
  }));
}

/**
 * Construye un pago en XLM, lo manda a firmar a Freighter y lo envía a Horizon.
 * Devuelve el hash de la transacción.
 */
export async function enviarPago({ desde, hacia, monto, memo }) {
  const cuenta = await server.loadAccount(desde); // trae el número de secuencia
  const tx = new TransactionBuilder(cuenta, {
    fee: BASE_FEE,               // 100 stroops por operación
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({ destination: hacia, asset: Asset.native(), amount: String(monto) })
    )
    .addMemo(memo ? Memo.text(memo.slice(0, 28)) : Memo.none())
    .setTimeout(60)
    .build();

  // La llave secreta nunca sale de Freighter: le pasamos el XDR y nos devuelve el XDR firmado.
  const firmado = await signTransaction(tx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
    address: desde,
  });
  if (firmado.error) throw new Error(firmado.error);

  const txFirmada = TransactionBuilder.fromXDR(firmado.signedTxXdr, NETWORK_PASSPHRASE);
  const resultado = await server.submitTransaction(txFirmada);
  return resultado.hash;
}
