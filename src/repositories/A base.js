const pool = require('../config/database')

class PedidoRepository {
    async listarPedidos() {
        const listarPedidos = await pool.query('SELECT * FROM pedidos')
        return listarPedidos
    }

    async buscarPedidosId(id) {
        const buscarPedidosId = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id])
        return buscarPedidosId
    }

    async cadastrarPedido(dadosDoPedido) {
        const cadastrarPedido = await pool.query('INSERT INTO pedidos SET ?', [dadosDoPedido])
        return cadastrarPedido.insertId
    }

    async atualizarPedido(id, dadosDoPedido) {
        const camposPedidos = []
        const dadoPedido = []

        for(const [key, value] of Object.entries(dadosDoPedido)) {
            camposPedidos.push(`${key} = ?`)
            dadoPedido.push(value)
        }

        if(camposPedidos.length == 0) return null

        dadoPedido.push(id)

        const query = `UPDATE pedidos SET ${camposPedidos.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoPedido)

        return resultado.affectedRows
    }

    async deletarPedido(id) {
        await pool.query('DELETE FROM pedidos WHERE id = ?', [id])
        return true
    }
}

module.exports = new PedidoRepository()