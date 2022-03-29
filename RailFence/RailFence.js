function Encrypt() {
  plaintext = document
    .getElementById("p")
    .value.toLowerCase()
    .replace(/[^a-z]/g, "");
  if (plaintext.length < 1) {
    alert("please enter some plaintext");
    return;
  }
  var key = parseInt(document.getElementById("key").value);
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

function Decrypt(f) {
  ciphertext = document
    .getElementById("c")
    .value.toLowerCase()
    .replace(/[^a-z]/g, "");
  if (ciphertext.length < 1) {
    alert("please enter some ciphertext (letters only)");
    return;
  }
  var key = parseInt(document.getElementById("key").value);
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

// second implementation for railfence

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.zigzag = factory();
  }
})(this, function () {
  function makeMap(len, n) {
    var i,
      pip,
      period = 2 * (n - 1);
    var rows = Array.apply(null, Array(n)).map(function () {
      return [];
    }); // array of arrays
    for (i = 0; i < len; i++) {
      pip = i % period;
      r = pip < n - 1 ? pip : period - pip;
      rows[r].push(i);
    }
    return Array.concat.apply(null, rows);
  }

  function decrypt(text, n) {
    var i,
      len = text.length,
      mapped = makeMap(len, n),
      result = "";
    return text.split("").reduce(function (p, c, i, a) {
      return p + a[mapped.indexOf(i)];
    }, "");
    for (i = 0; i < len; i++) result += text.substr(mapped.indexOf(i), 1);
    return result;
  }

  function encrypt(text, n) {
    var i,
      len = text.length,
      mapped = makeMap(len, n),
      result = "";
    for (i = 0; i < len; i++) result += text.substr(mapped[i], 1);
    return result;
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
  };
});

var src = "mahmoud ali";
var enc = "mahmoud ali";
zigzag.decrypt(enc, 4);
zigzag.encrypt(src, 4);
