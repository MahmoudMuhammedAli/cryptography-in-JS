/* Hey Dr. Abd El-Ghany, and Dr. Mahmoud

This is  my attempt to make my code cleaner and have it easily readable. 
It would be great of you to give me a rating out of 5 and places I can Improve upon. 
I will try to make use of Helper functions and correct naming of my variables. 

Thank you in advance.

*/

const fs = require("fs");
const exec = require("child_process").exec;

// HELPER FUNCTIONS
const legend = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch, i) => {
  return { letter: ch, value: i };
});

const findKey = (key, param) => {
  return legend.find((la) => la[param] === key);
};

const search = (key) => {
  const found = findKey(key, "letter");
  if (!found) {
    return "";
  }
  return found.value;
};

const reverse = (key) => {
  const found = findKey(key, "value");
  if (!found) {
    return "";
  }
  return found.letter;
};

const mod = (n) => {
  const p = legend.length - 1;
  return n - p * Math.floor(n / p);
};
const clean = (text) => {
  // Handle white spaces and convert to upper text
  return text.replace(/\s/g, "").toUpperCase();
};

// MAIN  FUNCTIONS
function encrypt(message, key) {
  let encryptedMessage = "";
  message = clean(message);
  key = clean(key);
  for (let i = 0; i < message.length; i++) {
    const valueString = search(message[i]);
    const valueKey = search(key[i]);
    const intString =
      typeof valueString === "undefined" ? parseInt(message[i]) : valueString;
    const intKey =
      typeof valueKey === "undefined" ? parseInt(key[i]) : valueKey;
    if (isNaN(intString) || isNaN(intKey)) {
      encryptedMessage += message[i];
    } else {
      const reverseValue = mod(intString + intKey);
      const reverseLookup = reverse(reverseValue);
      if (reverseLookup == 0) {
        reverseLookup = "";
      }
      encryptedMessage += reverseLookup;
    }
  }
  return encryptedMessage;
}

function decrypt(message, key) {
  let encryptedMessage = "";
  message = clean(message);
  key = clean(key);
  for (let i = 0; i < message.length; i++) {
    const valueString = search(message[i]);
    const valueKey = search(key[i]);
    const intString =
      typeof valueString === "undefined" ? parseInt(message[i]) : valueString;
    const intKey =
      typeof valueKey === "undefined" ? parseInt(key[i]) : valueKey;
    if (isNaN(intString) || isNaN(intKey)) {
      encryptedMessage += message[i];
    } else {
      const reverseValue = mod(intString - intKey);
      let reverseLookup = reverse(reverseValue);
      if (reverseLookup == 0) {
        reverseLookup = "";
      }
      encryptedMessage += reverseLookup;
    }
  }
  return encryptedMessage;
}

// DRIVER FUNCTION - IIFE
(() => {
  const plainText = fs.readFileSync("plainText.txt").toString().toUpperCase();
  const key = fs.readFileSync("key.txt").toString().toUpperCase();

  const encrypted = encrypt(plainText, key);
  const decrypted = decrypt(encrypted, key);

  fs.writeFileSync(
    "output.txt",
    `
     plain text:${plainText}\n
     encrypted: ${encrypted}\n
     cipher text: ${encrypted}\n
     decrypted: ${decrypted}

    `
  );
  // open the file in the default txt viewer  (notepad)
  exec("start output.txt");
})();
