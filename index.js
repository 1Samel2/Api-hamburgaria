const express = require('express')
const port = 3000
const app = express()
app.use(express.json())
const uuid = require('uuid')

const order = []  /* Nunca usar esse armazenamento, o certo é um banco de dados, apenas para estudo */

app.get('/order', (request, response) => {
    return response.json(order)
})

app.post('/order', (request, response) => {
    const { order, clienteName, price, status} = request.body
     const user = { id: uuid.v4(), order, clienteName, price, status } 
    order.push(order)  
    return response.status(201).json(order)
})










app.listen(port, () => {
    console.log(`🛠️ Aplicando modificações ${port}`)
})