/* global FileReader */

import Arweave from 'arweave'
import SmartWeave from 'smartweave'

// State

const App = {
  arweave: null,
  contractId: null,
  input: {
    function: 'toggle'
  },
  wallet: null
}

// Utils

function log (message, data) {
  if (import.meta.env.MODE === 'development') {
    console.log(`[Is Art] ${message}:`, data)
  }
}

function listen (id, type, listener) {
  document.getElementById(id).addEventListener(type, listener)
}

// Network

async function readContract () {
  const contractState = await SmartWeave.readContract(
    App.arweave,
    App.contractId
  )

  log('Contract State', contractState)

  return contractState
}

async function writeContract () {
  const interactWrite = await SmartWeave.interactWrite(
    App.arweave,
    App.wallet,
    App.contractId,
    App.input
  )

  return interactWrite
}

// Rendering

function renderStatus (contractState) {
  const status = document.getElementById('is-art-status')

  if (contractState.isArt) {
    status.innerText = 'is'
  } else {
    status.innerText = 'is not'
  }
}

function renderTransaction (txId) {
  document.getElementById('is-art-tx').innerText = txId
}

function renderError (message) {
  document.getElementById('is-art-error').innerText = `Error: ${message}`
}

async function readStatus () {
  const contractState = await readContract()
  renderStatus(contractState)
}

// Listeners

async function handleSubmit (event) {
  event.preventDefault()

  const submit = document.getElementById('is-art-submit')

  submit.disabled = true

  if (window.confirm('Do you approve the transaction to be submitted?')) {
    renderTransaction('None')
    const txId = await writeContract()
    log('Transaction ID', txId)
    renderTransaction(txId)
  }

  submit.disabled = false
}

function handleFiles () {
  const filereader = new FileReader()

  const inputFile = this.files[0]

  filereader.addEventListener('load', (event) => {
    try {
      App.wallet = JSON.parse(event.target.result)
      App.arweave.wallets.jwkToAddress(App.wallet).then((address) => {
        log('Wallet', address)
      })

      log('Key file', inputFile.name)
    } catch (e) {
      log('Invalid key file', e)
      renderError('Invalid key file')
    }
  })

  filereader.readAsText(inputFile)
}

// Main

async function main () {
  listen('is-art-keyfile', 'change', handleFiles)
  listen('is-art-form', 'submit', handleSubmit)

  App.arweave = Arweave.init()
  App.arweave.network.getInfo().then((info) => {
    log('Artweave network', info.network)
  })

  App.contractId = import.meta.env.IS_ART_CONTRACT_ID
  log('Contract ID', App.contractId)

  await readStatus()
  setInterval(readStatus, 60 * 1000)
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await main()
  } catch (e) {
    renderError(e.message)
  }
})
