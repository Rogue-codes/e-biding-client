import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Divider } from "@mui/material";
import MarketPlaceCard from "./MarketPlaceCard";
export default function MarketPlace() {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg text-EBD/Darkest font-semibold">Marketplace</p>
        <div className="flex justify-start items-center gap-2">
          <p>Sort</p>
          <div className="py-2 px-4 border border-EBD/Light rounded-[4px] cursor-pointer flex justify-between gap-2">
            <p className="text-sm text-EBD/Dark font-medium">Most recent</p>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>
      <Divider
        style={{
          marginTop: "12px",
        }}
      />

      <div className="mt-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((_item, index) => (
          <MarketPlaceCard key={index} />
        ))}
      </div>
    </div>
  );
}
