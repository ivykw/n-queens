/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
/*
I: number of rooks on nxn chessboard
O: board object
C:
E: n is negative/0

~~ High Level Strategy ~~
Toggle piece on space, check if there's a conflict, have a piece placed boolean to exit recursive

~~ Pseudocode ~~
// create board
// set rows var
// create recursive function
  // piece placed var = false
  // iterate over rows
    // toggle piece
    // piece placed = true
    // if conflicting
      // toggle piece again
      // piece placed = false
      // continue iterating
    // else
      // if recursive false  -- piecePlaced = addPiece();
        // continue loop
      // move along
  //return piecePlaced

*/
  var newBoard = new Board({'n': n});
  var rows = newBoard.rows();
  var addPiece = function(startingRow) {
    var startingRow = startingRow || 0;
    var piecePlaced = false;
    if (startingRow === rows.length - 1) {
      for (var k = 0; k < rows.length && !piecePlaced; k++) {
        newBoard.togglePiece(startingRow, k);
        piecePlaced = true;
        if (newBoard.hasRowConflictAt(startingRow) || newBoard.hasColConflictAt(k)) {
          newBoard.togglePiece(startingRow, k);
          piecePlaced = false;
        }
      }
      return piecePlaced;
    }

    for (var i = startingRow; i < rows.length && !piecePlaced; i++) {
      for (var j = 0; j < rows.length && !piecePlaced; j++) {
        newBoard.togglePiece(i, j);
        piecePlaced = true;
        if (newBoard.hasRowConflictAt(i) || newBoard.hasColConflictAt(j)) {
          newBoard.togglePiece(i, j);
          piecePlaced = false;
        } else {
          piecePlaced = addPiece(i + 1);
        }
      }
    }
    return piecePlaced;
  }
  addPiece();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rows));
  return rows;
};

/*
var solutionBoard = new Board(findNRooksSolution(n));
findNRooksSolution === [1]
[[1]]
*/
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
