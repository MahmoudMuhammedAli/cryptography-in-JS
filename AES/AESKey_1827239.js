const RC = [
  "01000000",
  "02000000",
  "04000000",
  "08000000",
  "10000000",
  "20000000",
  "40000000",
  "80000000",
  "1B000000",
  "36000000",
];
const SBox = [
  [
    "63",
    "7C",
    "77",
    "7B",
    "F2",
    "6B",
    "6F",
    "C5",
    "30",
    "01",
    "67",
    "2B",
    "FE",
    "D7",
    "AB",
    "76",
  ],
  [
    "CA",
    "82",
    "C9",
    "7D",
    "FA",
    "59",
    "47",
    "F0",
    "AD",
    "D4",
    "A2",
    "AF",
    "9C",
    "A4",
    "72",
    "C0",
  ],
  [
    "B7",
    "FD",
    "93",
    "26",
    "36",
    "3F",
    "F7",
    "CC",
    "34",
    "A5",
    "E5",
    "F1",
    "71",
    "D8",
    "31",
    "15",
  ],
  [
    "04",
    "C7",
    "23",
    "C3",
    "18",
    "96",
    "05",
    "9A",
    "07",
    "12",
    "80",
    "E2",
    "EB",
    "27",
    "B2",
    "75",
  ],
  [
    "09",
    "83",
    "2C",
    "1A",
    "1B",
    "6E",
    "5A",
    "A0",
    "52",
    "3B",
    "D6",
    "B3",
    "29",
    "E3",
    "2F",
    "84",
  ],
  [
    "53",
    "D1",
    "00",
    "ED",
    "20",
    "FC",
    "B1",
    "5B",
    "6A",
    "CB",
    "BE",
    "39",
    "4A",
    "4C",
    "58",
    "CF",
  ],
  [
    "D0",
    "EF",
    "AA",
    "FB",
    "43",
    "4D",
    "33",
    "85",
    "45",
    "F9",
    "02",
    "7F",
    "50",
    "3C",
    "9F",
    "A8",
  ],
  [
    "51",
    "A3",
    "40",
    "8F",
    "92",
    "9D",
    "38",
    "F5",
    "BC",
    "B6",
    "DA",
    "21",
    "10",
    "FF",
    "F3",
    "D2",
  ],
  [
    "CD",
    "0C",
    "13",
    "EC",
    "5F",
    "97",
    "44",
    "17",
    "C4",
    "A7",
    "7E",
    "3D",
    "64",
    "5D",
    "19",
    "73",
  ],
  [
    "60",
    "81",
    "4F",
    "DC",
    "22",
    "2A",
    "90",
    "88",
    "46",
    "EE",
    "B8",
    "14",
    "DE",
    "5E",
    "0B",
    "DB",
  ],
  [
    "E0",
    "32",
    "3A",
    "0A",
    "49",
    "06",
    "24",
    "5C",
    "C2",
    "D3",
    "AC",
    "62",
    "91",
    "95",
    "E4",
    "79",
  ],
  [
    "E7",
    "C8",
    "37",
    "6D",
    "8D",
    "D5",
    "4E",
    "A9",
    "6C",
    "56",
    "F4",
    "EA",
    "65",
    "7A",
    "AE",
    "08",
  ],
  [
    "BA",
    "78",
    "25",
    "2E",
    "1C",
    "A6",
    "B4",
    "C6",
    "E8",
    "DD",
    "74",
    "1F",
    "4B",
    "BD",
    "8B",
    "8A",
  ],
  [
    "70",
    "3E",
    "B5",
    "66",
    "48",
    "03",
    "F6",
    "0E",
    "61",
    "35",
    "57",
    "B9",
    "86",
    "C1",
    "1D",
    "9E",
  ],
  [
    "E1",
    "F8",
    "98",
    "11",
    "69",
    "D9",
    "8E",
    "94",
    "9B",
    "1E",
    "87",
    "E9",
    "CE",
    "55",
    "28",
    "DF",
  ],
  [
    "8C",
    "A1",
    "89",
    "0D",
    "BF",
    "E6",
    "42",
    "68",
    "41",
    "99",
    "2D",
    "0F",
    "B0",
    "54",
    "BB",
    "16",
  ],
];
let word = [];

function KeyExpansion(AesInput) {
  let rcCounter = 0,
    X = 0;
  for (let i = 0; i < 4; i++) {
    word[i] = AesInput.substring(i * 8, i * 8 + 8);
  }
  for (let i = 4; i < 44; i++) {
    if (i % 4 == 0) {
      word[i] = Xor(
        word[X * 4],
        Xor(RC[rcCounter++], RotWord(word[X++ * 4 + 3]))
      );
    } else word[i] = Xor(word[i - 1], word[i - 4]);
  }
}

function RotWord(word) {
  let temp = word.substring(2) + word.substring(0, 2);
  return SubWord(temp);
}

function SubWord(word) {
  let Res = "";
  let row, col;
  for (let i = 0; i < word.length - 1; i += 2) {
    row = parseInt(word.charAt(i), 16);
    col = parseInt(word.charAt(i + 1), 16);
    Res += SBox[row][col];
  }
  return Res;
}
function toBinaryString(hex) {
  let binary = "";
  for (let i = 0; i < hex.length; i++) {
    binary += pad(parseInt(hex.charAt(i), 16).toString(2), 4);
  }
  return binary;
}
function toHexString(binary) {
  let hex = "";
  for (let i = 0; i < binary.length; i += 4) {
    hex += parseInt(binary.substring(i, i + 4), 2).toString(16);
  }
  return hex;
}
function pad(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function Xor(first, second) {
  let hexFirst, hexSecond;
  let tempFirst,
    tempSecond,
    binFirst = "",
    binSecond = "";
  let Result = "";
  for (let i = 0; i < first.length; i++) {
    hexFirst = parseInt(first.charAt(i), 16);
    hexSecond = parseInt(second.charAt(i), 16);

    tempFirst = toBinaryString(hexFirst);
    tempSecond = toBinaryString(hexSecond);

    while (tempFirst.length < 4) tempFirst = "0" + tempFirst;
    while (tempSecond.length < 4) tempSecond = "0" + tempSecond;

    binFirst += tempFirst;
    binSecond += tempSecond;
  }

  let tempRes;
  for (let i = 0; i < binFirst.length / 4; i++) {
    tempRes =
      parseInt(binFirst.substring(i * 4, i * 4 + 4), 2) ^
      parseInt(binSecond.substring(i * 4, i * 4 + 4), 2);

    Result += toHexString(tempRes);
  }
  return Result;
}

(function main() {
  let input = "0f1571c947d9e8590cb7add6af7f6798";
  KeyExpansion(input);
  for (let i = 0; i < 44; i++) console.log(word[i]);
})();
