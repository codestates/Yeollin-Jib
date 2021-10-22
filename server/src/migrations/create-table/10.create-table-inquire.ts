import inquire from "../../models/inquire";

console.log("======Create Table======");
const create_table_users = async () => {
  await inquire
    .sync({ force: true })
    .then(() => {
      console.log("✅Success Create Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_users();
