import { Button } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import PendingBids from "./BidWrapper";
import { interestingBidArr, pendingBidArr } from "../../constants";

export default function Home() {
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

      <PendingBids headerText="Pending Bids (2)" bidsArr={pendingBidArr} showBtn={false} />
      <PendingBids headerText="Bids that might interest you"  bidsArr={interestingBidArr} showBtn />
    </Fragment>
  );
}
