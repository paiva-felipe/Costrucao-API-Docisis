const pool = require('../config/database')

class EstoqueRepository {
    async listarEstoque() {
        const listarEstoque = await pool.query('SELECT * FROM tbl_estoque')
        return listarEstoque
    }

    async buscarEstoqueId(id) {
        const buscarEstoqueId = await pool.query('SELECT * FROM tbl_estoque WHERE id = ?', [id])
        return buscarEstoqueId
    }

    async cadastrarEstoque(dadosDoEstoque) {
        const cadastrarEstoque = await pool.query('INSERT INTO tbl_estoque SET ?', [dadosDoEstoque])
        return cadastrarEstoque.insertId
    }

    async atualizarPedido(id, dadosDoEstoque) {
        const camposEstoque = []
        const dadoEstoque = []

        for(const [key, value] of Object.entries(dadosDoEstoque)) {
            camposEstoque.push(`${key} = ?`)
            dadoEstoque.push(value)
        }

        if(camposEstoque.length == 0) return null

        dadoEstoque.push(id)

        const query = `UPDATE tbl_estoque SET ${camposEstoque.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoEstoque)

        return resultado.affectedRows
    }

    async deletarCadastro(id) {
        await pool.query('DELETE FROM tbl_estoque WHERE id = ?', [id])
        return true
    }
}

module.exports = new EstoqueRepository()