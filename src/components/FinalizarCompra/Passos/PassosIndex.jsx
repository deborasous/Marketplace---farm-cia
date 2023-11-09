import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Produtos } from '../Produtos/ProdutosIndex';
import { Endereco } from '../Entrega/EntregaIndex';
import { Pagamento } from '../Pagamentos/PagamentoIndex';
import { CartContext } from '../../../contexts/carrinhoCompras';
import { api } from '../../../service/api';
import { toast } from 'react-toastify';

export function Passos() {
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const { limparCarrinho } = useContext(CartContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [compraEfetuada, setCompraEfetuada] = useState(false);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  useEffect(() => {
    const itensCarrinho =
      JSON.parse(localStorage.getItem('itensCarrinho')) || [];

    const itensFiltrados = itensCarrinho.map((item) => ({
      produtoId: item.id, 
      quantidadeProdutoVendido: item.quantidadeProdutoVendido,
      tipoPagamento: item.tipoPagamento,
    }));

    setDadosFiltrados(itensFiltrados);
  }, []);

  async function enviarDadosParaBanco() {
    try {
      const response = await api.post('/vendas/criar', dadosFiltrados);

      if (response.status === 200) {
        toast.success('Compra efetuada com sucesso');
      }
      setCompraEfetuada(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handleBack() {
    setCurrentStep(currentStep - 1);
  }

  const FinalizarCompra = () => {
    enviarDadosParaBanco(); 
    setCompraFinalizada(true);
    limparCarrinho();
    localStorage.removeItem('itensCarrinho');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep}>
        <Step>
          <StepLabel>Produto</StepLabel>
        </Step>
        <Step>
          <StepLabel>Endereço</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pagamento</StepLabel>
        </Step>
      </Stepper>

      {currentStep === 0 && !compraEfetuada && <Produtos />}
      {currentStep === 1 && !compraEfetuada && <Endereco />}
      {currentStep === 2 && !compraEfetuada && (
        <Pagamento atualizarDadosFiltrados={setDadosFiltrados} />
      )}

      <div className="flex justify-center gap-12">
        {currentStep > 0 && !compraEfetuada && (
          <Button
            className="m-3 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            style={{ backgroundColor: 'rgb(32,193,148)' }}
            onClick={handleBack}
          >
            Voltar
          </Button>
        )}

        {currentStep < 2 && !compraEfetuada && (
          <Button
            className="m-3 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            style={{ backgroundColor: 'rgb(32,193,148)' }}
            onClick={handleNext}
          >
            Próximo
          </Button>
        )}

        {currentStep === 2 && !compraEfetuada && (
          <Button
            className="m-3 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            style={{ backgroundColor: 'rgb(32,193,148)' }}
            onClick={() => {
              setCompraEfetuada(true);
              FinalizarCompra();
            }}
          >
            Finalizar
          </Button>
        )}

        {compraEfetuada && (
          <>
            <Alert severity="success">
              Compra efetuada com sucesso! Confira seu e-mail para mais
              informações.
            </Alert>
            <Button
              className="mt-6 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              style={{ backgroundColor: 'rgb(32,193,148)' }}
              onClick={() => {
                navigate('/comprador/medicamentos');
              }}
            >
              Nova Compra
            </Button>
          </>
        )}
      </div>
    </Box>
  );
}
