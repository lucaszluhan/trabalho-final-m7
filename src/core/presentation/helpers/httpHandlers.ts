import { Response } from 'express';

export const ok = (res: Response, msg: string, data?: any) => {
   return res.status(200).send({
      ok: true,
      msg,
      data,
   });
};

export const serverError = (res: Response, msg: string, error?: any) => {
   return res.status(500).send({
      ok: false,
      msg,
      error,
   });
};

export const badRequest = (res: Response, reason?: string) => {
   return res.status(400).send({
      ok: false,
      reason,
   });
};
