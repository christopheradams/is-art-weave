/* global describe, it */

const assert = require('assert')
const SmartweaveTester = require('smartweave-testing').default
const { handle } = require('../contracts/is-art')

const caller = 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y' // testWeave.rootJWK

const state = { isArt: false }
const toggle = { function: 'toggle' }

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
