const pool = require('../config/database')

class PedidoRepository {
    async listarPedido() {
        const listarPedido = await pool.query('SELECT * FROM tbl_pedido')
        return listarPedido
    }

    async buscarPedidoId(id) {
        const buscarPedidoId = await pool.query('SELECT * FROM tbl_pedido WHERE id = ?', [id])
        return buscarPedidoId
    }

    async cadastrarPedido(dadosDoPedido) {
        const cadastrarPedido = await pool.query('INSERT INTO tbl_pedido SET ?', [dadosDoPedido])
        return cadastrarPedido.insertId
    }

    async atualizarPedido(id, dadosDoPedido) {
        const camposPedido = []
        const dadoPedido = []

        for(const [key, value] of Object.entries(dadosDoPedido)) {
            camposPedido.push(`${key} = ?`)
            dadoPedido.push(value)
        }

        if(camposPedido.length == 0) return null

        dadoPedido.push(id)

        const query = `UPDATE tbl_pedido SET ${camposPedido.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoPedido)

        return resultado.affectedRows
    }

    async deletarPedido(id) {
        await pool.query('DELETE FROM tbl_pedido WHERE id = ?', [id])
        return true
    }
}

module.exports = new PedidoRepository()