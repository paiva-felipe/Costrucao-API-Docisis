const pool = require('../config/database')

class NotaFiscalRepository {
    async listarNotaFiscal() {
        const listarNotaFiscal = await pool.query('SELECT * FROM tbl_nota_fiscal')
        return listarNotaFiscal
    }

    async buscarNotaFiscalId(id) {
        const buscarNotaFiscalId = await pool.query('SELECT * FROM tbl_nota_fiscal WHERE id = ?', [id])
        return buscarNotaFiscalId
    }

    async cadastrarNotaFiscal(dadosDaNotaFiscal) {
        const cadastrarNotaFiscal = await pool.query('INSERT INTO tbl_nota_fiscal SET ?', [dadosDaNotaFiscal])
        return cadastrarNotaFiscal.insertId
    }

    async atualizarNotaFiscal(id, dadosDaNotaFiscal) {
        const camposNotaFiscal = []
        const dadoNotaFiscal = []

        for(const [key, value] of Object.entries(dadosDaNotaFiscal)) {
            camposNotaFiscal.push(`${key} = ?`)
            dadoNotaFiscal.push(value)
        }

        if(camposNotaFiscal.length == 0) return null

        dadoNotaFiscal.push(id)

        const query = `UPDATE tbl_nota_fiscal SET ${camposNotaFiscal.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoNotaFiscal)

        return resultado.affectedRows
    }

    async deletarNotaFiscal(id) {
        await pool.query('DELETE FROM tbl_nota_fiscal WHERE id = ?', [id])
        return true
    }
}

module.exports = new NotaFiscalRepository()