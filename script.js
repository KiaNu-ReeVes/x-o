var playerTurn = true;
var doozplayerCheck = [];
var doozaiCheck = [];
const winPattern = [
  ["botn-1", "botn-2", "botn-3"],
  ["botn-4", "botn-5", "botn-6"],
  ["botn-7", "botn-8", "botn-9"],
  ["botn-3", "botn-6", "botn-9"],
  ["botn-2", "botn-5", "botn-8"],
  ["botn-1", "botn-4", "botn-7"],
  ["botn-7", "botn-5", "botn-3"],
  ["botn-9", "botn-5", "botn-1"],
];

var movesCount = 0; // تعداد حرکات انجام شده

(function setup() {
  $(".gamebutton").on("click", function (e) {
    if (playerTurn) {
      if (checkTables(this.id)) {
        playerTurn = false;
        doozplayerCheck.push(this.id);
        $("#" + this.id + " span").text("x");
        movesCount++; // افزایش تعداد حرکات انجام شده
        if (winCheck()) {
          alert("Game Win");
          resetGame();
        } else if (movesCount === 9) {
          // اگر 9 حرکت انجام شده باشد
          alert("Game Over! It's a draw."); // پیام تساوی را نمایش دهید
          resetGame();
        } else {
          aiTurn();
        }
      }
    }
  });

  function checkTables(cell) {
    if (!doozaiCheck.includes(cell) && !doozplayerCheck.includes(cell)) {
      return true;
    }
    return false;
  }

  function winCheck() {
    for (const pattern of winPattern) {
      let playerWin = true;
      let aiWin = true;

      for (const cell of pattern) {
        if (!doozplayerCheck.includes(cell)) {
          playerWin = false;
        }

        if (!doozaiCheck.includes(cell)) {
          aiWin = false;
        }

        if (!playerWin && !aiWin) {
          break;
        }
      }

      if (playerWin) {
        playerTurn = true;
        doozplayerCheck = [];
        doozaiCheck = [];
        $("#gamespan").text("");
        return true;
      }

      if (aiWin) {
        playerTurn = true;
        doozplayerCheck = [];
        doozaiCheck = [];
        $("#gamespan").text("");
        return true;
      }
    }

    return false;
  }

  function aiTurn() {
    if (!playerTurn) {
      const bestMove = findBestMove();
      doozaiCheck.push(bestMove);
      $("#" + bestMove + " span").text("o");
      playerTurn = true;
      movesCount++; // افزایش تعداد حرکات انجام شده
      if (winCheck()) {
        alert("AI Wins");
        resetGame();
      } else if (movesCount === 9) {
        // اگر 9 حرکت انجام شده باشد
        alert("Game Over! It's a draw."); // پیام تساوی را نمایش دهید
        resetGame();
      }
    }
  }

  function evaluateMove(cell) {
    let score = 0;
    for (const pattern of winPattern) {
      if (pattern.includes(cell)) {
        let countPlayer = 0;
        let countAI = 0;
        for (const c of pattern) {
          if (doozplayerCheck.includes(c)) {
            countPlayer++;
          } else if (doozaiCheck.includes(c)) {
            countAI++;
          }
        }
        if (countAI === 3) {
          // AI wins
          return 10;
        } else if (countPlayer === 3) {
          // Player wins
          return -10;
        } else if (countAI === 2 && countPlayer === 0) {
          // Two in a row for AI
          score += 5;
        } else if (countPlayer === 2 && countAI === 0) {
          // Two in a row for Player
          score += 2;
        }
      }
    }
    return score;
  }

  function findBestMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (const cell of [
      "botn-1",
      "botn-2",
      "botn-3",
      "botn-4",
      "botn-5",
      "botn-6",
      "botn-7",
      "botn-8",
      "botn-9",
    ]) {
      if (!doozaiCheck.includes(cell) && !doozplayerCheck.includes(cell)) {
        const score = evaluateMove(cell);
        if (score > bestScore) {
          bestScore = score;
          bestMove = cell;
        }
      }
    }
    return bestMove;
  }

  function resetGame() {
    playerTurn = true;
    doozplayerCheck = [];
    doozaiCheck = [];
    movesCount = 0; // بازنشانی تعداد حرکات انجام شده
    $(".gamebutton span").text(""); // پاک کردن نمادهای حرکت‌ها
  }
})();
