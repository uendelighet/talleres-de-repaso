import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { deleteAccount } from '../features/accounts/accountSlice';
import { Link } from 'react-router-dom';

const AccountList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts } = useSelector((state: RootState) => state.accounts);
  const { users } = useSelector((state: RootState) => state.users);

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Cliente desconocido';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Cuentas Bancarias</h2>
      <Link to="/cuentas/create" className="bg-green-600 text-white px-4 py-2 rounded">
        + Nueva Cuenta
      </Link>

      {accounts.length === 0 ? (
        <p className="mt-6 text-gray-500">No hay cuentas registradas.</p>
      ) : (
        <table className="w-full mt-6 border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="border p-2">#</th>
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">Saldo</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{getUserName(account.userId)}</td>
                <td className="border p-2">{account.accountType}</td>
                <td className="border p-2">${account.balance.toLocaleString()}</td>
                <td className={`border p-2 ${account.status === 'Activa' ? 'text-green-600' : 'text-red-600'}`}>
                  {account.status}
                </td>
                <td className="border p-2 flex gap-2">
                  <Link
                    to={`/cuentas/edit/${account.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => dispatch(deleteAccount(account.id))}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountList;
