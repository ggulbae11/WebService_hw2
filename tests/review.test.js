import request from "supertest";
import app from "../src/app.js";
import { users } from "../src/data/users.data.js";
import { books } from "../src/data/books.data.js";
import { reviews } from "../src/data/review.data.js";
import jwt from "jsonwebtoken";

describe("Review API", () => {
  let userToken;
  let userId;
  let bookId;
  let reviewId;

  beforeAll(() => {
    // 테스트 데이터 초기화
    users.length = 0;
    books.length = 0;
    reviews.length = 0;

    users.push({
      id: 1,
      email: "user@test.com",
      password: "hashed",
      role: "USER"
    });

    books.push({
      id: 1,
      title: "Test Book",
      price: 10000
    });

    userId = 1;
    bookId = 1;

    userToken = jwt.sign(
      { id: userId, role: "USER" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  // =========================
  // CREATE REVIEW
  // =========================
  it("POST /api/reviews - 리뷰 생성 성공", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        bookId,
        rating: 5,
        content: "아주 좋은 책"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.review).toHaveProperty("id");
    expect(res.body.review.bookId).toBe(bookId);

    reviewId = res.body.review.id;
  });

  it("POST /api/reviews - 존재하지 않는 책이면 실패", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        bookId: 999,
        rating: 4,
        content: "실패 케이스"
      });

    expect(res.statusCode).toBe(404);
  });

  // =========================
  // GET REVIEWS BY BOOK
  // =========================
  it("GET /api/reviews/:bookId - 특정 책 리뷰 조회 성공", async () => {
    const res = await request(app)
      .get(`/api/reviews/${bookId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // =========================
  // UPDATE REVIEW
  // =========================
  it("PUT /api/reviews/:id - 리뷰 수정 성공", async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        rating: 4,
        content: "수정된 리뷰"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.review.rating).toBe(4);
    expect(res.body.review.content).toBe("수정된 리뷰");
  });

  it("PUT /api/reviews/:id - 토큰 없으면 실패", async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .send({ rating: 3 });

    expect(res.statusCode).toBe(401);
  });

  // =========================
  // DELETE REVIEW
  // =========================
  it("DELETE /api/reviews/:id - 리뷰 삭제 성공", async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/reviews/:id - 없는 리뷰면 실패", async () => {
    const res = await request(app)
      .delete("/api/reviews/999")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(404);
  });
});
