const obj = {
  a: function () {
    return 1;
  },
  b: () => {
    return 2;
  },
  c: () => 3,

  d() {
    return 4;
  },

  ["a" + "b"]: () => {
    return 5;
  }
};
