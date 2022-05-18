const exec = require("child_process").exec;

const RC = [
  "01000000",
  "02000000",
  "04000000",
  "08000000",
  "10000000",
  "20000000",
  "40000000",
  "80000000",
  "1b000000",
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
  console.log(AesInput);
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

function RotWord(w) {
  var tmp = w[0];
  for (var i = 0; i < 3; i++) w[i] = w[i + 1];
  w[3] = tmp;
  return w;
}

function SubWord(word) {
  for (var i = 0; i < 4; i++) w[i] = SBox[w[i]];
  return w;
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

function Xor(first = "", second = "") {
  let temp = "";
  for (let i = 0; i < first.length; i++) {
    temp += first[i] ^ second.charAt(i);
  }
  return temp;
}

(function main() {
  let input = "0f1571c947d9e8590cb7add6af7f6798";
  KeyExpansion(input);
  for (let i = 0; i < 44; i++) console.log(`key: ${i} is `, word[i]);
})();

/* example run
0f1571c947d9e8590cb7add6af7f6798
The keys is: 
key:1 is 0f1571c9
key:2 is 47d9e859
key:3 is 0cb7add6
key:4 is af7f6798
key:5 is dc9037b0
key:6 is 9b49dfe9
key:7 is 97fe723f
key:8 is 388115a7
key:9 is d2c96bb7
key:10 is 4980b45e
key:11 is de7ec661
key:12 is e6ffd3c6
key:13 is c0afdf39
key:14 is 892f6b67
key:15 is 5751ad06
key:16 is b1ae7ec0
key:17 is 2c5c65f1
key:18 is a5730e96
key:19 is f222a390
key:20 is 438cdd50
key:21 is 589d36eb
key:22 is fdee387d
key:23 is 0fcc9bed
key:24 is 4c4046bd
key:25 is 71c74cc2
key:26 is 8c2974bf
key:27 is 83e5ef52
key:28 is cfa5a9ef
key:29 is 37149348
key:30 is bb3de7f7
key:31 is 38d808a5
key:32 is f77da14a
key:33 is 48264520
key:34 is f31ba2d7
key:35 is cbc3aa72
key:36 is 3cbe0b38
key:37 is fd0d42cb
key:38 is 0e16e01c
key:39 is c5d54a6e
key:40 is f96b4156
key:41 is b48ef352
key:42 is ba98134e
key:43 is 7f4d5920
key:44 is 86261876
*/
