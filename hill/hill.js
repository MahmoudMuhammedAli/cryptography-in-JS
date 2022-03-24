const fs = require("fs");
function encrypt(input, keys) {
  let plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
  let k = keys.toLowerCase().replace(/[^0-9 ]/g, "");
  let output = "";
  keys = k.split(" ");
  if (plaintext.length < 1) {
    console.log("please enter some plaintext");
    return;
  }
  if (plaintext.length % 2 == 1) {
    plaintext = plaintext + "x";
  }
  if (keys.length != 4) {
    console.log("please enter the key as 4 integers");
    return;
  }
  for (i = 0; i < 4; i++) keys[i] = keys[i] % 26;

  for (i = 0; i < plaintext.length; i += 2) {
    output += String.fromCharCode(
      ((keys[0] * (plaintext.charCodeAt(i) - 96) +
        keys[1] * (plaintext.charCodeAt(i + 1) - 96)) %
        26) +
        96
    );
    output += String.fromCharCode(
      ((keys[2] * (plaintext.charCodeAt(i) - 96) +
        keys[3] * (plaintext.charCodeAt(i + 1) - 96)) %
        26) +
        96
    );
  }
  return output;
}

function decrypt(input, keys) {
  let ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
  keys = keys.split(" ");
  if (ciphertext.length < 1) {
    console.log("please enter some cipherText");
    return;
  }
  if (ciphertext.length % 2 == 1) {
    console.log("ciphertext length should be even");
    return;
  }

  if (keys.length != 4) {
    console.log("please enter the key as 4 integers");
    return;
  }
  for (i = 0; i < 4; i++) keys[i] = keys[i] % 26;

  let det = keys[0] * keys[3] - keys[1] * keys[2];
  det = ((det % 26) + 26) % 26;
  let di = 0;
  for (let i = 0; i < 26; i++) {
    if ((det * i) % 26 == 1) di = i;
  }
  if (di == 0) {
    console.log("inverse of determinant is 0, cannot decrypt");
    return;
  }
  let ikeys = new Array(4);
  ikeys[0] = (di * keys[3]) % 26;
  ikeys[1] = (-1 * di * keys[1]) % 26;
  ikeys[2] = (-1 * di * keys[2]) % 26;
  ikeys[3] = di * keys[0];
  for (i = 0; i < 4; i++) {
    if (ikeys[i] < 0) ikeys[i] += 26;
  }
  let plaintext = "";
  for (i = 0; i < ciphertext.length; i += 2) {
    plaintext += String.fromCharCode(
      ((ikeys[0] * (ciphertext.charCodeAt(i) - 96) +
        ikeys[1] * (ciphertext.charCodeAt(i + 1) - 96)) %
        26) +
        96
    );
    plaintext += String.fromCharCode(
      ((ikeys[2] * (ciphertext.charCodeAt(i) - 96) +
        ikeys[3] * (ciphertext.charCodeAt(i + 1) - 96)) %
        26) +
        96
    );
  }
  console.log(plaintext);
  console.log(keys);
  return plaintext;
}
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
