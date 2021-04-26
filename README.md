# "Is Art" on Artweave

*Is Art* is a smart contract and distributed application on the
[Arweave] network. It is an adaptation of [Rhea Myers]'s original work
of the same name on the Ethereum network.

*Is Art* is a minimal, interactive artistic statement. A single
transaction can toggle the work's self-definition as *art* or *not
art*. All interactions with the contract are recorded permanently.

Transacting with the work requires an [Arweave wallet] and a small fee.

The [source code] is available for free under the MIT license. It includes
a SmartWeave contract with tests, and a JavaScript application that
reads from, queries, and writes to the Arweave network.

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

```sh
npx smartweave create contracts/is-art.js contracts/is-art.json --key-file [YOUR KEYFILE]
echo "SNOWPACK_PUBLIC_IS_ART_CONTRACT_ID=[CONTRACT_ID]" > .env.production
npm run build
```

[Arweave]: https://www.arweave.org/
[Arweave wallet]: https://faucet.arweave.net/
[Rhea Myers]: https://rhea.art/
[source code]: https://github.com/christopheradams/is-art-weave
