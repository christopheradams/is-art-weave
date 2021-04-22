const assert = require('assert');
const SmartweaveTester = require('smartweave-testing').default;
const {handle} = require('../contracts/is-art');

const caller = "MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y"; // testWeave.rootJWK

const state = { isArt: false };
const input = { function: 'toggle' };

describe('is-art', function() {
  describe('toggle', function() {
    it('toggles art and not art', async function() {
      const smartweave = new SmartweaveTester(handle, state, caller);

      const art = await smartweave.execute(input);
      assert.equal(art.isArt, true)

      const notart = await smartweave.execute(input);
      assert.equal(notart.isArt, false)
    });
  });

  describe('invalid input', function() {
    it('throws an error', async function() {
      const smartweave = new SmartweaveTester(handle, state, caller);

      await assert.rejects(
        async () => {
          await smartweave.execute({});
        },
        {
          name: 'Error',
          message: 'Invalid input'
        }
      );
    });
  });
});
