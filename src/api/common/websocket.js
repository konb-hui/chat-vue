import { webSocket } from "rxjs/webSocket";

let webSocketInstance = null;

export function createWebSocket(name) {
  if (!webSocketInstance) {
    webSocketInstance = webSocket(`wss://chat-konb.up.railway.app/chat?name=${name}`);
  }
  webSocketInstance.onopen = function(event) {
    console.log
  };
  return webSocketInstance;
}

export function subscribeToChat(onMessageReceived, name) {
  const ws = createWebSocket(name);
  ws.subscribe(
    data => onMessageReceived(data),
    err => console.error(err),
    () => console.log("WebSocket closed")
  );
}
