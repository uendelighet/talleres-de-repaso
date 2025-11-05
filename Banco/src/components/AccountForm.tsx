import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { addAccount, updateAccount } from '../features/accounts/accountSlice';
import { Account } from '../types/types';

const AccountForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { accounts } = useSelector((state: RootState) => state.accounts);
  const { users } = useSelector((state: RootState) => state.users);

  const existingAccount = accounts.find(a => a.id === Number(id));

  const [formData, setFormData] = useState<Account>({
    id: existingAccount?.id || Date.now(),
    userId: existingAccount?.userId || (users[0]?.id ?? 1),
    accountType: existingAccount?.accountType || 'Ahorros',
    balance: existingAccount?.balance || 0,
    status: existingAccount?.status || 'Activa',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'balance' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateAccount(formData));
    } else {
      dispatch(addAccount(formData));
    }
    navigate('/cuentas');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {id ? 'Editar Cuenta Bancaria' : 'Registrar Nueva Cuenta'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cliente */}
        <div>
          <label className="block mb-1">Cliente</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de cuenta */}
        <div>
          <label className="block mb-1">Tipo de Cuenta</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="Ahorros">Ahorros</option>
            <option value="Corriente">Corriente</option>
          </select>
        </div>

        {/* Saldo */}
        <div>
          <label className="block mb-1">Saldo</label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block mb-1">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
          </select>
        </div>

        {/* Botón de acción */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {id ? 'Actualizar Cuenta' : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
