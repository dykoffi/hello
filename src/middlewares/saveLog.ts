import express from "express";
import onFinished from "on-finished";
import { httpRequestDurationMicroseconds } from "../utils/prometheus";

interface Options {
  excludePaths: RegExp[];
}

function isExcludePath(path: string, excludePaths: RegExp[]): boolean {
  let exclude: boolean = false;
  excludePaths.forEach((Epath) => {
    if (Epath.test(path)) exclude = true;
  });
  return exclude;
}

export default function (options: Options) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (!isExcludePath(req.path, options.excludePaths)) {
      const end = httpRequestDurationMicroseconds.startTimer();

      onFinished(res, async () => {
        end({ code: res.statusCode, route: req.baseUrl, method: req.method });
      });
    }
    next();
  };
}
