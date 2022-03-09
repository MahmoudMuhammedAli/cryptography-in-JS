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

  for (let i = 1; i < 26; i++) {
    for (let j = 1; j < 26; j++) {
      res.push(
        "a:" + i + "  b:" + j + "  " + affine.affineDecrypt(cipherText, i, j)
      );
    }
  }
  console.table(res);
  return res;
}
console.time(" time taken to get all possible scenarios");
fs.writeFileSync("outputAttack.txt", attack(cipherText).join("\n"));
console.timeEnd(" time taken to get all possible scenarios");
exec("start outputAttack.txt");
