const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/passwordHandler");
const { generateToken } = require("../helpers/tokenHandler");

const passwordDummy = "adminganteng";
const productNotFound = 999;
const productName = "Dompet Kulit";
const productImage = "images";
const productPrice = 60000;
const productStock = 999;
let productId;

let userIdDummy;
let userRole;
let access_token;
let access_tokenSalah;
let userRoleSalah;

beforeAll((done) => {
  const user = [
    {
      username: "admin",
      email: "admin@admin.com",
      role: "admin",
      password: hash(passwordDummy),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "cust",
      email: "cust@cust.com",
      role: "customer",
      password: hash(passwordDummy),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  queryInterface
    .bulkInsert("Users", user, { returning: true })
    .then((user) => {
      username = user[0].username;
      emailDummy = user[0].email;
      userIdDummy = user[0].id;
      userRole = user[0].role;
      userRoleSalah = user[1].role;
      //generate access_token admin
      access_token = generateToken({
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
      });
      //generate access_token customer
      access_tokenSalah = generateToken({
        id: user[1].id,
        email: user[1].email,
        role: user[1].role,
      });
      const productTest = [
        {
          name: productName,
          image_url: productImage,
          price: productPrice,
          stock: productStock,
          UserId: userIdDummy,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      return queryInterface.bulkInsert("Products", productTest, {
        returning: true,
      });
    })
    .then((product) => {
      productId = product[0].id;
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Products")
    .then(() => {
      return queryInterface.bulkDelete("Users");
    })
    .then(() => done())
    .catch((err) => done(err));
});

// kalau misal nanti butuh untuk membuat beforeALl atau afterALl biasanya dibutuhkan testCase kosong, jadi bisa dibikin kaya yang di bawah ini

// describe("something", () => {
//   test("test nothing", (done) => {
//     done()
//   })
// })

describe("POST /products", () => {
  test("TEST CASE 1: CREATE PRODUCT SUCCESS", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: productStock,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("name", productName);
        expect(body).toHaveProperty("image_url", productImage);
        expect(body).toHaveProperty("price", productPrice);
        expect(body).toHaveProperty("stock", productStock);
        expect(body).toHaveProperty("UserId", userIdDummy);
        done();
      });
  });
  test(`TEST CASE 2: WRONG ACCESS_TOKEN`, (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_tokenSalah,
        role: userRoleSalah,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      });
  });

  test(`TEST CASE 3: DONT HAVE ACCESS_TOKEN`, (done) => {
    request(app)
      .post("/products")
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "login first");
        done();
      });
  });

  test("TEST CASE 4: REQUIRED FIELD ARE EMPTY", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: "",
        image_url: "",
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: [
              "Price is required, cannot be blank",
              "Stock is required, cannot be blank",
              "Name is required, cannot be blank",
              "ImageUrl is required, cannot be blank",
            ],
          })
        );
        done();
      });
  });
  test("TEST CASE 5: PRICE SET TO MINUS", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: -99,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 6: STOCK SET TO MINUS", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: -99,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 7: SET PRICE AND STOCK TO STRING", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: "",
        stock: "",
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Price must be number", "Stock must be number"],
          })
        );
        done();
      });
  });
});

describe("GET /products", () => {
  test("TEST CASE 1: SUCCESS GET", (done) => {
    request(app)
      .get("/products")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toEqual(expect.arrayContaining([]));
        done();
      });
  });
});

const updateDummy = {
  name: "Juz Ama",
  image_url: "bit.ly/juzAma",
  price: 9999,
  stock: 99,
};

describe("PUT /products/:id", () => {
  test("TEST CASE 1: SUCCESS PUT", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send(updateDummy)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", updateDummy.name);
        expect(body).toHaveProperty("image_url", updateDummy.image_url);
        expect(body).toHaveProperty("price", updateDummy.price);
        expect(body).toHaveProperty("stock", updateDummy.stock);
        done();
      });
  });

  test("TEST CASE 2: WRONG ACCESS_TOKEN", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_tokenSalah,
        role: userRoleSalah,
      })
      .send(updateDummy)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      });
  });

  test("TEST CASE 3: STOCK SET TO MINUS", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: updateDummy.name,
        image_url: updateDummy.image_url,
        price: updateDummy.price,
        stock: -99,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 4: PRICE SET TO MINUS", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: updateDummy.name,
        image_url: updateDummy.image_url,
        price: -99,
        stock: updateDummy.price,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 5: PRICE & STOCK INPUTTED WITH STRING", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: updateDummy.name,
        image_url: updateDummy.image_url,
        price: "price",
        stock: "stock",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Price must be number", "Stock must be number"],
          })
        );
        done();
      });
  });
});
describe("GET PRODUCT BY ID", () => {
  test("TEST CASE 1: SUCCESS GET PRODUCT BY ID", (done) => {
    request(app)
      .get(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        console.log(res, 'ini resss')
        expect(status).toBe(200);
        done();
      });
  });
  //  adding more test case for failed to get product by id, by example to get without access_token, or if the role is not admin or something else
  test("TEST CASE 2: PRODUCT WITH ID NOT FOUND", (done) => {
    request(app)
      .get(`/products/${productNotFound}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        done();
      });
  });
});

describe("DELETE /products/:id", () => {
  test("TEST CASE 1: SUCCESS DELETE", () => {
    request(app)
      .delete(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Successfully deleted");
      });
  });
  test("TEST CASE 2: NO ACCESS_TOKEN", (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "login first");
        done();
      });
  });
  test("TEST CASE 3: not admin", (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set({
        access_token: access_tokenSalah,
        role: userRoleSalah,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      });
  });
});


