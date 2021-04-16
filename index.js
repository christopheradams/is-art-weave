import Arweave from 'arweave';

async function main() {
  const arweave = Arweave.init();
  arweave.network.getInfo().then(console.log);
}

document.addEventListener('DOMContentLoaded', async () => {
  await main();
});
