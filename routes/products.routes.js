import { Router } from 'express';
import productManager from '../src/productManager';

const router = Router()
const products = []

router.get('/', (req, res) => {

    let limit = req.query.limit;

    if(!limit) return res.status(200).json({ products });
  
    let productosFiltrados = products.filter(prod=>prod.id <= limit);

    res.status(200).json({ productosFiltrados });   
})


router.get('/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find(product => product.id == id);

    if(!product) {
        return res.send('Producto no encontrado');
    }

    res.status(200).json({ product })
   
})


router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    
    if(!title) {
        throw new Error('title is required')
    }

    if(!description) {
        throw new Error('description is required')
    }

    if(!code) {
        throw new Error('code is required')
    }

    if(!price) {
        throw new Error('price is required')
    }

    if(!status) {
        throw new Error('status is required')
    }

    if(!stock) {
        throw new Error('stock is required')
    }

    if(!category) {
        throw new Error('category is required')
    }
    
    const product = {
        id: products.length == 0 ? 1 : products.length + 1,
        title, 
        description, 
        code, 
        price,
        status, 
        stock, 
        category, 
        thumbnails
    }
    
    products.push(product)

    productManager.addProduct(product); //guardo el producto en el .json

    res.status(201).json({ info: "Created", product })

})

router.put('/:id', (req, res) => {

    const { id } = req.params

    const product = products.find(product => product.id == id);

    if(!product) {
        return res.send('Producto no encontrado');
    }

    const { title, description, code, price, status, stock, category, thumbnails } = req.body

    product.title = title
    product.description = description
    product.code = code
    product.price = price
    product.status = status
    product.stock = stock
    product.category = category
    product.thumbnails = thumbnails

    productManager.updateProduct(product);
    
    res.json(product);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    let productoEliminado = products.splice(id-1, 1)

    productManager.deleteProduct(id)

    res.json(productoEliminado)
})


export default router