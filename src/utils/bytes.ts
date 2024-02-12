export const fromHexString = (hexString: string) => {
  const matches = hexString.match(/.{1,2}/g);
  if (matches) {
    return Uint8Array.from(matches.map((byte) => parseInt(byte, 16)));
  }
  return new Uint8Array();
};

export const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
