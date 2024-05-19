export const getFirstCharacters = (name: string): string => {
  if (name) {
    const words = name.split(' ');
    let result = '';
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 0) {
        result += words[i].charAt(0);
      }
    }
    return result.toUpperCase();
  }
  return '';
};
export const getLastName = (name: string) => {
  if (name) {
    const words = name.split(' ');
    return words[words.length - 1].charAt(0);
  }
};
