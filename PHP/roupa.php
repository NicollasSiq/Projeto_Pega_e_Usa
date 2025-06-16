<?php
require_once 'conexao.php'; // Arquivo da conexão com o banco

// Definindo a classe Roupa
class Roupa {
    private $nome;
    private $tamanho;
    private $preco; 
    private $quantidade;
    private $tipo;

    public function __construct(string $nome, string $tamanho, float $preco, int $quantidade, string $tipo) {
        $this->nome = $nome;
        $this->tamanho = $tamanho;
        $this->preco = $preco;
        $this->quantidade = $quantidade;
        $this->tipo = $tipo;
    }

    // Getters
    public function getNome() { return $this->nome; }
    public function getTamanho() { return $this->tamanho; }
    public function getPreco() { return $this->preco; }
    public function getQuantidade() { return $this->quantidade; }
    public function getTipo() { return $this->tipo; }
}

// Código para buscar do banco e guardar em objetos Roupa
try {
    $sql = "SELECT nome, tamanho, valor, quantidade, tipo FROM roupa";
    $stmt = $conexao->prepare($sql);
    $stmt->execute();

    $roupas = []; // Array para guardar os objetos Roupa

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $roupa = new Roupa(
            $row['nome'],
            $row['tamanho'],
            $row['valor'],
            $row['quantidade'],
            $row['tipo']
        );
        $roupas[] = $roupa; // Adiciona a roupa no array
    }

    // Exemplo de uso das variáveis (objetos):
    foreach ($roupas as $r) {
        echo "Nome: " . $r->getNome() . "<br>";
        echo "Tamanho: " . $r->getTamanho() . "<br>";
        echo "Preço: " . $r->getPreco() . "<br>";
        echo "Quantidade: " . $r->getQuantidade() . "<br>";
        echo "Tipo: " . $r->getTipo() . "<br><br>";
    }

} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
