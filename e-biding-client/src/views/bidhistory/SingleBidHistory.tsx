import { Divider } from "@mui/material";
import { macbook } from "../../assets";
import BidWrapper from "../home/BidWrapper";
import { interestingBidArr, pendingBidArr } from "../../constants";

export default function SingleBidHistory() {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg leading-7 font-semibold text-EBD/Darkest">
          Bid Details
        </p>
        <p className="font-bold text-EBD/Success text-lg leading-6">BID WON</p>
      </div>
      <br />
      <Divider />

      <div className="w-[60%] p-4 flex justify-start gap-5 items-start">
        <div className="w-[19.4vw] h-[11rem]">
          <img src={macbook} className="w-full h-full object-cover" alt="" />
        </div>

        <div>
          <div>
            <p className="text-xl font-semibold leading-7">Bid Description</p>
            <p className="text-md text-EBD/Darkest font-medium leading-[22px]">
              15 Pcs of the Apple M1 Pro 8-Core Chip.
            </p>
          </div>

          <div className="mt-5">
            <p className="text-xl font-semibold leading-7">
              Submitted Bid Details
            </p>
            <div className="flex mt-5 justify-start gap-6">
              <div>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px]">
                  Bid ID:
                </p>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px] mt-3">
                  Total Bids Submitted:
                </p>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px] mt-3">
                  Winning Bid Price:
                </p>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px] mt-3">
                  Winning Bid Agent:
                </p>
              </div>

              <div>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px]">
                  NGA0709
                </p>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px] mt-3">
                  72
                </p>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px] mt-3">
                  ₦9,720,000
                </p>
                <p className="text-md text-EBD/Darkest font-medium leading-[22px] mt-3">
                  Wale Adigun
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BidWrapper
        showBtn
        bidsArr={interestingBidArr}
        headerText="Bids that might interest you"
      />
    </div>
  );
}
