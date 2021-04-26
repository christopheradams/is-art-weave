# "Is Art" on Artweave

*Is Art* is a smart contract and distributed application on the
[Arweave] network. It is an adaptation of [Rhea Myers]'s original work
of the same name for Ethereum.

*Is Art* is a minimal, interactive artistic statement. A single
transaction can toggle the work's self-definition as *art* or *not
art*. All interactions with the contract are recorded permanently.

Interacting with the work requires an [Arweave wallet] to pay a
transaction fee.

The [source code] is available under a free license. It includes a
SmartWeave contract with tests, and a JavaScript application that reads
from, queries, and writes to the Arweave network.

## Requirements

* Node.js

```sh
npm install
```

## Development

```sh
npm test
npm run start
```

## Production

Deploy the contract:

```sh
npx smartweave create contracts/is-art.js contracts/is-art.json --key-file [YOUR KEYFILE]
```

Set the contract ID from the previous step:

```sh
echo "SNOWPACK_PUBLIC_IS_ART_CONTRACT_ID=[CONTRACT_ID]" > .env.production
```

Build the site:

```sh
npm run build
```

Create a package (optional):

```sh
npm run package
```

The file `dist/index.html` can be deployed anywhere as a standalone web app.

[Arweave]: https://www.arweave.org/
[Arweave wallet]: https://faucet.arweave.net/
[Rhea Myers]: https://rhea.art/
[source code]: https://github.com/christopheradams/is-art-weave
