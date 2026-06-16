import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">

        {/* Link da Loja - Esquerda */}
        <div className="text-white text-lg">
          <Link href="/" className="hover:text-gray-400">
            Loja Aleatória
          </Link>
        </div>

        {/* Links de Pedidos e Carrinho - Direita */}
        <div className="text-white text-lg flex space-x-20">
          <Link href="/PagePedidos" className="hover:text-gray-400">
            Pedidos
          </Link>
          <Link href="/PageCarrinho" className="hover:text-gray-400">
            Carrinho
          </Link>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
