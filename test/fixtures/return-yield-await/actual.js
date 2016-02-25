async function* fn(promise) {
  yield await promise
}
