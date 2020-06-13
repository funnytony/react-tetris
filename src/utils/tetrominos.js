export const TETROMINUS = {
  0: { shape: [[0]], collor: "0, 0, 0" },
  I: {
    shape: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    collor: "0, 0, 0",
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    collor: "0, 0, 0",
  },
  S: {
    shape: [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
    collor: "0, 0, 0",
  },
  T: {
    shape: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 0, 1],
    ],
    collor: "0, 0, 0",
  },
  L: {
    shape: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    collor: "0, 0, 0",
  },
  Z: {
    shape: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    collor: "0, 0, 0",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    collor: "0, 0, 0",
  },
};

export const BLUE = "0, 0, 255";
export const PURPLE = "128, 0, 128";
export const READ = "255, 0, 0";
export const GREEN = "0, 128, 0";
export const YEllOW = "255, 255, 0";
export const AQUA = "0, 255, 255";
export const ORANGE = "255, 165, 0";
export const NAVY = "0, 0, 128";
export const WIGHT = "255, 255, 255";
export const BLACK = "0, 0, 0";

export const PALLET = [BLUE, PURPLE, READ, GREEN, YEllOW, AQUA, ORANGE, NAVY];

export const getRandomCollor = () => {
  const collor = Math.floor(Math.random() * PALLET.length);
  return PALLET[collor];
};

export const getRandomTetrominos = () => {
  const tatrominos = "IZSTLJO";
  const index = Math.floor(Math.random() * tatrominos.length);
  const shape = tatrominos[index];
  return TETROMINUS[shape];
};
