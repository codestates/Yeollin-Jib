import post_category from "../../models/post_category";

console.log("======Create Table======");
const create_table_users = async () => {
  await post_category
    .sync({ force: true })
    .then(() => {
      console.log("✅Success Create Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_users();
