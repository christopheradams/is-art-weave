# "Is Art" on Arweave

![Screenshot](/screenshot.png?raw=true)

Christopher Adams, *Is Art*, 2021.  Custom software (JavaScript, HTML,
CSS).

*Is Art* is a minimal, interactive artistic statement. Each interaction
can change the work's self-definition as *art* or *not art*.

*Is Art* is a smart contract and distributed application for the
[Arweave] network. It is an adaptation of [Rhea Myers]'s original work
for Ethereum.

Transacting with the work requires an [Arweave wallet] to pay a minimal
fee.

The [source code] is available under a free license. It includes a
SmartWeave contract with tests, and a JavaScript application that reads
from, queries, and writes to the Arweave network.

## Instructions

### Requirements

* Node.js

### Installation

```sh
npm install
```

### Development

```sh
npm test
npm run start
```

### Production

#### Contract

Deploy the contract using your Arweave keyfile:

```sh
npm run create -- --key-file=/home/${USER}/path/to/arweave-key.json
```

Set the contract ID from the previous step:

```sh
echo "SNOWPACK_PUBLIC_IS_ART_CONTRACT_ID=[CONTRACT_ID]" > .env.production
```

#### Deploying on Arweave

Build the site:

```sh
npm run build
```

Deploy the site:

```sh
npm run deploy -- --key-file=/home/${USER}/path/to/arweave-key.json
```

#### Deploying on a webserver

Build the site hard-coded to use the `arweave.net` server no matter
where it's deployed:

```sh
SNOWPACK_PUBLIC_IS_ART_HARDCODE_ARWEAVE=true npm run build
```

Create a package:

```sh
npm run package
```

The file `dist/index.html` can be deployed anywhere as a standalone web app.

[Arweave]: https://www.arweave.org/
[Arweave wallet]: https://faucet.arweave.net/
[Rhea Myers]: https://rhea.art/is-art
[source code]: https://github.com/christopheradams/is-art-weave
