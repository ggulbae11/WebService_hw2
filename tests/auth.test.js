import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  describe("POST /api/auth/login", () => {
    it("정상 로그인 시 토큰을 반환한다", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "user1@test.com",
          password: "1234"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toBe("string");
    });

    it("존재하지 않는 유저면 400을 반환한다", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "notexist@test.com",
          password: "1234"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/유저/);
    });

    it("비밀번호가 틀리면 400을 반환한다", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "user1@test.com",
          password: "wrongpassword"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("POST /api/auth/refresh", () => {
    it("유효한 refreshToken으로 accessToken을 재발급한다", async () => {
      // 1️⃣ 로그인
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
          email: "user1@test.com",
          password: "1234"
        });

      const refreshToken = loginRes.body.refreshToken;
      expect(refreshToken).toBeDefined();

      // 2️⃣ refresh
      const refreshRes = await request(app)
        .post("/api/auth/refresh")
        .send({
          refreshToken
        });

      expect(refreshRes.statusCode).toBe(200);
      expect(refreshRes.body).toHaveProperty("accessToken");
    });
  });
});
