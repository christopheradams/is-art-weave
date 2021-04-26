/* global FileReader */

import Arweave from 'arweave'
import SmartWeave from 'smartweave'

// Env

const CONTRACT_ID = import.meta.env.SNOWPACK_PUBLIC_IS_ART_CONTRACT_ID

// Store

const App = (() => {
  let _arweave = null
  let _contract = null
  let _wallet = null

  const _input = {
    function: 'toggle'
  }

  const Store = {
    init: (contract) => {
      _arweave = Arweave.init()
      _contract = contract
    },
    arweave: () => {
      return _arweave
    },
    contract: () => {
      return _contract
    },
    input: () => {
      return _input
    },
    wallet: () => {
      return _wallet
    },
    setWallet: (wallet) => {
      _wallet = wallet
    },
    clearWallet: () => {
      _wallet = null
      return true
    }
  }

  return Object.freeze(Store)
})()

// Utils

function error (message, data) {
  renderError(message)
  console.error(message, data)
}

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
    App.arweave(),
    App.contract()
  )

  log('Contract State', contractState)

  return contractState
}

async function writeContract () {
  const interactWrite = await SmartWeave.interactWrite(
    App.arweave(),
    App.wallet(),
    App.contract(),
    App.input()
  )

  return interactWrite
}

async function fetchTransaction () {
  const query = `{
  transactions(first: 1, tags: [
      {name: "App-Name", values: ["SmartWeaveAction"]},
      {name: "Contract", values: ["${App.contract()}"]}
    ]) {
      edges {
        node {
          id,
          block {
            id
          }
        }
      }
    }
  }
  `

  try {
    const results = await App.arweave().api.post('/graphql', { query })
    if (results.status === 200) {
      const txId = results.data.data.transactions.edges[0].node.id

      const block = results.data.data.transactions.edges[0].node.block

      let confirmed = false

      if (block) {
        confirmed = true
        fetchStatus()
      }

      log('Latest Transaction ID', txId)
      renderTransaction(txId, confirmed)
    }
  } catch (e) {
    error('Cannot find contract transaction', e)
    console.error(e)
  }
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

function renderTransaction (txId, confirmed = false) {
  document.getElementById('is-art-tx').innerText = txId
  const confirmedElem = document.getElementById('is-art-tx-confirmation')

  if (confirmed) {
    confirmedElem.innerText = '(confirmed)'
  } else {
    confirmedElem.innerText = '(unconfirmed)'
  }
}

function renderError (message) {
  document.getElementById('is-art-error').innerText = `Error: ${message}`
}

function clearError () {
  document.getElementById('is-art-error').innerText = ''
}

async function fetchStatus () {
  clearError()
  try {
    const contractState = await readContract()
    renderStatus(contractState)
  } catch (e) {
    renderError('Could not read contract')
    console.error(e)
  }
}

// Listeners

async function handleSubmit (event) {
  clearError()
  renderTransaction('None')

  event.preventDefault()

  const submit = document.getElementById('is-art-submit')

  submit.disabled = true

  if (App.wallet()) {
    if (window.confirm('Do you you want to submit the transaction?')) {
      try {
        const txId = await writeContract()
        log('Transaction ID', txId)
        renderTransaction(txId)
      } catch (e) {
        error('Could not write to the contract', e)
      }
    }
  } else {
    document.getElementById('is-art-keyfile').value = ''
    renderError('Missing or invalid keyfile')
  }

  submit.disabled = false
}

function handleFiles () {
  clearError()
  App.clearWallet()

  const filereader = new FileReader()

  const inputFile = this.files[0]

  filereader.addEventListener('load', (event) => {
    try {
      const wallet = JSON.parse(event.target.result)
      App.setWallet(wallet)
      App.arweave().wallets.jwkToAddress(App.wallet()).then((address) => {
        log('Wallet', address)
      })

      log('Key file', inputFile.name)
    } catch (e) {
      error('Invalid key file', e)
    }
  })

  filereader.readAsText(inputFile)
}

// Main

async function main () {
  listen('is-art-keyfile', 'change', handleFiles)
  listen('is-art-form', 'submit', handleSubmit)

  App.init(CONTRACT_ID)
  log('Contract ID', App.contract())

  App.arweave().network.getInfo().then((info) => {
    log('Artweave network', info.network)
  })

  fetchTransaction()
  setInterval(fetchTransaction, 60 * 1000)
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await main()
  } catch (e) {
    error(e.message, e)
  }
})
