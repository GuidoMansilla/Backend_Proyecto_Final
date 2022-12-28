import fs from 'fs'

class ProductManager {

    constructor() {
        this.path = "./Productos.json"

        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
          } else {
            this.products = []
          }
    }
    
    async addProduct(prod){
      
        this.products.push(prod)

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Producto agregado')
        } catch(error) {
            console.log('Error al agregar producto: ', error)
        }
    }

    async updateProduct(prod){

      const id = prod.id;

      try {
        const oldProduct = this.products.find((prod) => prod.id === id)
        const index = this.products.findIndex((prod) => prod.id === id)

        if(index !== -1) {
          const newProduct = {...oldProduct, ...prod }
          this.products[index] = newProduct
          await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
          console.log('Producto actualizado')
        }
      } catch(error) {
        console.log('Error en la actualizacion: ', error)
      }
  }


    async deleteProduct(id) {
        try {
          const product = this.products.findIndex((prod) => prod.id === id)
  
          if(product !== -1) {
            this.products.splice(product, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Producto eliminado')
          }
          else {
            console.log('Elemento no encontrado')
          }
        } catch (error) {
          console.log('Error al borrar producto:', error)
        }
      }

}
