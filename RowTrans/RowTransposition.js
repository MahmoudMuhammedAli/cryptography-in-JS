/* Hey Dr. Abd El-Ghany, and Dr. Mahmoud

This is  my attempt to make my code cleaner and have it easily readable. 
It would be great of you to give me a rating out of 5 and places I can Improve upon. 
I will try to make use of Helper functions and correct naming of my variables. 

Thank you in advance.

*/

const fs = require("fs");
const exec = require("child_process").exec;
const chars = "abcdefghijklmnopqrstuvwxyz";

// HELPER FUNCTIONS
const validate = (text, message) => {
  if (text.length < 1) {
    alert(message);
  }
};

const getById = (id) => {
  return document.getElementById(id);
};

const normalize = (value) => {
  return value.toLowerCase().replace(/[^a-z]/g, "");
};

function Encrypt(plaintext, key, pc) {
  const keyLength = key.length;
  if (pc == "") pc = "x";
  while (plaintext.length % keyLength != 0) {
    plaintext += pc.charAt(0);
  }
  let colLength = plaintext.length / keyLength;
  let ciphertext = "";
  k = 0;
  for (i = 0; i < keyLength; i++) {
    while (k < 26) {
      t = key.indexOf(chars.charAt(k));
      arrkw = key.split("");
      arrkw[t] = "_";
      key = arrkw.join("");
      if (t >= 0) break;
      else k++;
    }
    for (j = 0; j < colLength; j++) {
      ciphertext += plaintext.charAt(j * keyLength + t);
    }
  }
  return ciphertext;
}

function Decrypt(ciphertext, keyword) {
  let keyLength = keyword.length;
  if (keyLength <= 1) {
    alert("keyword should be at least 2 characters long");
    return;
  }
  if (ciphertext.length % keyLength != 0) {
    alert(
      "ciphertext has not been padded, the result may be incorrect (incorrect keyword?)."
    );
  }
  // first we put the text into columns based on keyword length
  let cols = new Array(keyLength);
  let colLength = ciphertext.length / keyLength;
  for (i = 0; i < keyLength; i++)
    cols[i] = ciphertext.substr(i * colLength, colLength);
  // then we rearrange the columns so that they are in their unscrambled state
  let newcols = new Array(keyLength);
  j = 0;
  i = 0;
  while (j < keyLength) {
    t = keyword.indexOf(chars.charAt(i));
    if (t >= 0) {
      newcols[t] = cols[j++];
      arrkw = keyword.split("");
      arrkw[t] = "_";
      keyword = arrkw.join("");
    } else i++;
  }
  // now read off the columns row-wise
  let plaintext = "";
  for (i = 0; i < colLength; i++) {
    for (j = 0; j < keyLength; j++) {
      plaintext += newcols[j].charAt(i);
    }
  }
  return plaintext;
}

// Main functions
function handleEncrypt() {
  let plaintext = normalize(getById("p").value);
  if (validate(plaintext, "Please enter some plaintext.")) return;
  let key = normalize(getById("key").value);
  let pc = normalize(getById("pc").value);
  getById("c").value = Encrypt(plaintext, key, pc);
}
function handleDecrypt() {
  let ciphertext = normalize(getById("c").value);
  if (validate(ciphertext, "Please enter some ciphertext (letters only)."))
    return;
  let key = normalize(getById("key").value);
  getById("p").value = Decrypt(ciphertext, key);
}

//! USE FOR TESTING WITH FILES. I recommend you run the html file in your browser for a simple GUI to test with.
// // DRIVER FUNCTION
// function main() {
//   const plainText = fs.readFileSync("plainText.txt").toString();
//   const key = fs.readFileSync("key.txt").toString();
//   const cipherText = fs.readFileSync("cipherText.txt").toString();

//   const encrypted = encrypt(plainText, key);
//   const decrypted = decrypt(cipherText, key);

//   fs.writeFileSync("output.txt", `${encrypted}\n${decrypted}`);
//   // open the file in the default txt viewer  (notepad)
//   exec("start output.txt");
// }

// main();
