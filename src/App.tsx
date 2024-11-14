import { useEffect } from "react";
import Board from "./components/Board";
import { moveBelow, updateBoard, resetGame } from "./store"; // Import resetGame action
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { createBoard } from "./utils/createBoard";
import {
  formulaForColumnOfFour,
  formulaForColumnOfThree,
  generateInvalidMoves,
} from "./utils/formulas";
import {
  checkForColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  isColumnOfFour,
} from "./utils/moveCheckLogic";

function App() {
  const dispatch = useAppDispatch();
  const board = useAppSelector(({ candyCrush: { board } }) => board);
  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );
  const score = useAppSelector(({ candyCrush: { score } }) => score);

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)));
  }, [dispatch, boardSize]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize));
      checkForRowOfFour(
        newBoard,
        boardSize,
        generateInvalidMoves(boardSize, true)
      );
      checkForColumnOfThree(
        newBoard,
        boardSize,
        formulaForColumnOfThree(boardSize)
      );
      checkForRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize));
      dispatch(updateBoard(newBoard));
      dispatch(moveBelow());
    }, 150);
    return () => clearTimeout(timeout); // Use clearTimeout instead of clearInterval
  }, [board, dispatch, boardSize]);

  const handleResetGame = () => {
    dispatch(resetGame()); // Dispatch the resetGame action to reset score and board
    dispatch(updateBoard(createBoard(boardSize))); // Reset the board
  };

  return (
    <div className="flex items-center justify-center flex-col ">
      <h2 className="text-2xl mb-4 text-white font-semibold shadow-lg">Score: {score}</h2>
      <button 
        onClick={handleResetGame} 
        className="mb-4 px-4 py-2 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition duration-300"
      >
        Reset Game
      </button>
      <div className="border-2 border-white rounded-lg p-1 bg-white shadow-lg">
        <Board />
      </div>
    </div>
  );
}

export default App;