import request from "supertest";
import app from "../src/app.js";
import { carts } from "../src/data/cart.data.js";

describe("Cart API", () => {
  let token;

  beforeAll(async () => {
    // 로그인해서 USER 토큰 확보
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user1@test.com",
        password: "1234"
      });

    token = res.body.token;
  });

  beforeEach(() => {
    // 각 테스트 전 장바구니 초기화
    carts.length = 0;
  });

  // =========================
  // GET /api/cart
  // =========================
  it("GET /api/cart - 장바구니가 없으면 빈 배열 반환", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  // =========================
  // POST /api/cart
  // =========================
  it("POST /api/cart - 장바구니에 상품 추가 성공", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bookId: 1,
        qty: 2
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("장바구니에 추가됨");
    expect(res.body.cart.items.length).toBe(1);
  });

  it("POST /api/cart - 인증 없으면 실패", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ bookId: 1, qty: 1 });

    expect(res.statusCode).toBe(401);
  });

  // =========================
  // PATCH /api/cart
  // =========================
  it("PATCH /api/cart - 장바구니 수량 수정 성공", async () => {
    // 먼저 담기
    await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId: 1, qty: 1 });

    const res = await request(app)
      .patch("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId: 1, qty: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items[0].qty).toBe(5);
  });

  // =========================
  // DELETE /api/cart
  // =========================
  it("DELETE /api/cart - 상품 제거 성공", async () => {
    await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId: 1, qty: 2 });

    const res = await request(app)
      .delete("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("장바구니에서 제거됨");
    expect(res.body.cart.items.length).toBe(0);
  });

  // =========================
  // DELETE /api/cart/clear
  // =========================
  it("DELETE /api/cart/clear - 장바구니 비우기 성공", async () => {
    await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ bookId: 1, qty: 1 });

    const res = await request(app)
      .delete("/api/cart/clear")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("장바구니 비워짐");
  });

  it("DELETE /api/cart/clear - 장바구니 없으면 실패", async () => {
    const res = await request(app)
      .delete("/api/cart/clear")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});
