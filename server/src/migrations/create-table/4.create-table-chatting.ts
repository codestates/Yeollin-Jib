import chatting from "../../models/chatting";

console.log("======Create Table======");
const create_table_users = async () => {
  await chatting
    .sync({ force: true })
    .then(() => {
      console.log("✅Success Create Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_users();
