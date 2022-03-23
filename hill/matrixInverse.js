//find inverse of a matrix
//input: matrix
//output: inverse matrix
function inverse(matrix) {
  var det = determinant(matrix);
  if (det == 0) {
    return null;
  }
  var adj = adjoint(matrix);
  var inv = [];
  for (var i = 0; i < matrix.length; i++) {
    inv[i] = [];
    for (var j = 0; j < matrix[i].length; j++) {
      inv[i][j] = adj[i][j] / det;
    }
  }
  return inv;
}
// adjoint of a matrix
// input: matrix
// output: adjoint matrix
function adjoint(matrix) {
  var adj = [];
  for (var i = 0; i < matrix.length; i++) {
    adj[i] = [];
    for (var j = 0; j < matrix[i].length; j++) {
      var sign = (i + j) % 2 == 0 ? 1 : -1;
      var subMatrix = [];
      for (var k = 0; k < matrix.length; k++) {
        subMatrix[k] = [];
        for (var l = 0; l < matrix[k].length; l++) {
          if (k != i && l != j) {
            subMatrix[k][l] = matrix[k][l];
          }
        }
      }
      adj[i][j] = sign * determinant(subMatrix);
    }
  }
  return adj;
}

//test cases
var matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
var matrix2 = [
  [2, 4, 6],
  [8, 10, 12],
  [14, 16, 18],
];
var matrix3 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log(inverse(matrix1));
console.log(inverse(matrix2));
console.log(inverse(matrix3));
