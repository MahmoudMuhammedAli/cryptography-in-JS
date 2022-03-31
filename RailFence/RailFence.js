/* Hey Dr. Abd El-Ghany, and Dr. Mahmoud

This is my attempt to make my code cleaner and have it easily readable. 
It would be great of you to give me a rating out of 5 and places I can Improve upon. 
I will try to make use of Helper functions and correct naming of my variables. 

Thank you in advance.

*/
const fs = require("fs");
const exec = require("child_process").exec;

// HELPER FUNCTIONS
const clean = (text) => {
  // replace anything not from a=>z  with an empty string
  return text.toLowerCase().replace(/[^ a-z]/g, "");
};
const isEmpty = (text) => {
  return text.length < 1;
};
const toInt = (text) => {
  return parseInt(text);
};
const isKeyTooLarger = (plainText, key) => {
  return key > Math.floor(2 * (plainText.length - 1));
};
// MAIN  FUNCTIONS
function encrypt(plainText, key) {
  plainText = clean(plainText);
  key = toInt(key);
  let cipherText = "";
  if (isEmpty(plainText)) {
    console.error("plainText CAN'T be empty");
    return "";
  }
  if (isKeyTooLarger(plainText, key)) {
    console.error("Key is too large");
    return;
  }

  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < plainText.length; ) {
      cipherText += plainText.charAt(i);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < plainText.length; i += 2 * (key - 1))
    cipherText += plainText.charAt(i);
  return cipherText;
}

function decrypt(cipherText, key) {
  cipherText = clean(cipherText);
  key = toInt(key);
  if (isEmpty(cipherText)) {
    console.error("cipherText CAN'T be empty");
    return;
  }
  if (isKeyTooLarger(cipherText, key)) {
    console.error("Key is too large");
    return;
  }
  let plainText = new Array(cipherText.length);
  k = 0;
  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < cipherText.length; ) {
      plainText[i] = cipherText.charAt(k++);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < cipherText.length; i += 2 * (key - 1))
    plainText[i] = cipherText.charAt(k++);
  return plainText.join("");
}

// DRIVER FUNCTION -IIFE
(() => {
  const plainText = fs.readFileSync("plainText.txt").toString().toLowerCase();
  const key = fs.readFileSync("key.txt").toString().toLowerCase();
  const cipherText = fs.readFileSync("cipherText.txt").toString().toLowerCase();

  const encrypted = encrypt(plainText, key);
  const decrypted = decrypt(encrypted, key);

  fs.writeFileSync(
    "output.txt",
    `
     plain text:${plainText}\n
     encrypted: ${encrypted}\n
     cipher text: ${cipherText}\n
     decrypted: ${decrypted}

    `
  );
  console.log(`
  plain text:${plainText}\n
  encrypted: ${encrypted}\n
  cipher text: ${cipherText}\n
  decrypted: ${decrypted}
 `);
  // open the file in the default txt viewer  (notepad)
  exec("start output.txt");
})();
