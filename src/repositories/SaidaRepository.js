const pool = require('../config/database')

class SaidaRepository {
    async listarSaida() {
        const listarSaida = await pool.query('SELECT * FROM tbl_mov_saida')
        return listarSaida
    }

    async buscarSaidaId(id) {
        const buscarSaidaId = await pool.query('SELECT * FROM tbl_mov_saida WHERE id = ?', [id])
        return buscarSaidaId
    }

    async cadastrarSaida(dadosDaSaida) {
        const cadastrarSaida = await pool.query('INSERT INTO tbl_mov_saida SET ?', [dadosDaSaida])
        return cadastrarSaida.insertId
    }

    async atualizarSaida(id, dadosDaSaida) {
        const camposSaida = []
        const dadoSaida = []

        for(const [key, value] of Object.entries(dadosDaSaida)) {
            camposSaida.push(`${key} = ?`)
            dadoSaida.push(value)
        }

        if(camposSaida.length == 0) return null

        dadoSaida.push(id)

        const query = `UPDATE tbl_mov_saida SET ${camposSaida.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoSaida)

        return resultado.affectedRows
    }

    async deletarSaida(id) {
        await pool.query('DELETE FROM tbl_mov_saida WHERE id = ?', [id])
        return true
    }
}

module.exports = new SaidaRepository()