import { Router } from 'express'

const router = Router()
const carts = []

router.get('/', (req, res) => {

    res.status(200).json({ carts })
 
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const cart = carts.find(cart => cart.id == id);

    if(!cart) {
        return res.send('Carrito no encontrado');
    }

    res.status(200).json({ cart })
   
})

router.post('/', (req, res) => {
    const { products } = req.body

    const cart = {
        id: carts.length == 0 ? 1 : carts.length + 1,
        products
    }

    carts.push(cart)

    res.status(201).json({ info: "Created", cart })

})

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;

    const cart = carts.find(cart => cart.id == cid);

    //const product = cart.find

})



export default router