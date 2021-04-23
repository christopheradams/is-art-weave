/* global FileReader */

import Arweave from 'arweave'
import SmartWeave from 'smartweave'

const App = {
  arweave: null,
  contractId: null,
  input: {
    function: 'toggle'
  },
  tx: null,
  wallet: null
}

const Doc = {
  error: null,
  form: null,
  keyfile: null,
  status: null,
  submit: null
}

function error(message) {
  Doc.error.innerText = `Error: ${message}`
}

function log (message, data) {
  if (import.meta.env.MODE === 'development') {
    console.log(`[Is Art] ${message}:`, data)
  }
}

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

function renderStatus (contractState) {
  if (contractState.isArt) {
    Doc.status.innerText = 'is'
  } else {
    Doc.status.innerText = 'is not'
  }
}

function renderTransaction (txId) {
  Doc.tx.innerText = txId
}

async function readStatus () {
  const contractState = await readContract()
  renderStatus(contractState)
}

async function handleSubmit (event) {
  event.preventDefault()
  Doc.submit.disabled = true

  if (window.confirm('Do you approve the transaction to be submitted?')) {
    renderTransaction('None')
    const txId = await writeContract()
    log('Transaction ID', txId)
    renderTransaction(txId)
  }

  Doc.submit.disabled = false
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
      error('Invalid key file')
    }
  })

  filereader.readAsText(inputFile)
}

async function initApp () {
  App.arweave = Arweave.init()
  App.arweave.network.getInfo().then((info) => {
    log('Artweave network', info.network)
  })

  App.contractId = import.meta.env.IS_ART_CONTRACT_ID
  log('Contract ID', App.contractId)

  await readStatus()
  setInterval(readStatus, 60 * 1000)
}

function initDocument () {
  Doc.status = document.getElementById('is-art-status')

  Doc.keyfile = document.getElementById('is-art-keyfile')
  Doc.keyfile.addEventListener('change', handleFiles, false)

  Doc.form = document.getElementById('is-art-form')
  Doc.form.addEventListener('submit', handleSubmit, false)

  Doc.error = document.getElementById('is-art-error')
  Doc.submit = document.getElementById('is-art-submit')
  Doc.tx = document.getElementById('is-art-tx')
}

async function main () {
  initDocument()
  await initApp()
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await main()
  } catch (e) {
    error(e.message)
  }
})
