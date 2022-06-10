const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");
const userController = require("../controllers/userController");

// homepage, fetch data bagian produk
router.get("/", (req, res) => {
  res.json("hi from router");
});

// admin
router.use("/admin", adminRoutes);

// customer
router.post('/register', userController.register)
router.post('/login', userController.loginUser)

// product(cms)
router.use("/products", productRoutes);


module.exports = router;
