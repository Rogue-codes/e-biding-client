import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  TextField,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LockIcon from "@mui/icons-material/Lock";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { user } from "../../assets";
import { Controller, useForm } from "react-hook-form";
import { useGetUserQuery, useUpdateUserMutation } from "../../api/auth.api";
import { IUser } from "../../interfaces/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { updateUserProfile } from "../../configs/authSlice";

export interface IForm {
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  phone: string;
  alternatePhone: string;
  RCNumber: string;
  postalCode: number;
  email: string;
}
export default function Profile() {
  const {
    control,
    formState: { isValid },
    setValue,
    handleSubmit,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {},
  });

  const user_: IUser = useSelector((state: any) => state.auth.user);

  const { data, isLoading } = useGetUserQuery({
    id: user_.id,
  });

  useEffect(() => {
    if (data?.data) {
      setValue("companyName", data?.data.companyName);
      setValue("firstName", data?.data.firstName);
      setValue("lastName", data?.data.lastName);
      setValue("companyAddress", data?.data.companyAddress);
      setValue("phone", data?.data.phone);
      setValue("alternatePhone", data?.data.alternatePhone);
      setValue("RCNumber", data?.data.RCNumber);
      setValue("postalCode", data?.data.postalCode);
      setValue("email", data?.data.email);
    }
  }, [data?.data]);

  const [
    updateUser,
    { data: updatedUser, isLoading: isUpdating, isSuccess: hasUpdated },
  ] = useUpdateUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (hasUpdated) {
      enqueueSnackbar(data?.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      dispatch(
        updateUserProfile({
          data: updatedUser?.data as IUser,
        })
      );
    }
  }, [hasUpdated]);

  const handleUserUpdate = (values: IForm) => {
    const { email, ...res } = values;
    updateUser({ payload: res, id: user_.id })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        Array.isArray(e?.data?.message)
          ? e?.data?.message.map((msg: string) => {
              enqueueSnackbar(msg, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            })
          : enqueueSnackbar(e?.data?.message, {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
      });
  };

  return (
    <div>
      <div>
        <p>My Profile</p>
      </div>

      <Divider />

      <div className="flex justify-between items-start py-8">
        <div className="flex justify-start items-end gap-4">
          <div className="w-[10.25rem] h-[10.25rem] border rounded-full">
            <img src={user} className="w-full h-full object-cover" alt="" />
          </div>
          <Button
            sx={{
              backgroundColor: "#3E4095",
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              color: "#fff",
              marginBottom: "12px",
              "&:hover": {
                backgroundColor: "#3E4095",
              },
            }}
          >
            <CameraAltOutlinedIcon />
            change
          </Button>
        </div>

        <div>
          <Button
            sx={{
              backgroundColor: "transparent",
              border: "solid 1px #3E4095",
              color: "#3E4095",
              marginBottom: "12px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <LockIcon /> Change password
          </Button>
          <Button
            sx={{
              backgroundColor: "transparent",
              border: "solid 1px #B94B72",
              color: "#B94B72",
              marginBottom: "12px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <PersonRemoveOutlinedIcon />
            Delete account
          </Button>
        </div>
      </div>

      <div className="w-[45%] p-5">
        {isLoading ? (
          <div className="w-full p-12 flex justify-center items-center">
            <CircularProgress
              sx={{
                color: "#fff",
              }}
              size={25}
            />
          </div>
        ) : (
          <form action="" onSubmit={handleSubmit(handleUserUpdate)}>
            <div className="w-full flex justify-between gap-4 items-center">
              <FormControl
                sx={{
                  width: "34vw",
                }}
              >
                <label
                  htmlFor=""
                  className="text-md font-medium leading-6 text-EBD/Darkest"
                >
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "first name is required",
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...fields}
                      variant="outlined"
                      placeholder="First Name"
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

              <FormControl
                sx={{
                  width: "34vw",
                }}
              >
                <label
                  htmlFor=""
                  className="text-md font-medium leading-6 text-EBD/Darkest"
                >
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: "last name is required",
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...fields}
                      variant="outlined"
                      placeholder="Last Name"
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
            </div>

            <FormControl
              sx={{
                width: "34vw",
                marginTop: "16px",
              }}
            >
              <label
                htmlFor=""
                className="text-md font-medium leading-6 text-EBD/Darkest"
              >
                Company Name
              </label>
              <Controller
                name="companyName"
                control={control}
                rules={{
                  required: "Company Name is required",
                }}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    {...fields}
                    variant="outlined"
                    placeholder="Company Name"
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

            <FormControl
              sx={{
                width: "34vw",
                marginTop: "16px",
              }}
            >
              <label
                htmlFor=""
                className="text-md font-medium leading-6 text-EBD/Darkest"
              >
                Company Address
              </label>
              <Controller
                name="companyAddress"
                control={control}
                rules={{
                  required: "name is required",
                }}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    {...fields}
                    variant="outlined"
                    placeholder="Company Address"
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

            <div className="w-full flex mt-4 gap-5 justify-between items-center">
              <FormControl
                sx={{
                  width: "34vw",
                }}
              >
                <label
                  htmlFor=""
                  className="text-md font-medium leading-6 text-EBD/Darkest"
                >
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "phone number is required",
                    pattern: {
                      value: /^0\d{10}$/,
                      message: "Invalid phone number format",
                    },
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...fields}
                      variant="outlined"
                      placeholder="Phone Number"
                      inputProps={{ "data-testid": "phone" }}
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

              <FormControl
                sx={{
                  width: "34vw",
                }}
              >
                <label
                  htmlFor=""
                  className="text-md font-medium leading-6 text-EBD/Darkest"
                >
                  Alternate Phone Number
                </label>
                <Controller
                  name="alternatePhone"
                  control={control}
                  rules={{
                    required: "Alternate Phone Number is required",
                    pattern: {
                      value: /^0\d{10}$/,
                      message: "Invalid phone number format",
                    },
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...fields}
                      variant="outlined"
                      placeholder="Alternate Phone Number"
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
            </div>

            <div className="w-full mt-4 flex gap-5 justify-between items-center">
              <FormControl
                sx={{
                  width: "34vw",
                }}
              >
                <label
                  htmlFor=""
                  className="text-md font-medium leading-6 text-EBD/Darkest"
                >
                  RC Number
                </label>
                <Controller
                  name="RCNumber"
                  control={control}
                  rules={{
                    required: "RC Number is required",
                    pattern: {
                      value: /^RC\d{8}$/,
                      message:
                        "Input must start with 'RC' and be followed by exactly 8 digits",
                    },
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...fields}
                      variant="outlined"
                      placeholder="RC Number"
                      inputProps={{ "data-testid": "phone" }}
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

              <FormControl
                sx={{
                  width: "34vw",
                }}
              >
                <label
                  htmlFor=""
                  className="text-md font-medium leading-6 text-EBD/Darkest"
                >
                  Postal Code
                </label>
                <Controller
                  name="postalCode"
                  control={control}
                  rules={{
                    required: "Postal Code is required",
                    pattern: {
                      value: /^\d{1,10}$/i,
                      message: "Postal code must be between 1 and 10 digits",
                    },
                  }}
                  render={({
                    field: { ref, ...fields },
                    fieldState: { error },
                  }) => (
                    <TextField
                      {...fields}
                      variant="outlined"
                      placeholder="Postal Code"
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
            </div>

            <FormControl
              sx={{
                width: "34vw",
                marginTop: "16px",
              }}
            >
              <label
                htmlFor=""
                className="text-md font-medium leading-6 text-EBD/Darkest"
              >
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email Address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    {...fields}
                    variant="outlined"
                    placeholder="Email Address"
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
              {isUpdating ? (
                <CircularProgress
                  sx={{
                    color: "#fff",
                  }}
                  size={25}
                />
              ) : (
                "Update Profile details"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
