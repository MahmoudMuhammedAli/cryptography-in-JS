let plainMat = [];
let cipherMat = [];
let keyMat = [];
let plainInverseMat = [];
const attack = (cipherText, plainText) => {
  fillMat(cipherText, plainText);
  plainInverseMat = matrixInverse(n);
  keyMat = [];
  const res = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      keyMat[i][j] = 0;
      for (let k = 0; k < n; k++) {
        keyMat[i][j] += cipherMat[k][i] * plainInverseMat[j][k];
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res.append((keyMat[j][i] % 26) + " ");
    }
    res.append("\n");
  }

  return keyMat;
};

function fillMat(cipherText, plainText) {
  plainMat = [];
  cipherMat = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      plainMat[i][j] = plainText[i][j];
      cipherMat[i][j] = cipherText[i][j];
    }
  }
}

function matrixInverse(n) {
  let MatInverse = [];
  let revMatrix = [];

  if (n == 2) {
    revMatrix[0][0] = plainMat[1][1];
    revMatrix[1][1] = plainMat[0][0];
    revMatrix[0][1] = -plainMat[0][1];
    revMatrix[1][0] = -plainMat[1][0];
  } else {
    revMatrix[0][0] =
      plainMat[1][1] * plainMat[2][2] - plainMat[1][2] * plainMat[2][1];
    revMatrix[0][1] = -(
      plainMat[0][1] * plainMat[2][2] -
      plainMat[0][2] * plainMat[2][1]
    );
    revMatrix[0][2] =
      plainMat[0][1] * plainMat[1][2] - plainMat[0][2] * plainMat[1][1];

    revMatrix[1][0] = -(
      plainMat[1][0] * plainMat[2][2] -
      plainMat[1][2] * plainMat[2][0]
    );
    revMatrix[1][1] =
      plainMat[0][0] * plainMat[2][2] - plainMat[0][2] * plainMat[2][0];
    revMatrix[1][2] = -(
      plainMat[0][0] * plainMat[1][2] -
      plainMat[0][2] * plainMat[1][0]
    );

    revMatrix[2][0] =
      plainMat[1][0] * plainMat[2][1] - plainMat[1][1] * plainMat[2][0];
    revMatrix[2][1] = -(
      plainMat[0][0] * plainMat[2][1] -
      plainMat[0][1] * plainMat[2][0]
    );
    revMatrix[2][2] =
      plainMat[0][0] * plainMat[1][1] - plainMat[0][1] * plainMat[1][0];
  }

  let det = String.valueOf(MatDeterminant(n)) % 26;
  let detInverse = modInverse(det, 26);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      MatInverse[i][j] = (revMatrix[i][j] * detInverse) % 26;
    }
  }

  return MatInverse;
}
function modInverse(a, m) {
  let m0 = m;
  let y = 0,
    x = 1;
  if (m == 1) return 0;
  while (a > 1) {
    let q = a / m;
    let t = m;
    (m = a % m), (a = t);
    t = y;
    y = x - q * y;
    x = t;
  }
  if (x < 0) x += m0;
  return x;
}

function MatDeterminant(n) {
  let x,
    y,
    z,
    determinant = 0;

  if (n === 2)
    determinant =
      plainMat[0][0] * plainMat[1][1] - plainMat[0][1] * plainMat[1][0];
  else {
    x = plainMat[1][1] * plainMat[2][2] - plainMat[2][1] * plainMat[1][2];
    y = plainMat[1][0] * plainMat[2][2] - plainMat[2][0] * plainMat[1][2];
    z = plainMat[1][0] * plainMat[2][1] - plainMat[2][0] * plainMat[1][1];

    determinant = plainMat[0][0] * x - plainMat[0][1] * y + plainMat[0][2] * z;
  }
  return determinant;
}
