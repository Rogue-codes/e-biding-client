import { useState, useEffect } from "react";

const CountdownTimer = ({
  startDate,
  endDate,
  className,
}: {
  startDate: any;
  endDate: any;
  className?: string;
}) => {
  const calculateTimeLeft = () => {
    // const _start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const diffMs = end - now;
    if (diffMs <= 0) {
      return "00d 00h 00m 00s";
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${String(diffDays).padStart(2, "0")}d ${String(diffHours).padStart(
      2,
      "0"
    )}h ${String(diffMinutes).padStart(2, "0")}m ${String(diffSeconds).padStart(
      2,
      "0"
    )}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <p
      className={`${
        timeLeft === "00d 00h 00m 00s" ? "text-EBD/Error" : "text-EBD/Success"
      } text-xs font-semibold ${className}`}
    >
      {timeLeft === "00d 00h 00m 00s" ? "CLOSED" : timeLeft}
    </p>
  );
};

export default CountdownTimer;
