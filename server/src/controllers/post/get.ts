import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
  console.log(req);
};
export default get;
