// DRIVER FUNCTION
(() => {
  const plainText = fs.readFileSync("plainText.txt").toString().toUpperCase();
  const key = fs.readFileSync("key.txt").toString().toUpperCase();
  const cipherText = fs.readFileSync("cipherText.txt").toString().toUpperCase();

  const encrypted = encrypt(plainText, key);
  const decrypted = decrypt(cipherText, key);

  fs.writeFileSync("output.txt", `${encrypted}\n${decrypted}`);
  // open the file in the default txt viewer  (notepad)
  exec("start output.txt");
})();

// HELPER FUNCTIONS
const clean = (text) => {
  // replace anything not from a=>z  with an empty string
  return text.toLowerCase().replace(/[^a-z]/g, "");
};
const isEmpty = (text) => {
  return text.length < 1;
};
const toInt = (text) => {
  return parseInt(text);
};
// MAIN  FUNCTIONS
function encrypt(plaintext, key) {
  plaintext = clean(plaintext);
  if (isEmpty(plaintext)) return "";
  key = toInt(key);
  if (key > Math.floor(2 * (plaintext.length - 1))) {
    alert("key is too large for the plaintext length.");
    return;
  }
  ciphertext = "";
  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < plaintext.length; ) {
      ciphertext += plaintext.charAt(i);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < plaintext.length; i += 2 * (key - 1))
    ciphertext += plaintext.charAt(i);
  document.getElementById("c").value = ciphertext;
}

function decrypt(f) {
  ciphertext = document
    .getElementById("c")
    .value.toLowerCase()
    .replace(/[^a-z]/g, "");
  if (ciphertext.length < 1) {
    alert("please enter some ciphertext (letters only)");
    return;
  }
  let key = parseInt(document.getElementById("key").value);
  if (key > Math.floor(2 * (ciphertext.length - 1))) {
    alert("please enter 1 - 22.");
    return;
  }
  pt = new Array(ciphertext.length);
  k = 0;
  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < ciphertext.length; ) {
      pt[i] = ciphertext.charAt(k++);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < ciphertext.length; i += 2 * (key - 1))
    pt[i] = ciphertext.charAt(k++);
  document.getElementById("p").value = pt.join("");
}
