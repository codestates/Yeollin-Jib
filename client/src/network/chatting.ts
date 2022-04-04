export default class ChatService {
  // constructor(http, accessToken, socket) {
  //   this.http = http;
  //   this.accessToken = accessToken;
  //   this.socket = socket;
  // }
  // async getchat(nickname) {
  //   const query = nickname ? `?nickname=${nickname}` : '';
  //   return this.http.fetch(`/chat${query}`, {
  //     method: 'GET',
  //     headers: this.getHeaders(),
  //   });
  // }
  // getHeaders() {
  //   const token = this.accessToken.getToken();
  //   return {
  //     Authorization: `Bearer ${token}`,
  //   };
  // }
  // onSync(callback) {
  //   return this.socket.onSync('chat', callback);
  // }
}
