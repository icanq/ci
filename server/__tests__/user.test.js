const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/passwordHandler");

let username;
let email;
const password = "adminganteng";
const emailSalah = "adminku@admin.com";
const passwordSalah = "adminadmin";

let custUsername;
let custEmail;

let emailRegister = "icanq@icanq.com"
let usernameReg = "icanq"

beforeAll(async (done) => {
  const admin = [
    {
      username: "admin",
      role: "admin",
      email: "admin@admin.com",
      password: hash(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "customer",
      email: "cust@cust.com",
      role: "customer",
      password: hash(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  try {
    const data = await queryInterface.bulkInsert("Users", admin, {
      returning: true,
    });
    username = data[0].username;
    email = data[0].email;
    custEmail = data[1].email;
    custUsername = data[1].username;

    done()
  } catch (error) {
    done(error);
  }
});

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Users");
    done();
  } catch (error) {
    done(error);
  }
});

// routes /
describe("POST /", () => {
  test("SHOULD RENDER INI DARI ROUTER", (done) => {
    request(app)
      .get("/")
      .end((err, res) => {
        const { body, status } = res;
        expect(status).toBe(200)
        expect(body).toMatch(/hi from router/)
        done()
      })
  })
})

describe("POST /admin", () => {
  test("SHOULD RENDER ok", (done) => {
    request(app)
      .get("/admin")
      .end((err, res) => {
        const { body, status } = res;
        expect(status).toBe(200)
        expect(body).toMatch('ok')
        done()
      })
  })
})

//admin
describe("POST /register", () => {
  test("TEST CASE 1: REGISTER SUCCESS", (done) => {
    request(app)
      .post("/register")
      .send({ username: usernameReg, email: emailRegister, password: "sulaiman" })
      .end((err, res) => {
        const { status, body } = res;
        expect(status).toBe(201)
        expect(body).toHaveProperty("email", emailRegister)
        expect(body).toHaveProperty("username", usernameReg)
        done()
      })
  })
  test("TEST CASE 2: REGISTER FAILED [USERNAME EMPTY]", (done) => {
    request(app)
      .post("/register")
      .send({ email: emailRegister + "a", password: "sulaiman" })
      .end((err, res) => {
        const { status, body } = res;
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Username must be filled")
        done()
      })
  })
})

describe("POST /admin/login", () => {
  //login success
  test("TEST CASE 1: LOGIN SUCCESS", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email, password })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("username", username);
        expect(body).toHaveProperty("email", email);
        done();
      });
  });

  // EMAIL EXISTS BUT WRONG PASSWORD (401)
  test("TEST CASE 2: EMAIL EXISTS BUT WRONG PASSWORD", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email, password: passwordSalah })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Wrong email/password");
        done();
      });
  });

  // EMAIL NOT EXISTS (404)
  test("TEST CASE 3: EMAIL NOT EXISTS", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: emailSalah, password })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Account not found!");
        done();
      });
  });
  // NOT ENTERED EMAIL AND PASSWORD (500)
  test("TEST CASE 4: EMAIL NOT EXISTS", (done) => {
    request(app)
      .post("/admin/login")
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(500);
        expect(body).toHaveProperty("message", "Internal server error");
        done();
      });
  });
});

describe("POST /login", () => {
  //login success
  test("TEST CASE 1: LOGIN  CUSTOMER SUCCESS", (done) => {
    request(app)
      .post("/login")
      .send({ email: custEmail, password: password })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("username", custUsername);
        expect(body).toHaveProperty("email", custEmail);
        done();
      });
  });

  // EMAIL EXISTS BUT WRONG PASSWORD (401)
  test("TEST CASE 2: EMAIL EXISTS BUT WRONG PASSWORD", (done) => {
    request(app)
      .post("/login")
      .send({ email: custEmail, password: "sule" })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Wrong email/password");
        done();
      });
  });

  // EMAIL NOT EXISTS (404)
  test("TEST CASE 3: EMAIL NOT EXISTS", (done) => {
    request(app)
      .post("/login")
      .send({ email: emailSalah, password })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Account not found!");
        done();
      });
  });
  // NOT ENTERED EMAIL AND PASSWORD (500)
  test("TEST CASE 4: EMAIL NOT EXISTS", (done) => {
    request(app)
      .post("/login")
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(500);
        expect(body).toHaveProperty("message", "Internal server error");
        done();
      });
  });
});
