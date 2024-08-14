import { Button, CircularProgress, Divider } from "@mui/material";
import Bid from "../../components/bid/Bid";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import { IAuction, IBid } from "../../interfaces/auction.interface";

interface IBidWrapper {
  headerText: string;
  bidsArr?: IBid[];
  recommendations?: IAuction[];
  showBtn: boolean;
  bidCount?: number;
  recommended?: boolean;
  isLoading: boolean;
}

export default function BidWrapper({
  bidsArr,
  headerText,
  showBtn,
  bidCount,
  recommended,
  recommendations,
  isLoading,
}: IBidWrapper) {
  const navigate = useNavigate();

  console.log("bidcount", bidCount);
  return (
    <div className="w-full mt-12">
      {!showBtn && !bidCount ? (
        <div className="p-5 flex flex-col justify-center items-center gap-6 w-full">
          <p className="text-md text-EBD/Darkest leading-7">
            You currently have no pending bid!
          </p>
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
            {isLoading ? (
              <div className="w-full flex justify-center items-center">
                <CircularProgress
                  sx={{
                    color: "#fff",
                  }}
                  size={25}
                />
              </div>
            ) : (
              <>
                {!recommended
                  ? bidsArr?.map((bid, i) => (
                      <Bid
                        description={bid?.auction?.bidDescription}
                        img={bid?.auction?.itemImg}
                        key={i}
                      />
                    ))
                  : recommendations?.map((auction, i) => (
                      <Bid
                        description={auction?.bidDescription}
                        img={auction?.itemImg}
                        key={i}
                      />
                    ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
