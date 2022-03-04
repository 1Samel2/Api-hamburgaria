/* 
    
 [X] POST /order: A rota deve receber o pedido do cliente, o nome do cliente e o valor do pedido

 [X] GET /order: Rota que lista todos os pedidos já feitos.

 [X] PUT /order/:id: Essa rota deve alterar um pedido já feito. Pode alterar,um ou todos os dados do pedido.O id do pedido deve ser enviado nos parâmetros da rota.

 [X] DELETE /order/:id: Essa rota deve deletar um pedido já feito com o id enviado nos parâmetros da rota.

 [] GET /order/:id: Essa rota recebe o id nos parâmetros e deve retornar um pedido específico.

 [X] PATCH /order/:id: Essa rota recebe o id nos parâmetros e assim que ela for chamada, deve alterar o status do pedido recebido pelo id para "Pronto". */

/* 

Middleware => intercepted => tem o poder de parar ou alterar dados da requisição */


const express = require('express')
const port = 3000
const app = express()
app.use(express.json()) /* usar esse use sempre quando for utilizar body antigo */
const uuid = require('uuid')

const orders = []/*  nunca usar isso para armazenzar < */




const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = orders.findIndex(pedido => pedido.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "order not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/order', (request, response) => {
    return response.json(orders)
})

app.post('/order', (request, response) => {
    const { order, clienteName, price, status } = request.body
    const pedido = { id: uuid.v4(), order, clienteName, price, status }
    orders.push(pedido)
    return response.status(201).json(pedido)
})



app.put('/order:id', checkUserId, (request, response) => {

    const { order, clienteName, price, status } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, order, clienteName, price, status }
    orders[index] = updatedUser
    return response.json(updatedUser)

})


app.delete('/order:id', checkUserId, (request, response) => {
    const index = request.userIndex
    orders.splice(index, 1)
    return response.status(204).json()
})


app.patch('/order:id', checkUserId, (request, response) => {

    const index = request.userIndex
    orders[index].status = "Pronto"
    return response.json(orders[index])
})






app.listen(port, () => {
    console.log(`🛠️  Aplicando modificações ${port}`)
})