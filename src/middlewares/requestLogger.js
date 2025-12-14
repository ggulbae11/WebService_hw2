export const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1_000_000;

    const log = {
      method,
      path: originalUrl,
      status: res.statusCode,
      latencyMs: Math.round(ms),

      ip: req.ip,
      userId: req.user?.id ?? null
    };

    console.log("[REQ]", JSON.stringify(log));
  });

  next();
};
