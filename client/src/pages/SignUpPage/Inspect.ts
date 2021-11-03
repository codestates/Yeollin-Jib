export default function Inspect(data: string, type: string): boolean {
  switch (type) {
    case "nickname":
      const nickname = /^([a-zA-Z0-9가-힣]){2,10}$/;
      // 2~10글자, 영어, 한글, 숫자만 가능
      return nickname.test(data);
    case "email":
      const email =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      return email.test(data);
    case "password":
      const password =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
      //최소 8자 및 최대 16자, 대문자 하나 이상, 소문자 하나 이상, 숫자 하나 이상, 특수 문자 하나 이상
      return password.test(data);
    default:
      return false;
  }
}
