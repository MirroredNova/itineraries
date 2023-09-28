export const startingCode = 'AAAAAA';

export const incrementCode = (code: string): string => {
  const codeArray = code.split('');
  const lastChar = codeArray[codeArray.length - 1];
  const lastCharIndex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(lastChar);
  if (lastCharIndex === 25) {
    codeArray[codeArray.length - 1] = 'A';
    return incrementCode(codeArray.join(''));
  }
  codeArray[codeArray.length - 1] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[
    lastCharIndex + 1
  ];
  return codeArray.join('');
};
