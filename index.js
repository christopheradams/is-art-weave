import Arweave from 'arweave';

async function main() {
  const arweave = Arweave.init();
  arweave.network.getInfo().then(console.log);

  console.log("Is Art Contract:", import.meta.env.IS_ART_CONTRACT_ID);
}

document.addEventListener('DOMContentLoaded', async () => {
  await main();
});
