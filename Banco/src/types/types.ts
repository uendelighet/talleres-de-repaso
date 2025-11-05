export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Account {
  id: number;
  userId: number;
  accountType: 'Ahorros' | 'Corriente';
  balance: number;
  status: 'Activa' | 'Inactiva';
}
