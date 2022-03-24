const fs = require("fs");

function isUpperCase(letter) {
  var l = letter.charCodeAt();
  if (l >= 65 && l <= 90) {
    return true;
  } else {
    return false;
  }
}

function isLowerCase(letter) {
  var l = letter.charCodeAt();
  if (l >= 97 && l <= 122) {
    return true;
  } else {
    return false;
  }
}

const encrypt = (plainText, key) => {
  let cipherText = "";
  for (let i = 0, j = 0; i < plainText.length; i++) {
    let currentLetter = plainText[i];

    if (isUpperCase(currentLetter)) {
      let upperLetter =
        (currentLetter.charCodeAt() -
          65 +
          (key[j % key.length].toUpperCase().charCodeAt() - 65)) %
        26;
      cipherText += String.fromCharCode(upperLetter + 65);
      j++;
    } else if (isLowerCase(currentLetter)) {
      let lowerLetter =
        (currentLetter.charCodeAt() -
          97 +
          (key[j % key.length].toLowerCase().charCodeAt() - 97)) %
        26;
      cipherText += String.fromCharCode(lowerLetter + 97);
      j++;
    } else {
      cipherText += currentLetter;
    }
  }
  return cipherText;
};

const decrypt = (cipherText, key) => {
  let keyLength = key.length;
  let plainText = "";
  for (let i = 0; i < cipherText.length; i++) {
    let c =
      cipherText.charCodeAt(i) - 97 - (key.charCodeAt(i % keyLength) - 97);
    console.log("🚀 ~ file: vigenere.js ~ line 54 ~ decrypt ~ c", c);

    if (c < 0) {
      c += 26;
    }

    plainText += String.fromCharCode(97 + (c % 26));
  }
  console.log(
    "🚀 ~ file: vigenere.js ~ line 66 ~ decrypt ~ plainText",
    plainText
  );

  return plainText;
};
const plainText = fs.readFileSync("input.txt").toString();
const key = fs.readFileSync("key.txt").toString();
fs.writeFileSync("output.txt", "");
fs.appendFileSync("output.txt", `plainText:${plainText}\n`);
fs.appendFileSync(
  "output.txt",
  `encrypted Result:${encrypt(plainText, key)}\n`
);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${decrypt(encrypt(plainText, key), key)}\n`
);

var exec = require("child_process").exec;
exec("start output.txt");
