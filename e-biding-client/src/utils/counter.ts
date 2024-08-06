export const countdown = (seconds: number) => {
  let counter = seconds;

  const interval = setInterval(() => {
    console.log(`${counter} second(s) remaining`);

    counter--;

    if (counter < 0) {
      clearInterval(interval);
      console.log("Time's up!");
    }
  }, 1000);

  return counter;
};
