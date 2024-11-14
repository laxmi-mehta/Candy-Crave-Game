import { useAppSelector } from "../store/hooks";
import Tile from "./Tile";

function Board() {
  const board: string[] = useAppSelector(({ candyCrush: { board } }) => board);
  
  return (
    <div
      className="grid grid-cols-8 gap-1" // 8 columns for the grid
      style={{
        width: '100%', // Full width
        maxWidth: '500px', // Limit max width for larger screens
        height: 'auto', // Allow height to adjust based on content
      }}
    >
      {board.slice(0, 64).map((candy: string, index: number) => ( // Only take the first 64 candies for an 8x8 grid
        <Tile candy={candy} key={index} candyId={index} />
      ))}
    </div>
  );
}

export default Board;