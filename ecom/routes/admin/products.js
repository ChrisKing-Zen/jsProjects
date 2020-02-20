const express = require("express");
const productsRepos = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const { requireTitle, requirePrice } = require("./validators");
const multer = require("multer");
const { handleErrors, requireAuth } = require("./middleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products/", requireAuth, async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/signin");
  }
  const products = await productsRepos.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate), //link page to display

  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;

    await productsRepos.create({ title, price, image });

    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", async (req, res) => {
  if (!product) {
    return res.send("Product not found");
  }

  product = await productsRepos.getOne(req.params.id);

  res.send(); // SEND THE TEMPLATE WITH PRODUCT INFO
});

module.exports = router;
