import { Button } from "@mui/material";
import { markettable } from "../../assets";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

export default function MarketPlaceCard() {
  const navigate = useNavigate();
  return (
    <div className="w-full mb-8 flex justify-start gap-5 items-center">
      <div className="h-28 w-[12vw] rounded-lg">
        <img
          src={markettable}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>
      <div>
        <p className="text-[18px] font-semibold leading-[21px]">
          Bid Description
        </p>
        <p className="text-md text-EBD/Darkest font-medium leading-[22px]">
          20 Pcs This space saver office desk is suitable for an office with
          space constrain. Looks executive on a budget.
        </p>
        <div className="w-full flex justify-between items-end mt-4">
          <Button
            sx={{
              backgroundColor: "#B94B72",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#B94B72",
              },
            }}
            onClick={() => navigate(`${paths.SINGLEBID}`)}
          >
            VIEW BID DETAILS
          </Button>

          <p className="text-lg font-bold leading-6 text-[#B94B72]">
            <span className="text-EBD/Darkest text-sm leading-[22px] font-medium">
              Time Remaining:
            </span>

            108h 54m 30s left
          </p>
        </div>
      </div>
    </div>
  );
}
