const SmartweaveTester = require('smartweave-testing').default;
const {handle} = require('./is-art');

const caller = "PG1L9xap05bkDSgKSscFRNz-sU4IR9rI9x7tKBNnUVo";

const initialState = {
  isArt: false
}

const input = {
  function: 'toggle'
};

async function main() {
  const smartweave = new SmartweaveTester(handle, initialState, caller);

  const result = await smartweave.execute(input);

  console.log(result);
}

main();
