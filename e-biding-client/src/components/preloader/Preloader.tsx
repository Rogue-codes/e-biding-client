import { CircularProgress } from "@mui/material";

export default function Preloader() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <CircularProgress />
    </div>
  )
}
