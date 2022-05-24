const __CHARACTERS_MAP__ ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateCode = (length) => {
  let result = '';
  const charactersLength = __CHARACTERS_MAP__.length;
  for ( let i = 0; i < length; i++ ) {
    result += __CHARACTERS_MAP__.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}