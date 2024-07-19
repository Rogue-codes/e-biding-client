import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="w-full bg-EBD/Lightest p-5 flex justify-between items-center">
      <div>
        <h1 className="text-xl text-EBD/Dark leading-8 font-semibold">
          Welcome, Wale!
        </h1>
        <p className="text-md text-EBD/Dark leading-6">
          See how your bids are doing.
        </p>
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#3E4095",
          "&:hover": {
            backgroundColor: "#3E4095",
          },
        }}
      >
        Place A bid
      </Button>
    </div>
  );
}
