import { Button, Divider } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LockIcon from "@mui/icons-material/Lock";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { user } from "../../assets";
export default function Profile() {
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
            <PersonRemoveOutlinedIcon/>
               Delete account
          </Button>
        </div>
      </div>

      <div className="w-[70%] p-5 border border-EBD/Darkest">

      </div>
    </div>
  );
}
