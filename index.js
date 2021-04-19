import Arweave from 'arweave';
import * as SmartWeave from 'smartweave';

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

async function main() {
  const arweave = Arweave.init();
  arweave.network.getInfo().then((info) => {
    console.log('[Is Art] Arweave network:', info.network);
  });

  const contractId = import.meta.env.IS_ART_CONTRACT_ID;
  console.log('[Is Art] Contract:', contractId);

  displayStatus({arweave, contractId});
}

document.addEventListener('DOMContentLoaded', async () => {
  await main();
});
