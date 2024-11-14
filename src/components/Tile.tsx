import { dragDrop, dragEnd, dragStart } from "../store";
import { useAppDispatch } from "../store/hooks";

function Tile({ candy, candyId }: { candy: string; candyId: number }) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="flex justify-center items-center m-1 rounded-lg select-none"
      style={{
        width: '100%', // Full width of the grid cell
        height: '100%', // Full height of the grid cell
        boxShadow: "inset 5px 5px 15px #062525,inset -5px -5px 15px #aaaab7bb",
      }}
    >
      {candy && (
        <img
          src={candy}
          alt=""
          className="h-full w-full object-cover" // Ensure the image covers the tile
          draggable={true}
          onDragStart={(e) => dispatch(dragStart(e.target))}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => dispatch(dragDrop(e.target))}
          onDragEnd={() => dispatch(dragEnd())}
          candy-id={candyId}
        />
      )}
    </div>
  );
}

export default Tile;