"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const util = __importStar(require("util"));
console.log("migration-all-table");
const asyncExec = util.promisify(child_process_1.exec); //!!!!!중요!!!
console.log(`
    --------------------------------------
    +++Laggard Project Migration Start+++
    --------------------------------------
`);
let migrationAllTable = () => __awaiter(void 0, void 0, void 0, function* () {
    let migrationFiles = [];
    fs.readdir(path.join(__dirname, "/", "create-table"), (err, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            console.log("err : ", err);
        if (files) {
            files.forEach((el) => {
                // console.log(el.substr(el.indexOf('.')+1,12));
                if (el.substr(el.indexOf(".") + 1, 12) === "create-table") {
                    migrationFiles.push(el);
                }
            });
            migrationFiles.sort((a, b) => {
                return Number(a.substr(0, a.indexOf("."))) - Number(b.substr(0, b.indexOf(".")));
            });
            console.log("migrationFiles : ", migrationFiles);
            for (let el of migrationFiles) {
                console.log("Migration File Name : ", el);
                const { stdout, stderr } = yield asyncExec(`./node_modules/.bin/ts-node "${__dirname}/create-table/${el}"`);
                if (stdout)
                    console.log(stdout);
                if (stderr)
                    console.error("Std Err : ", stderr);
            }
        }
    }));
});
migrationAllTable();
//# sourceMappingURL=migration-all-table.js.map