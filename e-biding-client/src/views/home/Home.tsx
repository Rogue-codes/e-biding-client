import { Button } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import PendingBids from "./BidWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import { IUser } from "../../interfaces/user.interface";
import { updateUser } from "../../configs/authSlice";
import { useGetStatusQuery } from "../../api/auth.api";
import {
  useGetPendingBidsQuery,
  useGetRecomendedBidsQuery,
} from "../../api/auction.api";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

export default function Home() {
  const user: IUser = useSelector((state: any) => state.auth.user);
  const { data: pendingBids, isLoading } = useGetPendingBidsQuery({
    id: user.id,
  });

  const { data: recommendedBids, isLoading: isLoadingRecommendedBids } =
    useGetRecomendedBidsQuery({
      id: user.id,
    });

  console.log("recommendedBids: ", recommendedBids?.bids);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isSuccess } = useGetStatusQuery({
    email: user.email,
  });

  console.log("res", data?.data);

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(updateUser({ isActive: data.data }));
    }
  }, [isSuccess, data, dispatch]);

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
          onClick={() => navigate(`${paths.MARKETPLACE}`)}
        >
          Place A bid
        </Button>
      </div>

      {(!user?.isActive || !user?.isVerified) && (
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
        headerText={`Pending Bids (${pendingBids?.bid?.length})`}
        bidsArr={pendingBids?.bid}
        showBtn={false}
        bidCount={pendingBids?.bid?.length}
        isLoading={isLoading}
      />
      <PendingBids
        headerText="Bids that might interest you"
        recommendations={recommendedBids?.bids}
        showBtn
        recommended={true}
        isLoading={isLoadingRecommendedBids}
      />

      {(!user?.isActive || !user?.isVerified) && (
        <div className="w-full h-screen fixed left-0 top-0 bg-EBD/Lightest opacity-40 cursor-not-allowed"></div>
      )}
    </Fragment>
  );
}
