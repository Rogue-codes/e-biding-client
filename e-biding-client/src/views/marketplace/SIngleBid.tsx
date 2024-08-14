import { Divider, Tag } from "antd";
import { macbook } from "../../assets";
import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useGetAuctionQuery, usePlaceBidMutation } from "../../api/auction.api";
import CountdownTimer from "../../components/CountDownTimer";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { IUser } from "../../interfaces/user.interface";
import { useEffect } from "react";

interface IForm {
  bidAmount: number;
}
export default function SIngleBid() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>();

  const id = new URLSearchParams(location.search).get("id");

  const { data, isLoading } = useGetAuctionQuery({
    id,
  });

  const user: IUser = useSelector((state: any) => state.auth.user);

  const [placeBid, { data: placedBid, isLoading: placingBid, isSuccess }] =
    usePlaceBidMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(placedBid?.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [isSuccess]);
  const auction_ = id ? id * 1 : null;

  const handlePlaceBid = (value: IForm) => {
    placeBid({
      auction: auction_ as number,
      bidAmount: value.bidAmount,
      user: user.id,
    })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(
          Array.isArray(e?.data?.message)
            ? e?.data?.message[0]
            : e?.data?.message,
          {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
      });
  };

  const auction = data?.data;
  return (
    <div>
      <div className="w-full flex mb-3 justify-between items-center">
        <p className="text-lg text-EBD/Darkest font-semibold">
          Auction Details
        </p>
        <p className="text-lg font-bold leading-6 text-[#B94B72]">
          <span className="text-EBD/Darkest text-sm leading-[22px] font-medium mr-2">
            Time Remaining:
          </span>
          <>
            {isLoading ? (
              "Loading..."
            ) : (
              <CountdownTimer
                startDate={auction?.startDate}
                endDate={auction?.endDate}
                className="!text-lg"
              />
            )}
          </>
        </p>
      </div>
      <Divider />

      <div className="w-full flex justify-between gap-5 items-start">
        <div className="min-w-[19vw] h-[11rem]">
          {isLoading ? (
            "Loading..."
          ) : (
            <img
              src={auction?.itemImg}
              className="w-full h-full object-cover"
              alt=""
            />
          )}
        </div>
        <div className="w-[80vw]">
          <div>
            <p className="text-xl font-semibold leading-7">
              Auction Description
            </p>
            <p className="text-sm font-medium text-EBD/Darkest leading-[22px]">
              {isLoading ? "Loading..." : auction?.bidDescription}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold leading-7">Item Description</p>
            <p className="text-sm font-medium text-EBD/Darkest leading-8 w-[60%]  mt-3">
              {isLoading ? "Loading..." : auction?.itemDescription}
            </p>
          </div>

          <div className="mt-6 flex justify-start items-center gap-12">
            <p className="font-semibold text-EBD/Darkest leading-6">Category</p>
            <div>
              {isLoading
                ? "Loading..."
                : auction?.categories.map((category) => (
                    <Tag className="bg-[#F0F0FF] text-EBD/Dark py-1 px-3">
                      {category}
                    </Tag>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Divider />

      <div className="w-[57vw] flex justify-end">
        <div className="w-[65%]">
          <p className="text-md leading-6 text-EBD/Darkest ">
            Auction Requirements
          </p>
          <p className="text-xs mt-2 flex justify-start gap-1 items-center font-medium text-EBD/Medium leading-4">
            <InfoIcon
              sx={{
                fontSize: "16px",
              }}
            />
            Kindly check the product specifications that apply to the product
            you have for this Auction.
          </p>

          <div className="w-[100%] mt-4">
            {isLoading
              ? "Loading..."
              : auction?.bidRequirements?.map((term, i) => (
                  <div
                    key={i}
                    className="flex justify-start gap-4 my-2 items-center w-full"
                  >
                    <div className="w-2 h-2 border border-[#142633] bg-EBD/Darkest"></div>
                    <p className="text-sm text-[#142633]">{term}</p>
                  </div>
                ))}
          </div>

          <div>
            {auction?.highestBid ? (
              <Tag className="bg-orange-200 text-orange-500 py-1 mt-5  px-3">
                Leading Bid: ₦{auction?.highestBid}
              </Tag>
            ) : (
              <p className="text-xl font-semibold leading-8 py-4">
                Starting Amount: ₦{auction?.startingAmount}
              </p>
            )}

            <p className="text-xl font-semibold leading-8 py-4">Place Bid</p>
          </div>

          <form action="" onSubmit={handleSubmit(handlePlaceBid)}>
            <FormControl
              sx={{
                width: "34vw",
              }}
            >
              <label
                htmlFor=""
                className="text-md font-medium leading-6 text-EBD/Darkest"
              >
                Bid Amount
              </label>
              <Controller
                name="bidAmount"
                control={control}
                rules={{
                  required: "Bid amount is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "text/character not supported",
                  },
                }}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    type="number"
                    {...fields}
                    variant="outlined"
                    placeholder="Bid Amount"
                    inputProps={{ "data-testid": "firstname" }}
                    fullWidth
                    inputRef={ref}
                    InputProps={{
                      color: fields.value && !error ? "success" : undefined,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(error?.message)}
                  />
                )}
              />
            </FormControl>
            <Button
              type="submit"
              sx={{
                height: "48px",
                width: "34vw",
                borderRadius: "5px",
                mt: "32px",
                fontSize: "16px",
                fontWeight: 600,
                background: "#3E4095",
                color: "#ffffff",
                "&:hover": {
                  background: "#3E4095",
                },
              }}
              disabled={!isValid}
              className="disabled:!text-white disabled:opacity-50 disabled:!cursor-not-allowed"
            >
              {placingBid ? (
                <CircularProgress
                  sx={{
                    color: "#fff",
                  }}
                  size={25}
                />
              ) : (
                "Submit Bid"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
