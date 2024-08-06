import { useEffect, useState } from "react";
import Register from "./forms/Register";
import Login from "./forms/Login";
import { Alert, CircularProgress, Modal } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import OtpInput from "../../components/otp/Otp";
import { useResendOTPMutation, useVerifyOTPMutation } from "../../api/auth.api";
import { enqueueSnackbar } from "notistack";

export default function Auth() {
  const tabArr = ["Login", "Register"];
  const [activeTab, setActiveTab] = useState(0);
  const [justRegistered, setJustRegistered] = useState(false);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (justRegistered) {
      setCounter(60);
      const id = sessionStorage.getItem("@EBD_USER")
        ? JSON.parse(sessionStorage.getItem("@EBD_USER")!)
        : null;
      if (id) {
        setId(id);
      }
    }
  }, [justRegistered]);

  useEffect(() => {
    if (counter && counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => (prevCounter ? prevCounter - 1 : 0));
      }, 1000);

      // Clear the interval when the component is unmounted or the counter changes
      return () => clearInterval(timer);
    }
  }, [counter]);

  const [verify, { isLoading, isSuccess, data }] = useVerifyOTPMutation();
  const [resendOtp, { isLoading: resendingOtp, isSuccess: isOtpSent }] =
    useResendOTPMutation();

  useEffect(() => {
    if (isSuccess) {
      setJustRegistered(false);
      setActiveTab(0);
      enqueueSnackbar(data?.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isOtpSent) {
      setCounter(60);
      enqueueSnackbar("OTP sent check your email", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [isOtpSent]);

  const onChange = (value: string) => setOtp(value);

  const handleVerify = () => {
    verify({ token: otp, userId: id as number })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(e?.data?.message[0], {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  const handleResendOTP = () => {
    resendOtp({ userId: id as number })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(e?.data?.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  useEffect(() => {
    if (otp.length > 5) {
      handleVerify();
    }
  }, [otp]);

  return (
    <div className="w-full">
      {justRegistered && (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
          className="w-[50%] mx-auto mt-2"
        >
          Thank you for creating an account with us. Your registration was
          successful. Please allow us a few hours to review and confirm your
          details to ensure they meet our criteria. Once your account has been
          approved and verified, you will be able to start placing bids on our
          platform. We appreciate your patience and look forward to your
          participation. Thank you,
        </Alert>
      )}

      <div className="w-full flex justify-center items-center">
        <div className="w-[40vw] p-6 mt-[10rem] rounded-xl shadow-sm min-h-[25rem] border">
          <div className="flex justify-start items-center gap-5">
            {tabArr.map((item, index) => (
              <p
                className={`${
                  activeTab === index
                    ? "border-b-2 border-EBD-Primary font-bold"
                    : "font-semibold"
                } text-EBD-Primary text-lg cursor-pointer`}
                onClick={() => {
                  setActiveTab(index);
                  setJustRegistered(false);
                }}
              >
                {item}
              </p>
            ))}
          </div>

          <div>
            {activeTab === 0 ? (
              <Login />
            ) : (
              <Register
                setJustRegistered={setJustRegistered}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        open={justRegistered}
        onClose={() => setJustRegistered(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="w-[30%] bg-white flex-col gap-8 p-12 rounded-xl shadow-md border flex justify-center items-center">
          <p className="text-EBD-Primary font-semibold text-lg">Verify OTP</p>
          {isLoading ? (
            <CircularProgress
              sx={{
                color: "#3E4095",
              }}
              size={25}
            />
          ) : (
            <OtpInput value={otp} valueLength={6} onChange={onChange} />
          )}
          {counter && counter > 0 ? (
            !resendingOtp ? (
              <p>Didn`t get code ?Resend in {counter}</p>
            ) : (
              <CircularProgress
                sx={{
                  color: "#3E4095",
                }}
                size={15}
              />
            )
          ) : (
            <p className="py-1 text-sm font-semibold leading-5  text-EBD-Primary cursor-pointer">
              Didn`t get code ?{" "}
              <span className="underline" onClick={handleResendOTP}>
                Resend
              </span>
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
