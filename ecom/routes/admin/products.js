const express = require("express");
const router = express.Router();

/// Route Handlers
// List products
router.get("admin/products/", (req, res) => {});
// show form to create product
router.get("admin/products/new", (req, res) => {});
// allow user to submit form
router.post("admin/products/new", (req, res) => {});
// allow editing
// allow submit edit form
// deletion of product

module.exports = router;
