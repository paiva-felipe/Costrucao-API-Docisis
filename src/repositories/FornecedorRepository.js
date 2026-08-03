const pool = require('../config/database')

class FornecedorRepository {
    async listarFornecedor() {
        const listarFornecedor = await pool.query('SELECT * FROM tbl_fornecedor')
        return listarFornecedor
    }

    async buscarFornecedorId(id) {
        const buscarFornecedorId = await pool.query('SELECT * FROM tbl_fornecedor WHERE id = ?', [id])
        return buscarFornecedorId
    }

    async cadastrarFornecedor(dadosDoFornecedor) {
        const cadastrarFornecedor = await pool.query('INSERT INTO tbl_fornecedor SET ?', [dadosDoFornecedor])
        return cadastrarFornecedor.insertId
    }

    async atualizarFornecedor(id, dadosDoFornecedor) {
        const camposFornecedor = []
        const dadoFornecedor = []

        for(const [key, value] of Object.entries(dadosDoFornecedor)) {
            camposFornecedor.push(`${key} = ?`)
            dadoFornecedor.push(value)
        }

        if(camposFornecedor.length == 0) return null

        dadoFornecedor.push(id)

        const query = `UPDATE tbl_fornecedor SET ${camposFornecedor.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoFornecedor)

        return resultado.affectedRows
    }

    async deletarFornecedor(id) {
        await pool.query('DELETE FROM tbl_fornecedor WHERE id = ?', [id])
        return true
    }
}

module.exports = new FornecedorRepository()