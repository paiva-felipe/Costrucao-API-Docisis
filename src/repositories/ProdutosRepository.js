const pool = require('../config/database')

class ProdutoRepository {
    async listarProduto() {
        const listarProduto = await pool.query('SELECT * FROM tbl_produtos')
        return listarProduto
    }

    async buscarProdutoId(id) {
        const buscarProdutoId = await pool.query('SELECT * FROM tbl_produtos WHERE id = ?', [id])
        return buscarProdutoId
    }

    async cadastrarProduto(dadosDoProduto) {
        const cadastrarProduto = await pool.query('INSERT INTO tbl_produtos SET ?', [dadosDoProduto])
        return cadastrarProduto.insertId
    }

    async atualizarProduto(id, dadosDoProduto) {
        const camposProduto = []
        const dadoProduto = []

        for(const [key, value] of Object.entries(dadosDoProduto)) {
            camposProduto.push(`${key} = ?`)
            dadoProduto.push(value)
        }

        if(camposProduto.length == 0) return null

        dadoProduto.push(id)

        const query = `UPDATE tbl_produtos SET ${camposProduto.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoProduto)

        return resultado.affectedRows
    }

    async deletarProduto(id) {
        await pool.query('DELETE FROM tbl_produtos WHERE id = ?', [id])
        return true
    }
}

module.exports = new ProdutoRepository()