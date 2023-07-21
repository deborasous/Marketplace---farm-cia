import PrivateRoute from '@/routes/privateRoute';

const DepositPage: React.FC = () => {
  return (
    <PrivateRoute redirectRoute="/medicamentos">
      <div>
        <h1>Depositos</h1>
        <p>Aqui você pode exibir o conteúdo da página de depositos.</p>
      </div>
    </PrivateRoute>
  );
};

export default DepositPage;
