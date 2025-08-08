import React, { useEffect, useState } from 'react'
import { listProducts, createProduct, updateProduct, deleteProduct } from '../lib/api.js'

export default function Products(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({name:'', category:'', size:'', price:0, printingType:'', template:''})
  const [editing, setEditing] = useState(null)
  const load = async ()=> setItems(await listProducts())

  useEffect(()=>{ load() },[])
  const submit = async (e)=>{
    e.preventDefault()
    if(editing){
      await updateProduct(editing._id, form)
    }else{
      await createProduct({...form, price: Number(form.price||0)})
    }
    setForm({name:'', category:'', size:'', price:0, printingType:'', template:''})
    setEditing(null)
    load()
  }
  const edit = (it)=>{ setEditing(it); setForm(it) }
  const removeIt = async (id)=>{ if(confirm('Delete?')){ await deleteProduct(id); load() } }

  return (
    <div>
      <h3>Products</h3>
      <form onSubmit={submit} style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
        {['name','category','size','printingType','template'].map(k=>(
          <input key={k} placeholder={k} value={form[k]||''} onChange={e=>setForm({...form, [k]:e.target.value})}/>
        ))}
        <input type="number" placeholder="price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
        <button>{editing?'Update':'Add'}</button>
        {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({name:'', category:'', size:'', price:0, printingType:'', template:''})}}>Cancel</button>}
      </form>

      <table border="1" cellPadding="6" style={{marginTop:12, width:'100%'}}>
        <thead><tr>
          <th>Name</th><th>Category</th><th>Size</th><th>Price</th><th>Printing</th><th>Template</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {items.map(it=>(
            <tr key={it._id}>
              <td>{it.name}</td><td>{it.category}</td><td>{it.size}</td><td>{it.price}</td><td>{it.printingType}</td><td>{it.template}</td>
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
