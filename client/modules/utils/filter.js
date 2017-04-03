const excludeLetterReg = /[^a-zA-Z]/g;
export function letterFilter(str) {
  console.log('letterFilter: ', typeof str.replace(excludeLetterReg, ''));
  return str.replace(excludeLetterReg, '');
}

export default { letter: letterFilter };
