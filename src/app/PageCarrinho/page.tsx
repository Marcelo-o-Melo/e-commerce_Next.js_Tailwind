"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MenuQuantidade from '../components/MenuQuantidade';
import valorFormatado from '../utils/Currency.js'

export default function PageCarrinho() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [totalQuantidade, setTotalQuantidade] = useState<number>(0);

  useEffect(() => {
    // get do session storage
    const carrinhoSalvo = JSON.parse(sessionStorage.getItem('carrinho') || '[]');
    setCarrinho(carrinhoSalvo);
  }, []);

  useEffect(() => {
    // calculo valor
    const total = carrinho.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
    setSubtotal(total);

    // calculo quantidade
    const quantidade = carrinho.reduce((acc, produto) => acc + produto.quantidade, 0);
    setTotalQuantidade(quantidade);
  }, [carrinho]);

  const excluirItem = (index: number) => {
    // exclui um item especifico
    const novoCarrinho = carrinho.filter((_, i) => i !== index);

    sessionStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  };

  const finalizarPedido = () => {
    //gets
    const carrinhoAtual = JSON.parse(sessionStorage.getItem('carrinho') || '[]');
    const pedidosFinalizados = JSON.parse(sessionStorage.getItem('pedidos') || '[]');

    // registra o pedido
    const novoPedido = { produtos: carrinhoAtual, total: subtotal };
    pedidosFinalizados.push(novoPedido);

    sessionStorage.setItem('pedidos', JSON.stringify(pedidosFinalizados));

    alert(`Pedido finalizado! Valor total: R$ ${subtotal.toFixed(2)}`);

    // limpa no carrinho no final
    sessionStorage.removeItem('carrinho');
    setCarrinho([]);

  };

  return (
    <div className='bg-gray-300 min-h-screen'>
      <div className='mx-auto max-w-md'>
        <h1 className='border-b border-black text-center pt-2 text-lg text-black mb-5'>Carrinho de Compras</h1>
      </div>

      <div className='flex'>
        {/* Área esquerda */}
        <div className='flex flex-col  w-[70%]'>
          <h1 className='m-auto text-black'>{totalQuantidade < 1 ? "O carrinho esta vazio" : ""}</h1>
          {carrinho.map((produto, index) => (
            <div className="border border-gray-300 flex w-full ml-2 mb-2 bg-white" key={index}>
              <Image src={produto.imagem} alt={produto.nome} className="h-[150px] w-[150px]" />
              <div className='flex flex-col px-2 justify-between'>
                <h2 className='text-black mt-2 ml-2'>{produto.nome}</h2>
                <div className='flex items-end'>
                  <MenuQuantidade
                    quantidade={produto.quantidade} // quantidade atual do produto
                    setQuantidade={(novaQuantidade) => {
                      const novoCarrinho = [...carrinho];
                      novoCarrinho[index].quantidade = novaQuantidade; // atualiza a quantidade do item
                      sessionStorage.setItem('carrinho', JSON.stringify(novoCarrinho)); // atualiza o session storage
                      setCarrinho(novoCarrinho); // atualiza o carrinho
                    }}
                  />
                  <span onClick={() => excluirItem(index)} className='border-l px-2 mb-2 cursor-pointer text-red-500 text-center hover:bg-red-300 hover:border-white'>Excluir</span>
                </div>
              </div>
              <div className="flex items-center ml-auto">
                <h2 className='mr-6 text-black text-xl'>{valorFormatado(produto.preco * produto.quantidade)}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Área direita */}
        <div className="border border-gray-300 flex flex-col items-center  ml-4 mr-2 px-2 w-[30%] max-h-[150px] bg-white">
          <h2 className="text-black mt-3">subtotal ({totalQuantidade} {totalQuantidade === 1 ? "item" : "itens"}): R$ {valorFormatado(subtotal)}</h2>
          <button
            onClick={finalizarPedido}
            className="border rounded-md px-2 mt-auto mb-3 text-black hover:bg-green-400"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
