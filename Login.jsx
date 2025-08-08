import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register, setToken } from '../lib/api.js'

export default function Login(){
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [name, setName] = useState('Admin')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      const data = mode==='login' ? await login(email, password) : await register(name, email, password);
      setToken(data.token); nav('/')
    }catch(err){ setError(err.message) }
  }

  return (
    <div style={{display:'grid', placeItems:'center', height:'100dvh', fontFamily:'system-ui'}}>
      <form onSubmit={submit} style={{border:'1px solid #ddd', padding:24, borderRadius:8, minWidth:320}}>
        <h3 style={{marginTop:0}}>{mode==='login'?'Login':'Register'}</h3>
        {mode==='register' && (
          <div style={{marginBottom:8}}>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%'}}/>
          </div>
        )}
        <div style={{marginBottom:8}}>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:'100%'}}/>
        </div>
        <div style={{marginBottom:8}}>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:'100%'}}/>
        </div>
        {error && <div style={{color:'crimson', marginBottom:8}}>{error}</div>}
        <button type="submit" style={{width:'100%'}}>{mode==='login'?'Sign in':'Create account'}</button>
        <div style={{marginTop:8, fontSize:12}}>
          {mode==='login' ? 'No account?' : 'Have an account?'}{' '}
          <a href="#" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Register':'Login'}</a>
        </div>
      </form>
    </div>
  )
}
