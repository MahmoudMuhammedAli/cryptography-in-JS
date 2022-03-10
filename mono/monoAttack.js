// key-plaintext attack on mono alphabetic cipher
const fs = require("fs");

const input = fs.readFileSync("attackInput.txt").toString();
const lines = input.split(";");
const plainTextToLearn = lines[0];
const cipheredTextToLearn = lines[1];
const cipheredText = lines[2];

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const key = [];
key.length = 26;

const attack = (plainTextToLearn, cipheredTextToLearn, cipheredText) => {
  let result = "";
  for (let i = 0; i < plainTextToLearn.length; i++) {
    const letter = plainTextToLearn[i].toLowerCase();
    const opposingLetter = cipheredTextToLearn[i].toLowerCase();
    const index = alphabet.indexOf(letter);
    const opposingIndex = alphabet.indexOf(opposingLetter);
    key[index] = opposingLetter;
  }

  // decrypt the ciphered text
  for (let i = 0; i < cipheredText.length; i++) {
    if (cipheredText[i] === " ") {
      result += " ";
      continue;
    }
    let index = key.indexOf(cipheredText[i].toLowerCase());
    //handle uppercase characters
    if (
      cipheredText[i].charCodeAt(0) >= 65 &&
      cipheredText[i].charCodeAt(0) <= 90
    ) {
      result += alphabet.charAt(index).toUpperCase();
    } else {
      result += alphabet.charAt(index);
    }
  }

  //replace the undefined chars with "?"
  const ReplacedKey = key.map((item) => {
    if (!item) item = "?";
    return item;
  });
  //console.log(key.join(", "));
  console.log(result);
  fs.appendFileSync("attackOutput.txt", `key:${key}\n`);
  fs.appendFileSync("attackOutput.txt", `decrypted:${result}\n`);
  return result;
};

fs.writeFileSync("attackOutput.txt", "");
attack(plainTextToLearn, cipheredTextToLearn, cipheredText);

function getCommandLine() {
  switch (process.platform) {
    case "darwin":
      return "open";
    case "win32":
      return "start";
    case "win64":
      return "start";
    default:
      return "xdg-open";
  }
}
var exec = require("child_process").exec;

exec(getCommandLine() + " " + "attackOutput.txt");
