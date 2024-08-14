import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { Links } from "../../constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { paths } from "../../routes/paths";
import { IUser } from "../../interfaces/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../configs/authSlice";
import React from "react";
export default function Nav() {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(paths.PROFILE);
    handleClose();
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(paths.LOGIN);
    handleClose();
  };

  const user: IUser = useSelector((state: any) => state.auth.user);

  return (
    <nav className="w-full border shadow fixed top-0 left-0 z-[900] bg-white py-5">
      <div className="e_biding_container flex justify-between items-center">
        <div>
          <img src={logo} alt="" />
        </div>

        <div className="flex justify-between gap-8 items-center ">
          {Links.map((link) => (
            <Link
              to={!user?.isActive || !user?.isVerified ? "/" : link.link}
              key={link.link}
            >
              <div
                className={`${
                  location.pathname === link.link &&
                  "border-b-2 border-EBD-Primary"
                }`}
              >
                <p
                  className={`${
                    location.pathname === link.link
                      ? "text-EBD-Primary border-EBD-Primary"
                      : " text-EBD/Medium"
                  } text-md leading-6 font-semibold`}
                >
                  {link.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: "transparent",
            border: "solid 1px #DADBF2",
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            color: "#505173",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          className=" rounded-lg h-10 border border-b-EBD/Light flex justify-between items-center px-2"
        >
          <div className="w-6 h-6 rounded-full border border-black"></div>
          <p className="text-md text-EBD/Dark font-medium">
            {user.firstName} {user.lastName}
          </p>
          <ExpandMoreIcon />
        </Button>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={navigateToProfile}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {" "}
          <AccountCircleOutlinedIcon /> My Profile
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "12px",
            alignItems: "center",
          }}
          onClick={handleLogout}
        >
          <LogoutOutlinedIcon
            sx={{
              transform: "rotate(180deg)",
            }}
          />{" "}
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
}
