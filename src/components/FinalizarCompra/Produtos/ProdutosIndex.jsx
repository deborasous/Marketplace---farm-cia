import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function CarrinhoResumo({ itensDoCarrinho, totalDaCompra }) {
  return (
    <Box p={4}>
      <Paper elevation={1}>
        <Typography variant="h6" p={2}>
          Itens no Carrinho:
        </Typography>
        {itensDoCarrinho.map((item, index) => (
          <div key={index}>
            <Typography variant="body1" p={2}>
              Nome: {item.nomeProduto}
            </Typography>
            <Typography variant="body1" p={2}>
              Quantidade: {item.quantidadeProdutoVendido}
            </Typography>
            <Typography variant="body1" p={2}>
              Preço Unitário: R$ {item.precoUnitario}
            </Typography>
          </div>
        ))}
        <Typography variant="h6" p={2}>
          Total da Compra: R$ {totalDaCompra.toFixed(2)}
        </Typography>
      </Paper>
    </Box>
  );
}

export const Produtos = () => {
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]);
  const [totalDaCompra, setTotalDaCompra] = useState(0);

  useEffect(() => {
    const itensCarrinho = JSON.parse(
      localStorage.getItem('itensCarrinho') || '[]'
    );
    setItensDoCarrinho(itensCarrinho);
    
    const total = itensCarrinho.reduce(
      (total, item) => total + item.quantidadeProdutoVendido * parseFloat(item.precoUnitario),
      0
    );

    setTotalDaCompra(total);
  }, []);

  return (
    <CarrinhoResumo
      itensDoCarrinho={itensDoCarrinho}
      totalDaCompra={totalDaCompra}
    />
  );
};
