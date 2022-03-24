const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\n");
const plainText = input[0];
const cipherText = input[1];

const attack = (cipher, plain) => {
  let n = plain.length;
  let s = "";

  for (let i = 0; i < n; i++) {
    let c = cipher.charCodeAt(i) - 97 - (plain.charCodeAt(i) - 97);

    if (c < 0) {
      c += 26;
    }

    let ch = String.fromCharCode(97 + c);

    if (s.length > 3 && ch === s.charAt(0)) break;

    s += ch;
  }
  return s;
};

fs.writeFileSync("outputAttack.txt", `KEY: ${attack(cipherText, plainText)}`);
var exec = require("child_process").exec;
exec("start outputAttack.txt");
