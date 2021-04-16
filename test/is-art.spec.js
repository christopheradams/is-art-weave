import assert from 'assert';

const SmartweaveTester = require('smartweave-testing').default;
const {handle} = require('../contracts/is-art');

const caller = "MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y"; // testWeave.rootJWK

const state = { isArt: false };
const input = { function: 'toggle' };

describe('is-art', function() {
  describe('toggle', function() {
    it('sets toggles art and not art', async function() {
      const smartweave = new SmartweaveTester(handle, state, caller);

      const art = await smartweave.execute(input);
      assert.equal(art.isArt, true)

      const notart = await smartweave.execute(input);
      assert.equal(notart.isArt, false)
    });
  });
});
