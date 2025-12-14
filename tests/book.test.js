import request from "supertest";
import app from "../src/app.js";
import { books } from "../src/data/books.data.js";
import jwt from "jsonwebtoken";

describe("Book API", () => {
  let userToken;
  let adminToken;

  beforeAll(() => {
    // USER 토큰
    userToken = jwt.sign(
      { id: 1, role: "USER" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ADMIN 토큰
    adminToken = jwt.sign(
      { id: 2, role: "ADMIN" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  describe("GET /api/books", () => {
    it("도서 목록 조회 성공", async () => {
      const res = await request(app).get("/api/books");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("content");
      expect(Array.isArray(res.body.content)).toBe(true);
    });

    it("검색 기능(keyword) 정상 동작", async () => {
      const res = await request(app)
        .get("/api/books")
        .query({ keyword: "java" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("content");
    });

    it("페이지네이션 정상 동작", async () => {
      const res = await request(app)
        .get("/api/books")
        .query({ page: 1, size: 2 });

      expect(res.statusCode).toBe(200);
      expect(res.body.size).toBe(2);
    });
  });

  describe("GET /api/books/:id", () => {
    it("도서 단일 조회 성공", async () => {
      const bookId = books[0].id;

      const res = await request(app).get(`/api/books/${bookId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", bookId);
    });

    it("존재하지 않는 도서면 404", async () => {
      const res = await request(app).get("/api/books/99999");

      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/books", () => {
    it("ADMIN 도서 생성 성공", async () => {
      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          title: "테스트 책",
          author: "홍길동",
          description: "설명",
          price: 20000
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("book");
      expect(res.body.book).toHaveProperty("title", "테스트 책");
    });

    it("USER 권한이면 생성 실패", async () => {
      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "권한 없는 생성",
          price: 10000
        });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("PATCH /api/books/:id", () => {
    it("ADMIN 도서 수정 성공", async () => {
      const bookId = books[0].id;

      const res = await request(app)
        .patch(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          title: "수정된 제목"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.book.title).toBe("수정된 제목");
    });

    it("존재하지 않는 도서 수정 시 404", async () => {
      const res = await request(app)
        .patch("/api/books/99999")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ title: "X" });

      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/books/:id", () => {
    it("ADMIN 도서 삭제 성공", async () => {
      const newBookId = books[books.length - 1].id;

      const res = await request(app)
        .delete(`/api/books/${newBookId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/삭제/);
    });

    it("USER 권한이면 삭제 실패", async () => {
      const bookId = books[0].id;

      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
    });
  });
});
