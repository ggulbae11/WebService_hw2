BookStore API Server

1. 실행 방법

node -v
npm -v
npm install

2. 환경변수 설명
#.env.example
   PORT=3000

   JWT_SECRET=your_access_token_secret
   REFRESH_SECRET=your_refresh_token_secret

   JWT_EXPIRES_IN=1h

   NODE_ENV=development

   # DATABASE
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=bookstore
   DB_USER=root
   DB_PASS="비밀번호(classroom에 제출)"

   DB_TEST_NAME=bookstore_test

3. 배포 주소

Swagger  /  http://localhost:3000/swagger
JCloud 주소  /  

4. 인증 플로우 설명

[Login]
   ↓
[Access Token 발급]
   ↓
[Protected API 호출]
   ↓
[Access Token 만료]
   ↓
[Refresh Token → 재발급]

5. 역할/권한표

Only Admin: getAllUsers, getUserById, updateUser, deactivateUser, activateUser, deleteUser,
            createBook, updateBook, deleteBook
  
공통(Admin + User): registerUser, getMe, deleteMe, logout, getBooks, getBookById, getMyCart, addToCart,
                    removeFromCart, clearCart, updateCartItem, createOrder, getMyOrders, getOrderById,
                    cancelOrder, createReview, getBookReviews, deleteReview, updateReview

6. 예제 계정

admin@test.com / 1234
user1@test.com /1234

7. 엔드포인트 요약표

#admin
  get("api/admin/stats" , getStats)

#auth ("/api/auth")
  post("/login", login)
  post("/refresh", refresh)

#Users ("api/users")
  post("/", registerUser)
  get("/me", getMe)
  get("/", getAllUsers)
  get("/:id", getUserById)
  patch("/:id", updateUser)
  patch("/:id/deactivate", deactivateUser)
  patch("/:id/activate", activateUser)
  delete("/me", deleteMe)
  delete("/:id", deleteUser)
  post("/logout", logout)

#Books ("api/books")
  get("/", getBooks)
  get("/:id", getBookById)
  post("/", createBook)
  patch("/:id", updateBook)
  delete("/:id", deleteBook)

#Cart ("api/cart")
  get("/", getMyCart)
  post("/", addToCart)
  delete("/", removeFromCart)
  delete("/clear", clearCart)
  patch("/", updateCartItem)

#Order ("api/orders")
  post("/", createOrder)
  get("/", getMyOrders)
  get("/:id", getOrderById)
  delete("/:id", cancleOrder)

#Review ("api/reviews")
  post("/", createReview)
  get("/:bookId", getBookReviews)
  delete("/:id", deleteReview)
  put("/:id", updateReview)
