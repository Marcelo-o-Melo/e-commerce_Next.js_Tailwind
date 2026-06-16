"use client";
import { useEffect, useState } from 'react';
import { produtos } from './components/Itens';
import Image from 'next/image';
import Link from 'next/link';
import valorFormatado from './utils/Currency.js'

export default function HomePage() {

  const [carrinho, setCarrinho] = useState<any[]>([]);

  useEffect(() => {
    // get do session storage
    const storage = JSON.parse(sessionStorage.getItem('carrinho') || '[]');
    setCarrinho(storage);
  }, []);

  const atualizarCarrinho = () => {
    const storage = JSON.parse(sessionStorage.getItem('carrinho') || '[]');
    setCarrinho(storage);
  }

  const adicionarAoCarrinho = (produto: any) => {
    //
    const carrinhoAtual = JSON.parse(sessionStorage.getItem('carrinho') || '[]');

    // ve se ja existe
    const produtoExistente = carrinhoAtual.find((item: any) => item.id === produto.id);

    if (produtoExistente) {
      // se ja existe so aumenta a quantidade
      produtoExistente.quantidade += 1;
    } else {
      // se nao, so adiciona
      const novoProduto = { ...produto, quantidade: 1 };
      carrinhoAtual.push(novoProduto);
    }
    // atualiza o session storage
    sessionStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    atualizarCarrinho();

    alert(`${produto.nome} foi adicionado ao carrinho!`);
  };


  return (
    <div className='bg-gray-300'>
      {/* Itens + carrinho atual*/}
      <div className={`${carrinho.length < 1 ? "" : "grid grid-cols-[2fr,1fr]"}`}>
        {/* Itens*/}
        <div className='flex flex-col items-center mt-3'>
          <div className='text-2xl text-black border-b border-black w-28 text-center'>Produtos</div>
          <div className="grid grid-cols-4 gap-2 max-w-screen-lg mx-auto p-2">
            {produtos.map((produto) => (
              <div key={produto.id} className="h-[250px] border border-gray-300 bg-white shadow-lg flex flex-col">
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  className="h-[150px]"
                />
                <div className="flex flex-col justify-between p-2 flex-grow">
                  <h1 className="text-black">{produto.nome}</h1>
                  <h1 className="text-black">{valorFormatado(produto.preco)}</h1>

                  <button
                    className="border rounded-lg text-black hover:bg-green-400"
                    onClick={() => adicionarAoCarrinho(produto)}>
                    adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* carrinho atual*/}
        {carrinho.length > 0 &&
          <div className='flex flex-col items-center mt-3'>
            <div className='text-2xl text-black border-b border-black w-28 text-center'>Carrinho</div>
            <div className='p-2 w-full'>
              {carrinho.map((produto) => (
                <div key={produto.id} className="border border-gray-300 bg-white shadow-lg flex items-center p-2">
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-[45px] w-[45px]"
                  />
                  <div className="flex flex-col justify-between  p-2 flex-grow">
                    <h1 className="text-black">{produto.nome}</h1>
                    <div className='flex justify-between'>
                      <h1 className="text-black">{valorFormatado(produto.preco)}</h1>
                      <h1 className="text-black">{produto.quantidade}x</h1>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <Link className='text-black' href="/PageCarrinho">Ir para o carrinho</Link>
          </div>
        }
      </div>
    </div>

  );
}
