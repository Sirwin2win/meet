const express = require('express')
const router = express.Router()

const {
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController')

const { protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getCategory).post(protect, setCategory)
router.route('/:id').delete(protect, updateCategory).put(protect, deleteCategory)

module.exports = router