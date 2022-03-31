import * as fs from "fs";
import * as path from "path";
import { exec, execFile } from "child_process";
import * as util from "util";
console.log("migration-all-table");

const asyncExec = util.promisify(exec); //!!!!!중요!!!

console.log(`
    --------------------------------------
    +++Laggard Project Migration Start+++
    --------------------------------------
`);

let migrationAllTable = async () => {
  let migrationFiles: string[] = [];

  fs.readdir(path.join(__dirname, "/", "create-table"), async (err, files) => {
    if (err) console.log("err : ", err);
    if (files) {
      files.forEach((el) => {
        // console.log(el.substr(el.indexOf('.')+1,12));
        if (el.slice(-3) === ".js" || el.slice(-3) === ".ts") {
          migrationFiles.push(el);
        }
      });

      migrationFiles.sort((a, b) => {
        return (
          Number(a.substr(0, a.indexOf("."))) -
          Number(b.substr(0, b.indexOf(".")))
        );
      });
      console.log("migrationFiles : ", migrationFiles);

      for (let el of migrationFiles) {
        console.log("Migration File Name : ", el);

        const { stdout, stderr } = await asyncExec(
          `./node_modules/.bin/ts-node "${__dirname}/create-table/${el}"`,
        );
        if (stdout) console.log(stdout);
        if (stderr) console.error("Std Err : ", stderr);
      }
    }
  });
};

migrationAllTable();
