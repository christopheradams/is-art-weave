/* global describe, it */

const assert = require('assert')
const SmartweaveTester = require('smartweave-testing').default
const { handle } = require('../contracts/is-art')

const caller = 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y' // testWeave.rootJWK

const isArt = { isArt: true }
const isNotArt = { isArt: false }
const state = isNotArt

const toggle = { function: 'toggle' }
const statement = { function: 'statement' }

describe('is-art', () => {
  describe('toggle', () => {
    it('toggles art and not art', async () => {
      const smartweave = new SmartweaveTester(handle, state, caller)

      const art = await smartweave.execute(toggle)
      assert.equal(art.isArt, true)

      const notart = await smartweave.execute(toggle)
      assert.equal(notart.isArt, false)
    })
  })

  describe('statement', async () => {
    it('makes statements about art and not art', async () => {
      const art = handle(isArt, { caller, input: statement })
      assert.equal(art.result, 'This contract is art')

      const notart = handle(isNotArt, { caller, input: statement })
      assert.equal(notart.result, 'This contract is not art')
    })
  })

  describe('invalid input', () => {
    it('throws an error', async () => {
      const smartweave = new SmartweaveTester(handle, state, caller)

      await assert.rejects(
        async () => {
          await smartweave.execute({})
        },
        {
          name: 'Error',
          message: 'Invalid input'
        }
      )
    })
  })
})
