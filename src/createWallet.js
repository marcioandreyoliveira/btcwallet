const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const network = bitcoin.networks.testnet;

// Carteiras HD
//  m/49'/X'/0'/0: X = 1: testnet. X = 0: mainnet
const path = `m/49'/1'/0'/0`;

let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Criar conta (private + public keys)
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Criando o endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);
