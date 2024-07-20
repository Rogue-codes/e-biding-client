import { Button, Divider } from "@mui/material";
import Bid from "../../components/bid/Bid";

interface IBidWrapper {
  headerText: string;
  bidsArr: {
    img: string;
    desc: string;
  }[];
  showBtn: boolean;
  bidCount?: number;
}

export default function BidWrapper({
  bidsArr,
  headerText,
  showBtn,
  bidCount,
}: IBidWrapper) {

  console.log('bidcount', bidCount);
  return (
    <div className="w-full mt-12">
      {!showBtn && !bidCount ? (
        <div className="p-5 flex flex-col justify-center items-center gap-6 w-full">
          <p className="text-md text-EBD/Darkest leading-7">You currently have no pending bid!</p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3E4095",
              "&:hover": {
                backgroundColor: "#3E4095",
              },
            }}
          >
            Browse Marketplace
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <p className="text-EBD-Primary pb-2 font-semibold leading-7">
              {headerText}
            </p>

            {showBtn && (
              <Button
                sx={{
                  backgroundColor: "transparent",
                  border: "solid 1px #DADBF2",
                  color: "#505173",
                  mb: "8px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                See all
              </Button>
            )}
          </div>

          <Divider />
          <div className="w-full mt-8 flex flex-wrap justify-start gap-12 items-center">
            {bidsArr.map((bid, i) => (
              <Bid description={bid.desc} img={bid.img} key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
