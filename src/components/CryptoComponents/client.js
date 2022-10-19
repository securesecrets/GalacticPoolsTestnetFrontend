import { SecretNetworkClient } from "secretjs";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: "../../../.env" });

export async function setupKeplr() {
  const sleep = (number) =>
    new Promise((resolve) => setTimeout(resolve, number));
  const SECRET_REST_API = process.env.REACT_APP_SECRET_REST_URL;

  const SECRET_CHAIN_ID = process.env.REACT_APP_SECRET_CHAIN_ID;

  while (
    !window.keplr ||
    !window.getEnigmaUtils ||
    !window.getOfflineSignerOnlyAmino
  ) {
    await sleep(50);
  }

  await window.keplr.enable(SECRET_CHAIN_ID);
  const keplrOfflineSigner =
    window.keplr.getOfflineSignerOnlyAmino(SECRET_CHAIN_ID);

  const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

  const grpcWebUrl = SECRET_REST_API;

  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl,
    chainId: SECRET_CHAIN_ID,
    wallet: keplrOfflineSigner,
    walletAddress: myAddress,
    encryptionUtils: window.keplr.getEnigmaUtils(SECRET_CHAIN_ID),
  });

  let obj = {
    address: myAddress,
    secretjs,
  };

  return obj;
}
