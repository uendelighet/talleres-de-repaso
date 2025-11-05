import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { createUser, updateUser } from '../features/users/userSlice';

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useSelector((state: RootState) => state.users);

  const existingUser = users.find(u => u.id === Number(id));

  const [formData, setFormData] = useState({
    name: existingUser?.name || '',
    email: existingUser?.email || '',
    phone: existingUser?.phone || '',
    address: existingUser?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateUser({ ...formData, id: Number(id) }));
    } else {
      dispatch(createUser({ ...formData } as any));
    }
    navigate('/usuarios');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{id ? 'Editar Cliente' : 'Registrar Cliente'}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['name', 'email', 'phone', 'address'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
