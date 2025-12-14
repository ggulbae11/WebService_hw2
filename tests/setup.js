import app from "../src/app.js";
import request from "supertest";

export const api = request(app);

export const loginUser = async () => {
  const res = await api.post("/api/auth/login").send({
    email: "user1@test.com",
    password: "1234"
  });
  return res.body.token;
};

export const loginAdmin = async () => {
  const res = await api.post("/api/auth/login").send({
    email: "admin@test.com",
    password: "1234"
  });
  return res.body.token;
};
