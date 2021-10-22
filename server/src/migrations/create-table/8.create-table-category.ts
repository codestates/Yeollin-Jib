import category from "../../models/category";

console.log("======Create Table======");
const create_table_users = async () => {
  await category
    .sync({ force: true })
    .then(() => {
      console.log("✅Success Create Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_users();
