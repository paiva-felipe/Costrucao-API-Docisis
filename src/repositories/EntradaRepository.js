const pool = require('../config/database')

class EntradaRepository {
    async listarEntrada() {
        const listarEntrada = await pool.query('SELECT * FROM tbl_mov_entrada')
        return listarEntrada
    }

    async buscarEntradaId(id) {
        const buscarEntradaId = await pool.query('SELECT * FROM tbl_mov_entrada  WHERE id = ?', [id])
        return buscarEntradaId
    }

    async cadastrarEntrada(dadosDaEntrada) {
        const cadastrarEntrada = await pool.query('INSERT INTO tbl_mov_entrada SET ?', [dadosDaEntrada])
        return cadastrarEntrada.insertId
    }

    async atualizarPedido(id, dadosDaEntrada) {
        const camposEntrada = []
        const dadoEntrada = []

        for(const [key, value] of Object.entries(dadosDaEntrada)) {
            camposEntrada.push(`${key} = ?`)
            dadoEntrada.push(value)
        }

        if(camposEntrada.length == 0) return null

        dadoEntrada.push(id)

        const query = `UPDATE tbl_mov_entrada SET ${camposEntrada.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoEntrada)

        return resultado.affectedRows
    }

    async deletarEntrada(id) {
        await pool.query('DELETE FROM tbl_mov_entrada WHERE id = ?', [id])
        return true
    }
}

module.exports = new EntradaRepository()