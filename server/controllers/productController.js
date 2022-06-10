const { Product } = require('../models')

class productController {
  static async create(req, res, next) {
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.loggedin.id
    }
    try {
      const data = await Product.create(payload)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async getById(req, res, next) {
    const id = +req.params.id
    try {
      const data = await Product.findByPk(id)
      if (!data) {
        return res.status(404).json({
          message: "Product Not Found!"
        })
      }
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async get(req, res, next) {
    try {
      const data = await Product.findAll()
      if (!data) {
        res.status(404).json({
          message: "No Product Found!"
        })
      }
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async update(req, res, next) {
    const id = +req.params.id
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    try {
      const updateProduct = await Product.update(payload, {
        where: {
          id: id
        },
        returning: true
      })
      res.status(200).json(updateProduct[1][0])
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    const id = +req.params.id
    try {
      await Product.destroy({
        where: {
          id: id
        }
      })
      res.status(200).json({
        message: "Successfully deleted"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController