const FuncionarioRepository = require('../repositories/FuncionariosRepository')

class FuncionarioService {
    async listarFuncionario() {
        const funcionarios = await FuncionarioRepository.listarFuncionario()

        return {
            sucesso: false,
            dados: funcionarios,
            total: funcionarios.length
        }
    }

    async buscarFuncionarioId(id) {
        if(!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "Id inválido"
            }
        }

        const funcionario = await FuncionarioRepository.buscarFuncionarioId(id)

        if(!funcionario) {
            throw {
                status: 404,
                mensagem: "Funcionario não encontrado"
            }
        }

        return {
            sucesso: true,
            dados: funcionario[0]
        }
    }

    async cadastrarFuncionario(dados) {
        const {cpf, id_cargos, nome, email} = dados

        if(!cpf || !id_cargos || !nome || !email) {
            throw {
                status: 400,
                mensagem: "CPF, id cargos, nome e email são obrigatórios"
            }
        }

        if(typeof cpf != "number" || cpf <= 0) {
            throw {
                status: 400,
                mensagem: "CPF deve ser um número positivo"
            }
        }

        if(typeof id_cargos != "number" || id_cargos <= 0) {
            throw {
                status: 400,
                mensagem: "id cargos deve ser um número positivo"
            }
        }

        novoFuncionario = {
            cpf,
            id_cargos,
            nome: nome.trim(),
            email: email.trim()
        }

        const resultado = await FuncionarioRepository.cadastrarFuncionario(novoFuncionario)

        return {
            sucesso: true,
            mensagem: "Sucesso ao cadastrar",
            resultado
        }
    }

    async atualizarFuncionario(id, dados) {
        if(!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "Id inválido"
            }
        }

        const funcionario = await FuncionarioRepository.buscarFuncionarioId(id)

        if(!funcionario) {
            throw {
                status: 404,
                mensagem: "Funcionario não encontrado"
            }
        }

        const funcionarioAtualizado = {}
        const {cpf, id_cargos, nome, email} = dados

        if(cpf != undefined) {
            if(typeof cpf != "number" || cpf <= 0) {
                throw {
                    status: 400,
                    mensagem: "O cpf deve ser um número positivo"
                }
            }

            funcionarioAtualizado.cpf = cpf
        }

        if(id_cargos != undefined) {
            if(typeof id_cargos != "number" || id_cargos <= 0) {
                throw {
                    status: 400,
                    mensagem: "O id cargos deve ser um número positivo"
                }
            }

            funcionarioAtualizado.id_cargos = id_cargos
        }

        if(nome != undefined || nome.trim() != "") funcionarioAtualizado.nome = nome.trim()

        if(email != undefined || email.trim() != "") funcionarioAtualizado.email = email.trim()

        if(Object.keys(funcionarioAtualizado).length == 0) {
            throw {
                status: 400,
                mensagem: "Nenhum dado válido enviado para a atualização"
            }
        }

        await FuncionarioRepository.atualizarFuncionario(id, funcionarioAtualizado)

        return {
            sucesso: true,
            mensagem: "Funcionario atualizado"
        }
    }

    async deletarFuncionario(id) {
        if(!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "Id inválido"
            }
        }

        const funcionario = await FuncionarioRepository.buscarFuncionarioId(id)

        if(!funcionario) {
            throw {
                status: 404,
                mensagem: "Funcionario não encontrado"
            }
        }

        await FuncionarioRepository.deletarFuncionario(id)

        return {
            sucesso: true,
            mensagem: "Funcionario apagado"
        }
    }
}

module.exports = new FuncionarioService()