import Arweave from 'arweave';
import * as SmartWeave from 'smartweave';

const App = {
  arweave: null,
  contractId: null,
  input: {
    function: 'toggle'
  },
  wallet: null
};

const Doc = {
  keyfile: null,
  status: null,
  toggle: null,
}

async function readContract() {
  const contractState = await SmartWeave.readContract(
    App.arweave,
    App.contractId
  );

  log('Contract State', contractState);

  return contractState;
}

async function writeContract() {
  const interactWrite = await SmartWeave.interactWrite(
    App.arweave,
    App.wallet,
    App.contractId,
    App.input
  );

  return interactWrite;
}

async function interactRead() {
  const interactRead = await SmartWeave.interactRead(
    App.arweave,
    App.wallet,
    App.contractId,
    App.input
  );
}

async function renderStatus(contractState) {
  if(contractState.isArt) {
    Doc.status.innerText = 'is';
  } else {
    Doc.status.innerText = 'is not';
  }
}

async function readStatus() {
  const contractState = await readContract();
  renderStatus(contractState);
}

async function handleSubmit(event) {
  event.preventDefault();
  Doc.toggle.disabled = true;

  if (window.confirm("Do you want to submit the transaction?")) {
    const txId = await writeContract();
    log('Transaction ID', txId);
    window.alert(`Transaction ID: ${txId}`);
  }

  Doc.toggle.disabled = false;
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

function handleDocument() {
  Doc.status = document.getElementById('is-art-status');

  Doc.keyfile = document.getElementById('is-art-keyfile');
  Doc.keyfile.addEventListener('change', handleFiles, false);

  Doc.toggle = document.getElementById('is-art-toggle');
  Doc.toggle.addEventListener('click', handleSubmit, false);
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

  handleDocument();

  readStatus();
  setInterval(readStatus, 60 * 1000);
}

document.addEventListener('DOMContentLoaded', async () => {
  await main();
});
