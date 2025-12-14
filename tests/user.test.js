import request from "supertest";
import app from "../src/app.js";
import { users } from "../src/data/users.data.js";

describe("User API", () => {
  let userToken;
  let adminToken;
  let createdUserId;

  beforeAll(async () => {
    // USER 로그인
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user1@test.com",
        password: "1234"
      });

    userToken = userLogin.body.token;

    // ADMIN 로그인
    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "1234"
      });

    adminToken = adminLogin.body.token;
  });

  // ============================
  // REGISTER
  // ============================
  it("POST /api/users - 회원가입 성공", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@test.com",
        password: "1234",
        role: "USER"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("newuser@test.com");

    createdUserId = res.body.user.id;
  });

  it("POST /api/users - 이메일 중복이면 실패", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        email: "user1@test.com",
        password: "1234"
      });

    expect(res.statusCode).toBe(409);
  });

  // ============================
  // GET ME
  // ============================
  it("GET /api/users/me - 내 정보 조회 성공", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("email");
  });

  it("GET /api/users/me - 토큰 없으면 실패", async () => {
    const res = await request(app).get("/api/users/me");
    expect(res.statusCode).toBe(401);
  });

  // ============================
  // ADMIN ONLY
  // ============================
  it("GET /api/users - ADMIN 전체 조회 성공", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/users - USER 권한이면 실패", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("GET /api/users/:id - ADMIN 단일 조회 성공", async () => {
    const res = await request(app)
      .get(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdUserId);
  });

  // ============================
  // UPDATE
  // ============================
  it("PATCH /api/users/:id - ADMIN 수정 성공", async () => {
    const res = await request(app)
      .patch(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "updated@test.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/수정/);
  });

  // ============================
  // ACTIVATE / DEACTIVATE
  // ============================
  it("PATCH /api/users/:id/deactivate - ADMIN 유저 정지", async () => {
    const res = await request(app)
      .patch(`/api/users/${createdUserId}/deactivate`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.active).toBe(false);
  });

  it("PATCH /api/users/:id/activate - ADMIN 유저 활성화", async () => {
    const res = await request(app)
      .patch(`/api/users/${createdUserId}/activate`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.active).toBe(true);
  });

  // ============================
  // DELETE
  // ============================
  it("DELETE /api/users/:id - ADMIN 삭제 성공", async () => {
    const res = await request(app)
      .delete(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/users/me - 회원 탈퇴 성공", async () => {
    const res = await request(app)
      .delete("/api/users/me")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
  });
});
