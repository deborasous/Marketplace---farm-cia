import {MedicamentoCreate} from "../../components/Medicamentos/MedicamentoCreate";
import {MedicamentosListaAdmin} from "../../components/Medicamentos/MedicamentosListaAdmin";

export const MedicamentoAdmin = () => {
  return (
    <div>
      <MedicamentoCreate />
      <MedicamentosListaAdmin />
    </div>
  );
};
