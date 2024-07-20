import { Divider, Tag } from "antd";
import { macbook } from "../../assets";
import InfoIcon from "@mui/icons-material/Info";
import { Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface IForm {
  bidAmount: number;
}
export default function SIngleBid() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log("data", data);
  };
  return (
    <div>
      <div className="w-full flex mb-3 justify-between items-center">
        <p className="text-lg text-EBD/Darkest font-semibold">Bid Details</p>
        <p className="text-lg font-bold leading-6 text-[#B94B72]">
          <span className="text-EBD/Darkest text-sm leading-[22px] font-medium mr-2">
            Time Remaining:
          </span>
          108h 54m 30s left
        </p>
      </div>
      <Divider />

      <div className="w-full flex justify-between gap-5 items-start">
        <div className="min-w-[19vw] h-[11rem]">
          <img src={macbook} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="w-[80vw]">
          <div>
            <p className="text-xl font-semibold leading-7">Bid Description</p>
            <p className="text-sm font-medium text-EBD/Darkest leading-[22px]">
              15 Pcs of the Apple M1 Pro 8-Core Chip.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold leading-7">Item Description</p>
            <p className="text-sm font-medium text-EBD/Darkest leading-8 w-[60%]  mt-3">
              The Apple M1 Pro 8-Core Chip. which provides the power and
              performance needed to handle your professional workflows. The
              14.2" Liquid Retina XDR display features a 3024 x 1964 <br />
              <br />
              resolution.It offers 8 cores from the 10 available in the chip
              divided in six performance cores (P-cores with 600 - 3220 MHz) and
              four power-efficiency cores (E-cores with 600 - 2064 MHz). These{" "}
              <br />
              <br />
              cores are similar to the cores in the Apple M1. The unified memory
              (16 or 32 GB LPDDR5-6400) next to the chip is connected by a 256
              bit memory controller and can also be used by the GPU and CPU.
            </p>
          </div>

          <div className="mt-6 flex justify-start items-center gap-12">
            <p className="font-semibold text-EBD/Darkest leading-6">Category</p>
            <div>
              <Tag className="bg-[#F0F0FF] text-EBD/Dark py-1 px-3">
                IT Solutions
              </Tag>
              <Tag className="bg-[#F0F0FF] text-EBD/Dark py-1 px-3">
                Furnitures
              </Tag>
              <Tag className="bg-[#F0F0FF] text-EBD/Dark py-1 px-3">
                Category
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <Divider />

      <div className="w-[57vw] flex justify-end">
        <div className="w-[65%]">
          <p className="text-md leading-6 text-EBD/Darkest ">
            Bid Requirements
          </p>
          <p className="text-xs mt-2 flex justify-start gap-1 items-center font-medium text-EBD/Medium leading-4">
            <InfoIcon
              sx={{
                fontSize: "16px",
              }}
            />
            Kindly check the product specifications that apply to the product
            you have for this bid.
          </p>

          <div className="w-[100%] mt-4">
            {[1, 2, 3, 4, 5].map((_term, i) => (
              <div
                key={i}
                className="flex justify-start gap-4 my-2 items-center w-full"
              >
                <div className="w-3 h-3 border border-[#142633]"></div>
                <p className="text-sm text-[#142633]">
                  Vendor must check this requirement for this Bid upon
                  availability
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xl font-semibold leading-8 py-4">
              My Bid Description
            </p>
          </div>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
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

              <Button
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
                Submit Bid
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
}
