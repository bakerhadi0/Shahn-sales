import React, { useEffect, useState } from 'react'
import { listProducts, listSales, createSale, updateSale, deleteSale } from '../lib/api.js'

export default function Sales(){
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [form, setForm] = useState({product:'', quantity:1, total:0, note:''})
  const [editing, setEditing] = useState(null)

  const load = async ()=>{
    setProducts(await listProducts())
    setSales(await listSales())
  }

  useEffect(()=>{ load() },[])
  useEffect(()=>{
    const p = products.find(p=>p._id===form.product)
    const price = p? Number(p.price): 0
    const qty = Number(form.quantity||0)
    setForm(f=>({...f, total: price*qty}))
  }, [form.product, form.quantity, products])

  const submit = async (e)=>{
    e.preventDefault()
    const data = {...form, quantity:Number(form.quantity), total:Number(form.total)}
    if(editing) await updateSale(editing._id, data)
    else await createSale(data)
    setForm({product:'', quantity:1, total:0, note:''})
    setEditing(null)
    setSales(await listSales())
  }

  const edit = (it)=>{ setEditing(it); setForm({product: it.product?._id, quantity: it.quantity, total: it.total, note: it.note || ''}) }
  const removeIt = async (id)=>{ if(confirm('Delete?')){ await deleteSale(id); setSales(await listSales()) } }

  return (
    <div>
      <h3>Sales</h3>
      <form onSubmit={submit} style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8}}>
        <select value={form.product} onChange={e=>setForm({...form, product:e.target.value})}>
          <option value="">Select product</option>
          {products.map(p=>(<option key={p._id} value={p._id}>{p.name}</option>))}
        </select>
        <input type="number" min="1" placeholder="quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})}/>
        <input type="number" placeholder="total" value={form.total} readOnly/>
        <input placeholder="note" value={form.note} onChange={e=>setForm({...form, note:e.target.value})}/>
        <button>{editing?'Update':'Add'}</button>
        {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({product:'', quantity:1, total:0, note:''})}}>Cancel</button>}
      </form>

      <table border="1" cellPadding="6" style={{marginTop:12, width:'100%'}}>
        <thead><tr>
          <th>Product</th><th>Qty</th><th>Total</th><th>Note</th><th>Date</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {sales.map(it=>(
            <tr key={it._id}>
              <td>{it.product?.name || '-'}</td><td>{it.quantity}</td><td>{it.total}</td><td>{it.note}</td><td>{new Date(it.date).toLocaleDateString()}</td>
              <td>
                <button onClick={()=>edit(it)}>Edit</button>{' '}
                <button onClick={()=>removeIt(it._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
