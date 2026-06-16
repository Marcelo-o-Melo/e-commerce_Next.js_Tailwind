"use client";
import { useEffect, useState } from 'react';
import valorFormatado from '../utils/Currency.js'

export default function PagePedidos() {
  const [pedidos, setPedido] = useState<any[]>([]);

  useEffect(() => {
    // pega os pedidos do session storage
    const pedidosArmazenados = JSON.parse(sessionStorage.getItem('pedidos') || '[]');
    setPedido(pedidosArmazenados);
  }, []);

  return (
    <div className='bg-gray-300 min-h-screen'>
      <div className='mx-auto max-w-md'>
        <h1 className='border-b border-black text-center pt-2 text-lg text-black'>Carrinho de Compras</h1>
      </div>
      <div className='p-5'>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <div className="border flex flex-col w-full  mb-5 p-4 bg-white text-black" key={index}>
              <h2 className="text-lg font-bold mb-2">Pedido {index + 1}</h2>
              <div className="border-b pb-2">
                <h3 className="font-semibold">Produtos:</h3>
                {pedido.produtos.map((produto: any, idx: number) => (
                  <div key={idx} className="flex justify-between ">
                    <span>{produto.nome} (x{produto.quantidade})</span>
                    <span>{valorFormatado(produto.preco * produto.quantidade)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-end">
                <h3 className="text-lg font-semibold text-black">Total: {valorFormatado(pedido.total)}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum pedido finalizado.</p>
        )}
      </div>
    </div>
  );
}
