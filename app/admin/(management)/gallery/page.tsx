'use client'

import { useRef, useState } from 'react'
import { ImageIcon, Plus, Trash2, Upload } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/dashboard/page-header'

type GalleryItem={id:number;title:string;category:string;tone:string}
const seed:GalleryItem[]=[]

export default function GalleryPage(){
  const [items,setItems]=useState(seed)
  const input=useRef<HTMLInputElement>(null)
  function upload(files:FileList|null){if(!files?.length)return;const added=Array.from(files).map((file,index)=>({id:Date.now()+index,title:file.name.replace(/\.[^.]+$/,''),category:'New upload',tone:'gallery-gold'}));setItems(current=>[...added,...current]);toast.success(`${files.length} image${files.length>1?'s':''} uploaded`)}
  return <div className="dashboard-content"><PageHeader title="Gallery management" description="Curate the visual story of memorable GECES events and culinary work." action={<button className="primary-button" onClick={()=>input.current?.click()}><Upload size={16}/>Upload images</button>}/><input ref={input} hidden type="file" accept="image/*" multiple onChange={event=>upload(event.target.files)}/><section className="upload-zone" onClick={()=>input.current?.click()} onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();upload(event.dataTransfer.files)}}><div><Upload size={24}/></div><strong>Drop event photos here</strong><span>PNG, JPG or WEBP · up to 10MB each</span><button className="outline-button"><Plus size={15}/>Browse files</button></section><div className="gallery-toolbar"><div><strong>{items.length} media items</strong><span>Drag and drop to upload new work</span></div><select aria-label="Gallery category"><option>All categories</option><option>Weddings</option><option>Cakes</option><option>Corporate</option></select></div>{items.length===0?<section className="panel empty-table-state gallery-empty"><ImageIcon/><strong>No gallery images yet</strong><span>Upload real event or food photography to build the gallery.</span></section>:<section className="gallery-grid">{items.map(item=><article className={`gallery-card ${item.tone}`} key={item.id}><div className="gallery-placeholder"><ImageIcon size={32}/><span>GECES</span></div><div><span>{item.category}</span><strong>{item.title}</strong></div><button className="icon-button gallery-delete" onClick={()=>{setItems(current=>current.filter(row=>row.id!==item.id));toast.success('Gallery item removed')}} aria-label={`Delete ${item.title}`}><Trash2 size={15}/></button></article>)}</section>}</div>
}
