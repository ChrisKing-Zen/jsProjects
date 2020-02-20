const Repository = require("./repository");

class ProductsRepository extends Repository {}
///Functions of Products repository management
//getAll
//getOne
//getOneBy
//create
//update
//delete
//randomID
//writeAll

module.exports = new ProductsRepository("products.json");
