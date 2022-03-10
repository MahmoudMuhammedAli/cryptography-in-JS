const fs = require("fs");
const plainText = fs.readFileSync("input.txt").toString();
const keyArr = fs.readFileSync("key.txt").toString().split(";");
const a = parseInt(keyArr[0]);
const b = parseInt(keyArr[1]);

// E(x) = a * x + b
function affineEncrypt(str, a, b) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //handle uppercase characters
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(65 + (((c - 65) * a + b) % 26));
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode((((c - 97) * a + b) % 26) + 97);
    } else {
      //handle special characters
      result += str.charAt(i);
    }
  }
  return result;
}
// modulo inverse
function modInverse(a, m) {
  for (var x = 1; x < m; x++) {
    if ((a * x) % m == 1) {
      return x;
    }
  }
  return 1;
}

// affineDecrypt
// D(X) = (a^-1 * (X - b)) % 26
function affineDecrypt(str, a, b) {
  var result = "";
  var aInv = modInverse(a, 26);
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //handle uppercase characters
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((aInv * (c - 65 - b + 26)) % 26) + 65);
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((aInv * (c - 97 - b + 26)) % 26) + 97);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

fs.writeFileSync("output.txt", "");
fs.appendFileSync("output.txt", `plainText:${plainText}\n`);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${affineEncrypt(plainText, a, b)}\n`
);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${affineDecrypt(affineEncrypt(plainText, a, b), a, b)}\n`
);

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

exec(getCommandLine() + " " + "output.txt");

module.exports = { affineDecrypt, affineEncrypt };
