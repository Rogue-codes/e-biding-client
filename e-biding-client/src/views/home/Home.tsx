import { Button } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import PendingBids from "./BidWrapper";
import { interestingBidArr, pendingBidArr } from "../../constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
export default function Home() {
  const [bidCount, _setBidCount] = useState(0);

  const accountVerified = useSelector(
    (state: any) => state.auth.isAccountVerified
  );
  return (
    <Fragment>
      <div className="w-full bg-EBD/Lightest p-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl text-EBD/Dark leading-8 font-semibold">
            Welcome, Wale!
          </h1>
          <p className="text-md text-EBD/Dark leading-6">
            See how your bids are doing.
          </p>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3E4095",
            "&:hover": {
              backgroundColor: "#3E4095",
            },
          }}
        >
          Place A bid
        </Button>
      </div>

      {!accountVerified && (
        <div className="p-2 text-sm mt-2 rounded-lg flex justify-start items-center gap-2 bg-[#B94B72] text-white">
          <InfoIcon />
          <p>
            Kindly wait for your account to be verified so you can start
            bidding! The process might take up to 24 hrs and if it takes longer,
            contact our customer support lines. Thank you!
          </p>
        </div>
      )}

      <PendingBids
        headerText="Pending Bids (2)"
        bidsArr={pendingBidArr}
        showBtn={false}
        bidCount={bidCount}
      />
      <PendingBids
        headerText="Bids that might interest you"
        bidsArr={interestingBidArr}
        showBtn
      />

      {!accountVerified && (
        <div className="w-full h-screen fixed left-0 top-0 bg-EBD/Lightest opacity-40 cursor-not-allowed"></div>
      )}
    </Fragment>
  );
}
