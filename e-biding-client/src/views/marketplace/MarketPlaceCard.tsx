import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import { IAuction } from "../../interfaces/auction.interface";
import CountdownTimer from "../../components/CountDownTimer";

interface IMarketPlaceCard {
  bid: IAuction;
}
export default function MarketPlaceCard({ bid }: IMarketPlaceCard) {
  const navigate = useNavigate();
  return (
    <div className="w-full border-b pb-8  mb-8 flex justify-start gap-5 items-center">
      <div className="h-28 w-[12vw] rounded-lg">
        <img
          src={bid?.itemImg}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="w-[70%]">
        <p className="text-[18px] font-semibold leading-[21px]">
          Auction Description
        </p>
        <p className="text-md text-EBD/Darkest font-medium leading-[22px]">
          {bid?.bidDescription}
        </p>
        <div className="w-full flex justify-start gap-[55%] items-end mt-4">
          <Button
            sx={{
              backgroundColor: "#B94B72",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#B94B72",
              },
            }}
            onClick={() => navigate(`${paths.SINGLEBID}?id=${bid?.id}`)}
          >
            VIEW Auction DETAILS
          </Button>

          <p className="text-lg font-bold leading-6 text-[#B94B72]">
            <span className="text-EBD/Darkest text-sm leading-[22px] font-medium">
              Time Remaining:
            </span>

            <CountdownTimer
              startDate={bid?.startDate}
              endDate={bid?.endDate}
              className="!text-lg"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
