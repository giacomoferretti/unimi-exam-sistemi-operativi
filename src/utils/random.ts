export const sfc32 = (a: number, b: number, c: number, d: number) => {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
};

export const randomRange = (
  min: number,
  max: number,
  randomFunction = Math.random,
  inclusive = true,
) => {
  return Math.floor(randomFunction() * (max - min + (inclusive ? 1 : 0))) + min;
};

export const randomChoice = <T>(
  choices: readonly T[],
  randomFunction = Math.random,
) => {
  return choices[Math.floor(randomFunction() * choices.length)]!;
};
