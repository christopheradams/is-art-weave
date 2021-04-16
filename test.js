const SmartweaveTester = require('smartweave-testing').default;
const {handle} = require('./is-art');

const caller = "PG1L9xap05bkDSgKSscFRNz-sU4IR9rI9x7tKBNnUVo";

const initialState = {
  isArt: false
}

const input = {
  function: 'toggle'
};

async function toggle() {
  const smartweave = new SmartweaveTester(handle, initialState, caller);

  return await smartweave.execute(input);
}

async function main() {
  const result1 = await toggle();
  console.log(result1, result1.isArt == true);

  const result2 = await toggle();
  console.log(result2, result1.isArt == false);

  const result3 = await toggle();
  console.log(result3, result1.isArt == true);
}

main();
