import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { getToken, setToken } from '../lib/api.js'

export default function App(){
  const nav = useNavigate();
  React.useEffect(()=>{ if(!getToken()) nav('/login'); },[]);
  const logout = ()=>{ setToken(''); localStorage.removeItem('token'); nav('/login'); };
  return (
    <div style={{fontFamily:'system-ui', padding:'16px'}}>
      <header style={{display:'flex', gap:16, alignItems:'center', marginBottom:16}}>
        <h2 style={{margin:0}}>Shahn Sales</h2>
        <nav style={{display:'flex', gap:10}}>
          <Link to="/products">Products</Link>
          <Link to="/sales">Sales</Link>
        </nav>
        <div style={{marginLeft:'auto'}}>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <Outlet/>
    </div>
  )
}
