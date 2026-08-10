const ProdutoService = require('../services/ProdutosService')
 
class ProdutoController {
    async listarProdutos(req, res) {
        try {
            const resultado = await ProdutoService.listarProduto()
            res.json(resultado)
 
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno no servidor",
                erro: erro.stack || erro
            })
        }
    }
}
 
module.exports = new ProdutoController()