export function handle (state, action) {
  if (action.input.function === 'toggle') {
    state.isArt = !state.isArt
  }

  return { state }
}
