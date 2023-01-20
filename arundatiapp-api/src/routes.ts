import express from "express"
import productController from "./controllers/productController"
import transactionController from "./controllers/transactionController"
import userController from "./controllers/userController"

const routes = express.Router()

routes.post('/user', userController.create)
routes.put('/user/:id', userController.update)
routes.get('/user/:id', userController.readByID)
routes.get('/user', userController.read)
routes.delete('/user/:id', userController.delete)

routes.post('/product', productController.create)
routes.put('/product/:id', productController.update)
routes.get('/product/:id', productController.readByID)
routes.get('/product', productController.read)
routes.delete('/product/:id', productController.delete)

routes.post('/transaction', transactionController.create)
routes.put('/transaction/:id', transactionController.update)
routes.get('/transaction/:id', transactionController.readByID)
routes.get('/transaction', transactionController.read)
routes.delete('/transaction/:id', transactionController.delete)

export default routes