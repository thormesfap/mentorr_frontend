import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;
let baseUrl = import.meta.env.VITE_API_URL || window.RUNTIME_CONFIG?.API_URL;
const pattern = new RegExp("(?:https?://)?([^:/]+)");
const matches = pattern.exec(baseUrl);


const echo = new Echo({
  broadcaster: "reverb",
  key: "chdkrvlko9wxzqz62k52",
  wsHost: matches[1],
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  enabledTransports: ["ws", "wss"],
});

export default echo;