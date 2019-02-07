function fn() {
  const obj = {
    a: 1,
    b: 2
  };
  const {
    a,
    ...c
  } = obj;
  return c;
}
