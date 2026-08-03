const pool = require('../config/database')

class CargosRepository {
    async listarCargo() {
        const listarCargo = await pool.query('SELECT * FROM tbl_cargos')
        return istarCargo
    }

    async buscarCargoId(id) {
        const buscarCargoId = await pool.query('SELECT * FROM tbl_cargos WHERE id = ?', [id])
        return buscarCargoId
    }

    async cadastrarCargo(dadosDoCargo) {
        const cadastrarCargo = await pool.query('INSERT INTO tbl_cargos SET ?', [dadosDoCargo])
        return cadastrarCargo.insertId
    }

    async atualizarCargo(id, dadosDoCargo) {
        const camposCargo = []
        const dadoCargo = []

        for(const [key, value] of Object.entries(dadosDoCargo)) {
            camposCargo.push(`${key} = ?`)
            dadoCargo.push(value)
        }

        if(camposCargo.length == 0) return null

        dadoCargo.push(id)

        const query = `UPDATE tbl_cargos SET ${camposCargo.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadoCargo)

        return resultado.affectedRows
    }

    async deletarCargo(id) {
        await pool.query('DELETE FROM tbl_cargos WHERE id = ?', [id])
        return true
    }
}

module.exports = new CargosRepository()