/* global ContractError */

export function handle (state, action) {
  if (action.input.function === 'toggle') {
    state.isArt = !state.isArt

    return { state }
  }

  if (action.input.function === 'statement') {
    let statement = 'is not'

    if (state.isArt) {
      statement = 'is'
    }

    return { result: `This contract ${statement} art` }
  }

  throw new ContractError('Invalid input')
}
