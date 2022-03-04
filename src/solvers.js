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
  var solutionCount = 1; //fixme

  for (var i = n; i > 0; i--) {
    solutionCount = solutionCount * i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
/*
  I - number representing size of the board
  O - an array representing board.rows
  C - none for now
  E - none for now

  ~~ High Level Strategy ~~
  Iterate through the board, place queen, check if there's any conflict.
  If there's a conflict, remove the queen and move to the next spot

  ~~ Pseudocode ~~
  declare new board
  declare rows variable
  write recursive function
    base case if last row
      iterate through collumns
        place queen
        change placed to true
        if conflict
          remove queen
          change placed to false
      return piecePlaced

    iterate over rows
      iterate over collumns
        toggle queen
        change to true
        if conflict
          remove queen
          change to false
        else
          set placed to recurse over next row
      return piecePlaced

  call recursive function (Don't forget lol)
  return rows variable
*/

  var solution = new Board({n: n});
  var rows = solution.rows();

  var placePiece = function(startingRow) {
    startingRow = startingRow || 0;
    console.log('Recursive call starting row ' + startingRow);
    var piecePlaced = false;
    if (startingRow === rows.length - 1) {
      console.log('Base case has been reached');
      for (var l = 0; l < rows.length && !piecePlaced; l++){
        for (var k = 0; k < rows.length && !piecePlaced; k++) {
          console.log('running ' + l + ', ' + k);
          if (solution.get(l)[k] != 1) {
            console.log('placing piece at ' + l + ', ' + k);
            solution.togglePiece(l, k);
            piecePlaced = true;
            if (solution.hasRowConflictAt(l) || solution.hasColConflictAt(k) || solution.hasAnyMajorDiagonalConflicts() || solution.hasAnyMinorDiagonalConflicts()) {
              console.log('Invalid Piece position, trying another');
              solution.togglePiece(l, k);
              piecePlaced = false;
            }
          }
        }
      }
      console.log('Return to previous recursion level');
      return piecePlaced;
    }

    for (var i = 0; i < rows.length && !piecePlaced; i++) {

      for (var j = 0; j < rows.length && !piecePlaced; j++) {
        if (solution.get(i)[j] != 1) {
          console.log('placing piece at ' + i + ', ' + j);
          solution.togglePiece(i, j);
          piecePlaced = true;
        }
        if (solution.hasRowConflictAt(i) || solution.hasColConflictAt(j) || solution.hasAnyMajorDiagonalConflicts() || solution.hasAnyMinorDiagonalConflicts()) {
          solution.togglePiece(i, j);
          piecePlaced = false;
          console.log('Invalid Piece Position. Trying another');
        } else if (piecePlaced){
          console.log('Piece Placed Successfully. Placing next piece.');
          //If recursion doesn't successfully place a piece after checking all spaces, piece placed = false
          piecePlaced = placePiece(startingRow + 1);
            if (!piecePlaced) {
              console.log(i + ', ' + j)
              //if piecePlaced gets changed by recursion, remove piece so we can continue;
              solution.togglePiece(i, j);
              console.log(solution.rows());
            }
        }
      }
      //console.log(piecePlaced);
    }
    console.log('Was a piece placed at end of loops? ' + piecePlaced);
    console.log(solution.rows());
    console.log('Return to previous recursion level');
    return piecePlaced;

  }
  placePiece();
  console.log(' ' + rows);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(rows));
  return rows;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
   var solutionCount; //fixme
  if (n === 0) {
    solutionCount = 1;
  }


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
