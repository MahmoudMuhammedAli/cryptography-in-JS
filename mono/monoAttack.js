// key-plaintext attack on mono alphabetic cipher
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const key = [];
key.length = 26;
const attack = (plainTextToLearn, cipheredTextToLearn, cipheredText) => {
  let result = "";
  for (let i = 0; i < plainTextToLearn.length; i++) {
    const letter = plainTextToLearn[i];
    const opposingLetter = cipheredTextToLearn[i];
    const index = alphabet.indexOf(letter);
    const opposingIndex = alphabet.indexOf(opposingLetter);
    key[index] = opposingLetter;
  }

  // decrypt the ciphered text
  for (let i = 0; i < cipheredText.length; i++) {
    let index = key.indexOf(cipheredText[i]);
    result += alphabet.charAt(index);
  }

  console.log(key.join(", "));
  console.log(result);
};

attack(
  "faculty of science cairo university",
  "koawtnb jk lafspas aofij wpfqsilfnb",
  "al fl kfps"
);
