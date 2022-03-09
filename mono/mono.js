const fs = require("fs");

//mono alphabetic cipher encryption
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetArray = alphabet.split("");
const key = fs.readFileSync("key.txt").toString();
const plainText = fs.readFileSync("input.txt").toString();
let cipherText = "";

// alphabet = abcdefghijklmnopqrstuvwxyz
// key =      zyxwvutsrqponmlkjihgfedcba
// encrypt(test) => return exye
// decrypt(exye) => return test

const process = (input, key, decrypt) => {
  let result = "";
  cleanKey = cleanUpKey(key);
  for (let char = 0; char < input.length; char++) {
    const element = input[char];
    if (!decrypt) {
      const index = alphabetArray.indexOf(element);
      if (index !== -1) {
        result += cleanKey[index];
      } else {
        result += element;
      }
    } else {
      const index = cleanKey.indexOf(element);
      if (index !== -1) {
        result += alphabetArray[index];
      } else {
        result += element;
      }
    }
  }
  return result;
};
const cleanUpKey = (key) => {
  if (key && key.length === 26) {
    return key.toLowerCase().replace(" ", "");
  } else {
    //generate a key with the rest of the alphabet
    return [...new Set(`${key}${alphabet}`)];
  }
};

//encrypt
const encrypt = (input, key) => {
  return process(input, key, false);
};
//decrypt
const decrypt = (input, key) => {
  return process(input, key, true);
};

cipherText = encrypt(plainText, key);
console.log("ciphered:", encrypt(plainText, key));
console.log("decrypted:", decrypt(cipherText, key));

fs.writeFileSync("output.txt", "");
fs.appendFileSync("output.txt", `plainText:${plainText}\n`);
fs.appendFileSync("output.txt", `encrypted Result:${encrypt(plainText)}\n`);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${decrypt(encrypt(plainText))}\n`
);
