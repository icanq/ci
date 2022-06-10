module.exports = (err, req, res, next) => {
  // Untuk melihat potensi error lain yang ditangkap melalui errorhandler middleware kalian cukup bisa di trace melalui console si err.namenya itu apa
  console.log(err)

  if (err.status) {
    res.status(err.status).json({
      message: err.message || err.msg,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: "Username/Email already taken" });
  } else if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => e.message);
    res.status(400).json({ message: errors });
  }
  // nanti bisa ditambah error lainnya dibawah kaya gini contohnya:
  // else if (err.name === "InvalidSomething") {
  //   res.status(400).json({ message: "something"})
  // }
  else {
    res.status(500).json({ message: "Internal server error" });
  }
};
