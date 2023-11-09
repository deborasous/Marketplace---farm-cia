import { useContext } from 'react';

import { TbPigMoney } from 'react-icons/tb';
import { BsFillBarChartFill } from 'react-icons/bs';
import { ReportContext } from '../../contexts/ReportProvider';
import PaginationButtons from '../../components/molecules/paginationButtons/PaginationButtons';
import { Table } from '../../components/atoms/table/table';

export const AdminDashboard = () => {
  const {
    totalVendas,
    totalQuantidadeVendida,
    quantidadeTotalProdutos,
    produtosFiltrados,
    hasProducts,
  } = useContext(ReportContext);

  console.log(quantidadeTotalProdutos, 'dd');

  return (
    <section className="admin-dashboard px-8 py-10 w-full md:p-16">
      <div className="mx-auto">
        <div className="results pb-14 text-center">
          <div className="flex justify-between mb-10">
            <h2 className="text-slate-700 text-3xl font-semibold ">
              Resultado das suas Vendas
            </h2>
          </div>
          <div className="flex columns-2 gap-8 justify-around">
            <div className="flex justify-center gap-3 border-2 p-4 rounded w-full bg-white text-center ">
              <div className="p-3  rounded-full bg-[#8754ec]  max-h-[68px]">
                <TbPigMoney className="text-4xl text-[#c6b2f1]" />
              </div>
              <div className="grid gap-3">
                <h3 className="text-lg font-semibold text-slate-500">
                  Total de vendas
                </h3>
                <p className="text-3xl font-bold text-[#6B32DA]">
                  {totalVendas}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-3 border-2 p-4 rounded w-full bg-white text-center ">
              <div className="p-3 rounded-full bg-[#25D296]  max-h-[68px]">
                <BsFillBarChartFill className="text-4xl text-[#b3e9d6]" />
              </div>
              <div className="grid gap-3">
                <h3 className="text-lg font-semibold text-slate-500">
                  Quantidade Vendida
                </h3>
                <p className="text-3xl font-bold text-[#1dbd85] ">
                  {totalQuantidadeVendida}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" m-auto">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">
            Produtos em Estoque
          </h3>

          {produtosFiltrados && produtosFiltrados.length > 0 ? (
            <Table
              headers={[
                'ID',
                'Nome do Produto',
                'Preço Unitário',
                'Qtd em Estoque',
              ]}
              data={produtosFiltrados.map((produto) => [
                produto.id,
                produto.nomeProduto,
                produto.precoUnitario,
                produto.totalEstoque,
              ])}
            />
          ) : hasProducts ? null : (
            <p>Nenhum produto em estoque.</p>
          )}
        </div>
        <div className="pagination flex justify-between mt-4 pb-10">
          <PaginationButtons />
        </div>
      </div>
    </section>
  );
};
