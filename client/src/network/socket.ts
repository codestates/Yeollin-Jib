import socket from "socket.io-client";

export default class Socket {
  io;
  constructor(baseURL: string, getAccessToken: string) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken }),
    });

    this.io.on("connect_error", (err) => {
      console.log("socket error", err.message);
    });
  }

  onSync(event: any, callback: any) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message: string) => callback(message));
    return () => this.io.off(event);
  }
}
