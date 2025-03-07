import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ILoginForm } from "../../../interfaces/user.interface";
import { enqueueSnackbar } from "notistack";
import { useRegisterMutation } from "../../../api/auth.api";

interface IRegister {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setJustRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Register({
  setActiveTab,
  setJustRegistered,
}: IRegister) {
  const {
    control,
    formState: { isValid },
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      alternatePhone: "",
      companyName: "",
      companyAddress: "",
      RCNumber: "",
      postalCode: 0,
      CACDoc: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [creatingAuction, setCreatingAuction] = useState(false);

  console.log("first", isUploadSuccessful);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const renderAdornment = (type: string) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={
            type === "password"
              ? handleClickShowPassword
              : () => setShowConfirmPassword(!showConfirmPassword)
          }
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {type === "password" ? (
            showPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )
          ) : showConfirmPassword ? (
            <VisibilityOff />
          ) : (
            <Visibility />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  const renderPreAdornment = (type: string) => {
    return (
      <InputAdornment position="start">
        <IconButton aria-label="toggle password visibility" edge="end">
          {type === "user" ? <AccountCircleOutlinedIcon /> : <LockIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  const phoneNumber = watch("phone");
  const password = watch("password");

  const formval = watch();
  console.log("formval", formval);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      // List of acceptable image MIME types
      const imageTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!imageTypes.includes(file.type)) {
        message.error("Please select a valid image file.");
        return;
      }
      setValue("CACDoc", file);
    }
  };

  const [
    register,
    { data, isSuccess: isUserCreated },
  ] = useRegisterMutation();

  console.log("data", data);

  useEffect(() => {
    if (isUserCreated) {
      enqueueSnackbar(data?.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      sessionStorage.setItem("@EBD_USER", data?.data?.id);
      setJustRegistered(true);
      setActiveTab(0);
    }
  }, [isUserCreated]);

  const formVal = watch();

  const formData = new FormData();

  const handleImageUpload = async (): Promise<string | null> => {
    try {
      formData.append("file", formVal?.CACDoc);
      formData.append("upload_preset", "E-Biding"); // Correct the preset name

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/osuji/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const imgObj = await res.json();
      return imgObj.secure_url.toString();
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleRegistration = async (values: any) => {
    setCreatingAuction(true);
    let imageURL;

    try {
      imageURL = await handleImageUpload();
      setValue("CACDoc", imageURL, {
        shouldValidate: true,
      });
    } catch (error) {
      enqueueSnackbar("Image upload failed. Please try again.", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }

    try {
      await register({
        ...values,
        CACDoc: imageURL,
      }).unwrap();
      setCreatingAuction(false);
      reset();
    } catch (e: any) {
      setCreatingAuction(false);
      console.error(e);
      if (Array.isArray(e?.data?.message)) {
        e.data.message.map((message: any) => {
          enqueueSnackbar(message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
      } else {
        enqueueSnackbar(e?.data?.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
  };
  return (
    <div>
      <form
        action=""
        className="mt-16"
        onSubmit={handleSubmit(handleRegistration)}
      >
        <FormControl
          sx={{
            width: "100%",
          }}
        >
          <label htmlFor="" className="text-EBD/Darkest">
            Company Name
          </label>
          <Controller
            name="companyName"
            control={control}
            rules={{
              required: "Company name is required",
            }}
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                {...fields}
                variant="outlined"
                placeholder="e.g Imaginary Company Limited"
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
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <label htmlFor="" className="text-EBD/Darkest">
            Company Address
          </label>
          <Controller
            name="companyAddress"
            control={control}
            rules={{
              required: "Company Address is required",
            }}
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                {...fields}
                type="text"
                variant="outlined"
                placeholder="e.g Imaginary Company Limited"
                inputProps={{ "data-testid": "firstname" }}
                fullWidth
                inputRef={ref}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  color: fields.value && !error ? "success" : undefined,
                }}
              />
            )}
          />
        </FormControl>

        <div className="w-full flex justify-between items-center">
          <FormControl
            sx={{
              width: "48%",
              marginTop: "2rem",
            }}
          >
            <label htmlFor="" className="text-EBD/Darkest">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z]+([ A-Za-z'-][A-Za-z]*)*$/,
                  message: "Invalid name format",
                },
              }}
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  {...fields}
                  type="text"
                  variant="outlined"
                  placeholder="e.g John"
                  inputProps={{ "data-testid": "firstname" }}
                  fullWidth
                  inputRef={ref}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    color: fields.value && !error ? "success" : undefined,
                  }}
                  error={Boolean(error?.message)}
                  FormHelperTextProps={{
                    sx: {
                      color: "red",
                    },
                  }}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>

          <FormControl
            sx={{
              width: "48%",
              marginTop: "2rem",
            }}
          >
            <label htmlFor="" className="text-EBD/Darkest">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z]+([ A-Za-z'-][A-Za-z]*)*$/,
                  message: "Invalid name format",
                },
              }}
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  {...fields}
                  type="text"
                  variant="outlined"
                  placeholder="e.g Doe"
                  inputProps={{ "data-testid": "firstname" }}
                  fullWidth
                  inputRef={ref}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    color: fields.value && !error ? "success" : undefined,
                  }}
                  error={Boolean(error?.message)}
                  FormHelperTextProps={{
                    sx: {
                      color: "red",
                    },
                  }}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>
        </div>

        <div className="w-full flex justify-between items-center">
          <FormControl
            sx={{
              width: "48%",
              marginTop: "2rem",
            }}
          >
            <label htmlFor="" className="text-EBD/Darkest">
              Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
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
                  type="text"
                  variant="outlined"
                  placeholder="e.g 080 xxxx xxxx"
                  inputProps={{ "data-testid": "firstname" }}
                  fullWidth
                  inputRef={ref}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    color: fields.value && !error ? "success" : undefined,
                  }}
                  error={Boolean(error?.message)}
                  FormHelperTextProps={{
                    sx: {
                      color: "red",
                    },
                  }}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>

          <FormControl
            sx={{
              width: "48%",
              marginTop: "2rem",
            }}
          >
            <label htmlFor="" className="text-EBD/Darkest">
              Alternate Phone Number
            </label>
            <Controller
              name="alternatePhone"
              control={control}
              rules={{
                required: "Alternate Phone number is required",
                pattern: {
                  value: /^0\d{10}$/,
                  message: "Invalid phone number format",
                },
                validate: (value) =>
                  value !== phoneNumber ||
                  "Alternate number cannot be the same as the phone number",
              }}
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  {...fields}
                  type="text"
                  variant="outlined"
                  placeholder="e.g 080 xxxx xxxx"
                  inputProps={{ "data-testid": "firstname" }}
                  fullWidth
                  inputRef={ref}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    color: fields.value && !error ? "success" : undefined,
                  }}
                  error={Boolean(error?.message)}
                  FormHelperTextProps={{
                    sx: {
                      color: "red",
                    },
                  }}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>
        </div>

        <div className="w-full flex justify-between items-center">
          <FormControl
            sx={{
              width: "48%",
              marginTop: "2rem",
            }}
          >
            <label htmlFor="" className="text-EBD/Darkest">
              RC Number
            </label>
            <Controller
              name="RCNumber"
              control={control}
              rules={{
                pattern: {
                  value: /^RC\d{8}$/,
                  message:
                    "Input must start with 'RC' and be followed by exactly 8 digits",
                },
                required: "RC Number is required",
                minLength: {
                  value: 10,
                  message: "RC Number must be 10 characters",
                },
                maxLength: {
                  value: 10,
                  message: "RC Number must be 10 characters",
                },
              }}
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  {...fields}
                  type="text"
                  variant="outlined"
                  placeholder="e.g RC/BN xxxxxx"
                  inputProps={{ "data-testid": "firstname" }}
                  fullWidth
                  inputRef={ref}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    color: fields.value && !error ? "success" : undefined,
                  }}
                  error={Boolean(error?.message)}
                  FormHelperTextProps={{
                    sx: {
                      color: "red",
                    },
                  }}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>

          <FormControl
            sx={{
              width: "48%",
              marginTop: "2rem",
            }}
          >
            <label htmlFor="" className="text-EBD/Darkest">
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
                minLength: {
                  value: 10,
                  message: "RC Number must be 10 characters",
                },
                maxLength: {
                  value: 10,
                  message: "RC Number must be 10 characters",
                },
              }}
              render={({
                field: { ref, ...fields },
                fieldState: { error },
              }) => (
                <TextField
                  {...fields}
                  type="text"
                  variant="outlined"
                  placeholder="e.g xxxxxx"
                  inputProps={{ "data-testid": "firstname" }}
                  fullWidth
                  inputRef={ref}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    color: fields.value && !error ? "success" : undefined,
                  }}
                  error={Boolean(error?.message)}
                  FormHelperTextProps={{
                    sx: {
                      color: "red",
                    },
                  }}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>
        </div>

        <FormControl
          sx={{
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <label htmlFor="" className="text-EBD/Darkest">
            Email Address
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
              required: "email is required",
            }}
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                {...fields}
                type="email"
                variant="outlined"
                placeholder="e.g @imaginarycompanylimited.com"
                inputProps={{ "data-testid": "firstname" }}
                fullWidth
                inputRef={ref}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  color: fields.value && !error ? "success" : undefined,
                }}
                error={Boolean(error?.message)}
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            // alignSelf: "center",
            width: "100%",
            marginTop: "1rem !important",
          }}
        >
          <Controller
            name="CACDoc"
            control={control}
            rules={{
              required: "A csv file is required",
            }}
            render={() => (
              <TextField
                type="file"
                onChange={handleFileChange}
                className="w-full h-10"
              />
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <label htmlFor="" className="text-EBD/Darkest">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\\|-]).{6,}$/,
                message:
                  "Password must be at least 6 characters long, with at least one uppercase letter, one number, and one special character",
              },
            }}
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                {...fields}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Enter password"
                inputProps={{ "data-testid": "firstname" }}
                fullWidth
                inputRef={ref}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  color: fields.value && !error ? "success" : undefined,
                  endAdornment: renderAdornment("password"),
                  startAdornment: renderPreAdornment("password"),
                }}
                error={Boolean(error?.message)}
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>

        <FormControl
          sx={{
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <label htmlFor="" className="text-EBD/Darkest">
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\\|-]).{6,}$/,
                message:
                  "Password must be at least 6 characters long, with at least one uppercase letter, one number, and one special character",
              },
              validate: (value) =>
                value === password ||
                "Confirm Password must be the same as the Password",
            }}
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                {...fields}
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Enter password"
                inputProps={{ "data-testid": "firstname" }}
                fullWidth
                inputRef={ref}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  color: fields.value && !error ? "success" : undefined,
                  endAdornment: renderAdornment("confirmPassword"),
                  startAdornment: renderPreAdornment("password"),
                }}
                error={Boolean(error?.message)}
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>

        <Button
          style={{
            background: "#3E4095",
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: "2rem",
            color: "#fff",
            fontWeight: 600,
          }}
          type="submit"
          variant="contained"
          className="w-full bg-EBD-Primary disabled:opacity-50"
          disabled={!isValid || creatingAuction}
        >
          {creatingAuction ? (
            <CircularProgress
              sx={{
                color: "white",
              }}
              size={15}
            />
          ) : (
            "login"
          )}
        </Button>
      </form>
    </div>
  );
}
