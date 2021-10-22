import user_chatroom from "../../models/user_chatroom";

console.log("======Create Table======");
const create_table_users = async () => {
  await user_chatroom
    .sync({ force: true })
    .then(() => {
      console.log("✅Success Create Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_users();
