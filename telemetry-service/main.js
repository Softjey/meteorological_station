import { io } from "socket.io-client";

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000";
const TIME_INTERVAL = process.env.TIME_INTERVAL ?? 1000;

const socket = io(SERVER_URL);

const generateRandomDataFromSensors = () => {
  const temperature = Math.random() * 100;
  const humidity = Math.random() * 100;
  const timestamp = new Date().toISOString();

  return { temperature, humidity, timestamp };
};

socket.on("connect", () => {
  console.log(`Connected to server at ${SERVER_URL}`);

  const interval = setInterval(() => {
    const data = generateRandomDataFromSensors();

    socket.emit("telemetry-data", data);
  }, TIME_INTERVAL);

  socket.on("disconnect", () => {
    clearInterval(interval);

    console.log("Disconnected from server");
  });
});

socket.io.on("error", (error) => {
  console.error(`Error: ${error.message}`);
});

socket.on("exception", (exception) => {
  console.error(`Exception: ${exception?.message}`);
})
