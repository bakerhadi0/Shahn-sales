const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const getToken = ()=> localStorage.getItem('token');
export const setToken = (t)=> localStorage.setItem('token', t);

async function req(path, options={}){
  const headers = {'Content-Type':'application/json', ...(options.headers||{})};
  const token = getToken();
  if(token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {...options, headers});
  if(!res.ok) throw new Error((await res.json()).message || 'Request error');
  return res.json();
}

export const login = (email, password)=> req('/api/auth/login', {method:'POST', body:JSON.stringify({email,password})});
export const register = (name, email, password)=> req('/api/auth/register', {method:'POST', body:JSON.stringify({name,email,password})});

export const listProducts = ()=> req('/api/products');
export const createProduct = (data)=> req('/api/products', {method:'POST', body:JSON.stringify(data)});
export const updateProduct = (id, data)=> req(`/api/products/${id}`, {method:'PUT', body:JSON.stringify(data)});
export const deleteProduct = (id)=> req(`/api/products/${id}`, {method:'DELETE'});

export const listSales = (params='')=> req(`/api/sales${params}`);
export const createSale = (data)=> req('/api/sales', {method:'POST', body:JSON.stringify(data)});
export const updateSale = (id, data)=> req(`/api/sales/${id}`, {method:'PUT', body:JSON.stringify(data)});
export const deleteSale = (id)=> req(`/api/sales/${id}`, {method:'DELETE'});
