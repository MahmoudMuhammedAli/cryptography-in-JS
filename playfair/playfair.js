const fs = require("fs");

const plainText = fs.readFileSync("input.txt").toString();
const key = fs.readFileSync("key.txt").toString();

let matrix = [];
function setKey(key) {
  if (!key) console.error("error: no key provided");
  const alphabet = ["abcdefghiklmnopqrstuvwxyz"];
  const sanitizedKey = key.toLowerCase().replace("j", "i").replace(" ", "");
  const keyMatrix = [...new Set(`${sanitizedKey}${alphabet}`)];
  matrix = [];
  for (let i = 0; i < keyMatrix.length; i += 5) {
    matrix.push(keyMatrix.slice(i, i + 5));
  }
}

function splitIntoCouples(input, decrypt) {
  // split into couples, fixing double-letters (hello => he lx lo) and padding
  const text = input
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/j/g, "i")
    .split("")
    .filter((x) => x !== " ");
  const couples = [];
  for (let i = 0; i < text.length; i += 2) {
    const currentCouple = text.slice(i, i + 2);
    if (!decrypt && currentCouple.length !== 2) {
      currentCouple.push("x");
      couples.push(currentCouple);
    } else if (!decrypt && currentCouple[0] === currentCouple[1]) {
      text.splice(i + 1, 0, "x");
      couples.push(text.slice(i, i + 2));
    } else {
      couples.push(currentCouple);
    }
  }

  // find row and column for each letter in couple
  const coordinates = [];
  couples.forEach((couple) => {
    coordinates.push(
      couple.map((letter) => {
        let col;
        const row = matrix.findIndex((row) => {
          const rowIdx = row.findIndex((x) => x === letter);
          if (rowIdx >= 0) {
            col = rowIdx;
            return true;
          }
          return false;
        });
        return [row, col];
      })
    );
  });

  return coordinates;
}
function process(input, decrypt) {
  if (!matrix) return "First set the key!";
  if (input && decrypt && input.length % 2 !== 0)
    return "error: invalid cipherText.  cipherTexts must be an even number";
  const coordinates = splitIntoCouples(input, decrypt);

  // set modifiers to respond appropriately based on decrypt switch
  const modifier = decrypt ? -1 : 1;
  const wall = decrypt ? 0 : 4;
  const phase = decrypt ? 4 : -4;

  const processedLocs = [];
  coordinates.forEach((loc) => {
    // loc: [ [ firstLetterR, firstLetterC ], [ secondLetterR, secondLetterC ] ]
    // modified: [ [ newFirstLetterR, newFirstLetterC ], [ newSecondLetterR, newSecondLetter R ] ]

    let modifiedLoc = [];

    // handle letters on the same row
    if (loc[0][0] === loc[1][0]) {
      // increment/decrement the column
      modifiedLoc[0] =
        loc[0][1] === wall
          ? [loc[0][0], wall + phase]
          : [loc[0][0], loc[0][1] + modifier];
      modifiedLoc[1] =
        loc[1][1] === wall
          ? [loc[1][0], wall + phase]
          : [loc[1][0], loc[1][1] + modifier];

      console.table(modifiedLoc);
      return processedLocs.push(modifiedLoc);
    }

    // handle letters in the same column
    if (loc[0][1] === loc[1][1]) {
      // increment/decrement the row
      modifiedLoc[0] =
        loc[0][0] === wall
          ? [wall + phase, loc[0][1]]
          : [loc[0][0] + modifier, loc[0][1]];
      modifiedLoc[1] =
        loc[1][0] === wall
          ? [wall + phase, loc[1][1]]
          : [loc[1][0] + modifier, loc[1][1]];
      return processedLocs.push(modifiedLoc);
    }

    // handle different rows, different columns
    modifiedLoc[0] = [loc[0][0], loc[1][1]];
    modifiedLoc[1] = [loc[1][0], loc[0][1]];
    processedLocs.push(modifiedLoc);
  });

  // translate coordinates into ciphertext
  const processedText = processedLocs
    .map((loc) =>
      [matrix[loc[0][0]][loc[0][1]], matrix[loc[1][0]][loc[1][1]]].join("")
    )
    .join("");

  return processedText.toLowerCase();
}
//encrypted cipher
function encrypt(input) {
  return process(input, false);
}
//decrypted cipher
function decrypt(input) {
  return process(input, true);
}

//TESTS and file stuff
setKey(key);
console.log("Example on 2 letters on the same row");
console.log(encrypt("abd"));

fs.writeFileSync("output.txt", "");
fs.appendFileSync("output.txt", `plainText:${plainText}\n`);
fs.appendFileSync("output.txt", `encrypted Result:${encrypt(plainText)}\n`);
fs.appendFileSync(
  "output.txt",
  `decrypted Result:${decrypt(encrypt(plainText))}\n`
);

var exec = require("child_process").exec;
exec("start output.txt");
