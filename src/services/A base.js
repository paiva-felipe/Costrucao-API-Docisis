const PedidoRepository = require('../repositories/PedidoRepository')

class PedidoService {
    async listarProduto() {
        const pedidos = await PedidoRepository.listarPedidos()

        return {
            sucesso: false,
            dados: pedidos,
            total: pedidos.length
        }
    }

    async buscarPedidoId(id) {
        if(!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "Id inválido"
            }
        }

        const pedido = await PedidoRepository.buscarPedidosId(id)

        if(!pedido) {
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        return {
            sucesso: true,
            dados: pedido[0]
        }
    }

    async cadastrarPedido(dados) {
        const {nome, produto, preco} = dados

        if(!nome || !produto) {
            throw {
                status: 400,
                mensagem: "Nome e produto são obrigatórios"
            }
        }

        if(typeof preco != "number" || preco <= 0) {
            throw {
                status: 400,
                mensagem: "Preço deveser um número positivo"
            }
        }

        novoPedido = {
            nome: nome.trim(),
            produto: produto.trim(),
            preco
        }

        const resultado = await PedidoRepository.cadastrarPedido(novoPedido)

        return {
            sucesso: true,
            mensagem: "Sucesso ao cadastrar",
            resultado
        }
    }

    async atualizarPedido(id, dados) {
        if(!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "Id inválido"
            }
        }

        const pedido = await PedidoRepository.buscarPedidosId(id)

        if(!pedido) {
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        const pedidoAtualizado = {}
        const {nome, produto, preco} = dados

        if(nome != undefined || nome.trim() != "") pedidoAtualizado.nome = nome.trim()
        if(produto != undefined || nome.trim() != "") pedidoAtualizado.produto = produto.trim()

        if(preco != undefined) {
            if(typeof preco != "number" || preco <= 0) {
                throw {
                    status: 400,
                    mensagem: "O preço deve ser um número positivo"
                }
            }

            pedidoAtualizado.preco = preco
        }

        if(Object.keys(pedidoAtualizado).length == 0) {
            throw {
                status: 400,
                mensagem: "Nenhum dado válido enviado para a atualização"
            }
        }

        await PedidoRepository.atualizarPedido(id, pedidoAtualizado)

        return {
            sucesso: true,
            mensagem: "Pedido atualizado"
        }
    }

    async deletarPedido(id) {
        if(!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "Id inválido"
            }
        }

        const pedido = await PedidoRepository.buscarPedidosId(id)

        if(!pedido) {
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        await PedidoRepository.deletarPedido(id)

        return {
            sucesso: true,
            mensagem: "Pedido apagado"
        }
    }
}

module.exports = new PedidoService()