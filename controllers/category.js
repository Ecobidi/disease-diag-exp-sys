const CategoryService = require('../services/category')

class CategoryController {
  static async getAllCategories(req, res) {
    let categories = []
    if (req.query.search) {
      categories = await CategoryService.findByName(req.query.search)
    } else {
      categories = await CategoryService.findAll()
    }
    res.render('admin/categories', { categories })
  }

  static async createCategory(req, res) {
    try {
      await CategoryService.save(req.body)
      req.flash('success_msg', 'Category saved')
      res.redirect('/categories')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error saving category')
      res.redirect('/categories')
    }
  }

  static async removeCategory(req, res) {
    await CategoryService.removeOne(req.params.category_id)
    req.flash('success_msg', 'Category removed')
    res.redirect('/categories')
  }
}

module.exports = CategoryController