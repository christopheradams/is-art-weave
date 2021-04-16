const fs = require('fs');
const Arweave = require('arweave');
const TestWeave = require('testweave-sdk');
const SmartWeaveSdk = require('smartweave');

async function main() {

  const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
  });

  const testWeave = await TestWeave.default.init(arweave);

  const contractSrc = await fs.readFileSync('./contracts/is-art.js');
  const initState = await fs.readFileSync('./contracts/is-art.json');

  const testContract = await SmartWeaveSdk.createContract(arweave, testWeave.rootJWK, contractSrc, initState)

  console.log(testContract);

  await testWeave.mine();
}

main();
