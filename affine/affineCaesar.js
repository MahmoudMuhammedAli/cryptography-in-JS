const fs = require("fs");
const plainText = fs.readFileSync("input.txt").toString();

// E(x) = a * x + b
function affineEncrypt(str, a, b) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c >= 97 && c <= 122) {
      result += String.fromCharCode(97 + (((c - 97) * a + b) % 26));
    } else {
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
    if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((aInv * (c - 97 - b + 26)) % 26) + 97);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

console.log(affineEncrypt("you have to solve this question", 5, 7));
console.log(affineDecrypt("xzd qhib yz tzkib yqvt jdbtyvzu", 5, 7));

fs.writeFileSync("output.txt", "");
fs.appendFileSync("output.txt", `plainText:${plainText}\n`);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${affineEncrypt(plainText, 5, 7)}\n`
);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${affineDecrypt(affineEncrypt(plainText, 5, 7), 5, 7)}\n`
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
