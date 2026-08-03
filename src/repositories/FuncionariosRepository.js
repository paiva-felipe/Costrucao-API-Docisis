const pool = require('../config/database')

class FuncionarioRepository {
    async listarFuncionario() {
        const listarFuncionario = await pool.query('SELECT * FROM tbl_funcionarios')
        return listarFuncionario
    }

    async buscarFuncionarioId(id) {
        const buscarFuncionarioId = await pool.query('SELECT * FROM tbl_funcionarios WHERE id = ?', [id])
        return buscarFuncionarioId
    }

    async cadastrarFuncionario(dadosDoFuncionario) {
        const cadastrarFuncionario = await pool.query('INSERT INTO tbl_funcionarios SET ?', [dadosDoFuncionario])
        return cadastrarFuncionario.insertId
    }

    async atualizarFuncionario(id, dadosDoFuncionario) {
        const camposFuncionario = []
        const dadoFuncionario = []

        for(const [key, value] of Object.entries(dadosDoFuncionario)) {
            camposFuncionario.push(`${key} = ?`)
            dadoFuncionario.push(value)
        }

        if(camposFuncionario.length == 0) return null

        dadoFuncionario.push(id)

        const query = `UPDATE tbl_funcionarios SET ${camposFuncionario.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoFuncionario)

        return resultado.affectedRows
    }

    async deletarFuncionario(id) {
        await pool.query('DELETE FROM tbl_funcionarios WHERE id = ?', [id])
        return true
    }
}

module.exports = new FuncionarioRepository()