import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers, deleteUser } from '../features/users/userSlice';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Clientes del Banco</h2>
      <Link to="/usuarios/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ Nuevo Cliente</Link>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="border-b py-2 flex justify-between">
            <div>
              <strong>{user.name}</strong> — {user.email}
            </div>
            <div>
              <Link to={`/usuarios/edit/${user.id}`} className="text-blue-600 mr-2">Editar</Link>
              <button onClick={() => dispatch(deleteUser(user.id))} className="text-red-600">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
