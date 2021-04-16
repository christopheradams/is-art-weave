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

  const contractId = 'tACO2VyB2Bdohnp5S0gMNW1bufC5P515QDUnLlBk5Lo';

  const readContract = await SmartWeaveSdk.readContract(arweave, contractId, 100, true)

  console.log(readContract);
}

main();
