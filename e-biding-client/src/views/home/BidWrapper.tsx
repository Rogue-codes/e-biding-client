import { Button, Divider } from "@mui/material";
import { pendingBidArr } from "../../constants";
import Bid from "../../components/bid/Bid";

interface IBidWrapper {
  headerText: string;
  bidsArr: {
    img: string;
    desc: string;
  }[];
  showBtn: boolean;
}

export default function BidWrapper({
  bidsArr,
  headerText,
  showBtn,
}: IBidWrapper) {
  return (
    <div className="w-full mt-12">
      <div className="w-full flex justify-between items-center">
        <p className="text-EBD-Primary pb-2 font-semibold leading-7">
          {headerText}
        </p>

       {showBtn && (
        <Button sx={{
            backgroundColor: "transparent",
            border:'solid 1px #DADBF2',
            color:"#505173",
            mb:"8px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}>See all</Button>
       )} 
      </div>

      <Divider />
      <div className="w-full mt-8 flex flex-wrap justify-start gap-10 items-center">
        {bidsArr.map((bid, i) => (
          <Bid description={bid.desc} img={bid.img} key={i} />
        ))}
      </div>
    </div>
  );
}
