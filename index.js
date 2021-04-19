import Arweave from 'arweave';
import * as SmartWeave from 'smartweave';

let wallet;

async function displayStatus(props) {
  const state = await SmartWeave.readContract(
    props.arweave,
    props.contractId
  );

  console.log('[Is Art] State:', state);

  const status = document.getElementById('is-art-status');

  if(state.isArt) {
    status.innerText = 'is';
  } else {
    status.innerText = 'is not';
  }
}

function handleFiles() {
  const filereader = new FileReader();

  const inputFile = this.files[0];

  filereader.addEventListener('load', function (event) {
    try {
      wallet = JSON.parse(event.target.result);

      console.log('[Is Art] Loaded key file:', inputFile.name)
    } catch (e) {
      console.log(e);
    }
  });

  filereader.readAsText(inputFile);
}

function handleKeyfile() {
  const keyfileInput = document.getElementById('is-art-keyfile');
  keyfileInput.addEventListener('change', handleFiles, false);
}

async function main() {
  const arweave = Arweave.init();
  arweave.network.getInfo().then((info) => {
    console.log('[Is Art] Arweave network:', info.network);
  });

  const contractId = import.meta.env.IS_ART_CONTRACT_ID;
  console.log('[Is Art] Contract:', contractId);

  displayStatus({arweave, contractId});
  handleKeyfile();
}

document.addEventListener('DOMContentLoaded', async () => {
  await main();
});
