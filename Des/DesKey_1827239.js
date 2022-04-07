const fs = require("fs");

const pc_1 = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];

const pc_2 = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];

const leftShift = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

let binaryNumber = "";
let LeftKey = "";
let RightKey = "";
let binaryAfterPC1 = "";
let temp = "";

// Helper Functions

function bin2hex(s) {
  let i,
    l,
    o = "",
    n;
  s += "";
  for (i = 0, l = s.length; i < l; i += 8) {
    n = parseInt(s.substring(i, i + 8), 2);
    o += String.fromCharCode(n);
  }
  return o;
}
// leftShift function
function leftShiftKey(numOfShifts) {
  leftKey = leftKey.substring(numOfShifts) + leftKey.substring(0, numOfShifts);
  rightKey =
    rightKey.substring(numOfShifts) + rightKey.substring(0, numOfShifts);
  let afterShifting = leftKey + rightKey;
  let result = "";
  for (let i = 0; i < pc_2.length; i++) {
    result += afterShifting.charAt(pc_2[i] - 1);
  }
  return result;
}

// DesKey function
function DesKey(keyFile) {
  let readKeyFile = fs.readFileSync(keyFile, "utf8");
  let keyString = readKeyFile.split("\n")[0];
  let hexadecimalNumber;
  for (let i = 0; i < keyString.length; i++) {
    hexadecimalNumber = parseInt(keyString.charAt(i), 16);
    temp = bin2hex(parseInt(keyString.charAt(i), 16).toString(2));
    while (temp.length() < 4) temp = "0" + temp;
    binaryNumber += temp;
  }
  for (let i = 0; i < pc_1.length; i++)
    binaryAfterPC1 += binaryNumber.charAt(pc_1[i] - 1);
  LeftKey = binaryAfterPC1.substring(0, binaryAfterPC1.length() / 2);
  RightKey = binaryAfterPC1.substring(binaryAfterPC1.length() / 2);
  let fileDir = process.cwd() + "/16keysFile.txt";
  let _16keysFile = fs.openSync(fileDir, "w");
  for (let i = 0; i < 16; i++) {
    fs.writeFileSync(
      _16keysFile,
      "KEY[" + (i + 1) + "]\n",
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
    fs.writeFileSync(
      _16keysFile,
      "  -->>  " + bin2hex(leftShiftMethod(leftShift[i])) + "\n",
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  }
  fs.closeSync(_16keysFile);
}

// Mock Driver Function
function main() {
  let fileDir = process.cwd() + "/keyFile.txt";
  let keyFile = fs.openSync(fileDir, "w");
  fs.writeFileSync(keyFile, "133457799bbcdff1", "utf8", function (err) {
    if (err) throw err;
  });
  fs.closeSync(keyFile);
  DesKey(fileDir);
}
