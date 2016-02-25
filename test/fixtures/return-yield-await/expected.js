async function* fn(promise) {
  return yield await promise;
}
