import request from "supertest";
import app from "../src/app.js";
import { carts } from "../src/data/cart.data.js";
import { orders } from "../src/data/order.data.js";

describe("Order API", () => {
  let userToken;

  beforeAll(async () => {
    // 로그인 → 토큰 획득
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user1@test.com",
        password: "1234"
      });

    userToken = loginRes.body.token;
  });

  beforeEach(() => {
    // 테스트 간 상태 초기화
    carts.length = 0;
    orders.length = 0;
  });

  describe("POST /api/orders", () => {
    it("장바구니가 비어있으면 주문 생성 실패", async () => {
      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.code).toBe("EMPTY_CART");
    });

    it("장바구니가 있으면 주문 생성 성공", async () => {
      // 장바구니에 상품 추가
      await request(app)
        .post("/api/cart")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ bookId: 1, qty: 2 });

      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("order");
      expect(res.body.order.items.length).toBe(1);
    });
  });

  describe("GET /api/orders", () => {
    it("내 주문 목록 조회 성공", async () => {
      // 주문 하나 생성
      await request(app)
        .post("/api/cart")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ bookId: 1, qty: 1 });

      await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userToken}`);

      const res = await request(app)
        .get("/api/orders")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /api/orders/:id", () => {
    it("주문 상세 조회 성공", async () => {
      // 주문 생성
      await request(app)
        .post("/api/cart")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ bookId: 1, qty: 1 });

      const orderRes = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userToken}`);

      const orderId = orderRes.body.order.id;

      const res = await request(app)
        .get(`/api/orders/${orderId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", orderId);
    });

    it("존재하지 않는 주문이면 실패", async () => {
      const res = await request(app)
        .get("/api/orders/999")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.code).toBe("MISSING_ORDER");
    });
  });

  describe("DELETE /api/orders/:id", () => {
    it("주문 취소 성공", async () => {
      // 주문 생성
      await request(app)
        .post("/api/cart")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ bookId: 1, qty: 1 });

      const orderRes = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userToken}`);

      const orderId = orderRes.body.order.id;

      const res = await request(app)
        .delete(`/api/orders/${orderId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.order.status).toBe("CANCELLED");
    });

    it("내 주문이 아니면 취소 실패", async () => {
      const res = await request(app)
        .delete("/api/orders/999")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.code).toBe("MISSING_ORDER");
    });
  });
});
