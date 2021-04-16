"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handle = handle;

function handle(state, action) {
  if (action.input.function === 'toggle') {
    state.isArt = !state.isArt;
  }

  return {
    state
  };
}
