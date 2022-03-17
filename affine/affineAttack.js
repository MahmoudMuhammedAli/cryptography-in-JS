const fs = require("fs");
const cipherText = fs
  .readFileSync("inputAttack.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  })
  .toString();
const { exec } = require("child_process");
const affine = require("./affineCaesar");
function attack(cipherText) {
  let res = [];
  const coprimes = getCoprimes();
  for (let i = 1; coprimes[i]; i++) {
    for (let j = 1; j <= 26; j++) {
      res.push(
        "a:" + i + "  b:" + j + "  " + affine.affineDecrypt(cipherText, i, j)
      );
    }
  }
  console.table(res);
  return res;
}
//calculate the list of coprimes till 26
function getCoprimes() {
  let coprimes = [];
  for (let i = 1; i < 26; i++) {
    if (isCoprime(i)) {
      coprimes.push(i);
    }
  }
  return coprimes;
}
//isCoprime
function isCoprime(a) {
  for (let i = 2; i < a; i++) {
    if (a % i == 0) {
      return false;
    }
  }
  return true;
}

console.time(" time taken to get all possible scenarios");
fs.writeFileSync("outputAttack.txt", attack(cipherText).join("\n"));
console.timeEnd(" time taken to get all possible scenarios");
exec("start outputAttack.txt");
