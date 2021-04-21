import Arweave from 'arweave';
import * as SmartWeave from 'smartweave';

const App = {
  arweave: null,
  contractId: null,
  wallet: null
};

async function readContract() {
  const contractState = await SmartWeave.readContract(
    App.arweave,
    App.contractId
  );

  log('Contract State', contractState);

  return contractState;
}

async function renderStatus() {
  const contractState = await readContract();

  const statusElement = document.getElementById('is-art-status');

  if(contractState.isArt) {
    statusElement.innerText = 'is';
  } else {
    statusElement.innerText = 'is not';
  }
}

function handleFiles() {
  const filereader = new FileReader();

  const inputFile = this.files[0];

  filereader.addEventListener('load', event => {
    try {
      App.wallet = JSON.parse(event.target.result);
      App.arweave.wallets.jwkToAddress(App.wallet).then((address) => {
        log('Wallet', address);
      });

      log('Key file', inputFile.name)
    } catch (e) {
      log('Invalid key file', e);
    }
  });

  filereader.readAsText(inputFile);
}

function handleKeyfile() {
  const keyfileInput = document.getElementById('is-art-keyfile');
  keyfileInput.addEventListener('change', handleFiles, false);
}

function log(message, data) {
  console.log(`[Is Art] ${message}:`, data);
}

async function main() {
  App.arweave = Arweave.init();
  App.arweave.network.getInfo().then((info) => {
    log('Artweave network', info.network);
  });

  App.contractId = import.meta.env.IS_ART_CONTRACT_ID;
  log('Contract ID', App.contractId);

  renderStatus();
  handleKeyfile();
}

document.addEventListener('DOMContentLoaded', async () => {
  await main();
});
