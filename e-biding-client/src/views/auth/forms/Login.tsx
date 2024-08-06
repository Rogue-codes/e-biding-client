import { Visibility, VisibilityOff } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../configs/authSlice";
import { IUser } from "../../../interfaces/user.interface";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const renderAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  const renderPreAdornment = (type: string) => {
    return (
      <InputAdornment position="start">
        <IconButton aria-label="toggle password visibility" edge="end">
          {type === "user" ? (
            <MailOutlineIcon
              sx={{
                color: "#3E4095",
              }}
            />
          ) : (
            <LockIcon
              sx={{
                color: "#3E4095",
              }}
            />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  const [login, { isLoading, isSuccess, data }] = useLoginMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(data?.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      dispatch(
        loginUser({
          data: data?.data?.user as IUser,
          access_token: data?.data?.access_token as string,
        })
      );
    }
  }, [isSuccess]);

  console.log("first", data);

  const handleLogin = (values: ILoginForm) => {
    login({ email: values.email, password: values.password })
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

  return (
    <div>
      <form action="" className="mt-16" onSubmit={handleSubmit(handleLogin)}>
        <FormControl
          sx={{
            width: "100%",
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { ref, ...fields }, fieldState: { error } }) => (
              <TextField
                {...fields}
                variant="outlined"
                placeholder="Enter Email Address"
                inputProps={{ "data-testid": "firstname" }}
                fullWidth
                inputRef={ref}
                InputProps={{
                  color: fields.value && !error ? "success" : undefined,
                  startAdornment: renderPreAdornment("user"),
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
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
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
                  endAdornment: renderAdornment(),
                  startAdornment: renderPreAdornment("password"),
                }}
              />
            )}
          />
        </FormControl>
        <p className="py-1 text-sm font-semibold leading-5 underline text-EBD-Primary cursor-pointer">
          Forgot Password
        </p>

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
          disabled={!isValid}
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: "#fff",
              }}
              size={25}
            />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}
