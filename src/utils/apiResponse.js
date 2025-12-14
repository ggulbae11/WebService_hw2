export const ok = (res, data) => {
  return res.json({ success: true, data });
};

export const created = (res, data) => {
  return res.status(201).json({ success: true, data });
};
