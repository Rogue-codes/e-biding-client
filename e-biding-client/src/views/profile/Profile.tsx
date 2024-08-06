import { Button, Divider, FormControl, TextField } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LockIcon from "@mui/icons-material/Lock";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { user } from "../../assets";
import { Controller, useForm } from "react-hook-form";

interface IForm {
  name: string;
  companyName: string;
  CompanyAddress: string;
  phone: string;
  alternatePhone: string;
  RCNumber: string;
  postalCode: string;
  email: string;
}
export default function Profile() {
  const { control, formState:{isValid} } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {},
  });
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
        <form action="">
          <FormControl
            sx={{
              width: "34vw",
            }}
          >
            <label
              htmlFor=""
              className="text-md font-medium leading-6 text-EBD/Darkest"
            >
              Full Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "name is required",
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
              Company Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Company Name is required",
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
              name="CompanyAddress"
              control={control}
              rules={{
                required: "name is required",
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
                name="phone"
                control={control}
                rules={{
                  required: "RC Number is required",
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
                name="alternatePhone"
                control={control}
                rules={{
                  required: "Postal Code is required",
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
            Update Profile details
          </Button>
        </form>
      </div>
    </div>
  );
}
