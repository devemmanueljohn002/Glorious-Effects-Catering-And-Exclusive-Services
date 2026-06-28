'use client'

import { useMemo, useState } from 'react'
import { Download, MoreHorizontal, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from './page-header'

export type Column = { key: string; label: string }
export type Field = { key: string; label: string; type?: 'text' | 'number' | 'date' | 'select'; options?: string[] }
type Row = Record<string, string | number>

export default function ResourceManager({ title, description, singular, columns, fields, initialRows, statuses }: { title: string; description: string; singular: string; columns: Column[]; fields: Field[]; initialRows: Row[]; statuses?: string[] }) {
  const [rows, setRows] = useState(initialRows)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Row | null>(null)
  const [form, setForm] = useState<Row>({})
  const filtered = useMemo(() => rows.filter((row) => Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase())), [rows, query])

  function openNew() { setEditing(null); setForm(Object.fromEntries(fields.map((field) => [field.key, '']))); setModalOpen(true) }
  function openEdit(row: Row) { setEditing(row); setForm({ ...row }); setModalOpen(true) }
  function save(event: React.FormEvent) {
    event.preventDefault()
    if (fields.some((field) => !String(form[field.key] ?? '').trim())) return toast.error('Please complete all required fields')
    if (editing) setRows((current) => current.map((row) => row.id === editing.id ? { ...row, ...form } : row))
    else setRows((current) => [{ ...form, id: `${singular.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`, status: statuses?.[0] ?? 'Active' }, ...current])
    toast.success(`${singular} ${editing ? 'updated' : 'created'} successfully`)
    setModalOpen(false)
  }
  function remove(id: string | number) { setRows((current) => current.filter((row) => row.id !== id)); toast.success(`${singular} removed`) }
  function exportRows() { toast.success(`${title} report prepared for export`) }

  return <div className="dashboard-content">
    <PageHeader title={title} description={description} action={<><button className="outline-button" onClick={exportRows}><Download size={16}/> Export</button><button className="primary-button" onClick={openNew}><Plus size={16}/> Add {singular}</button></>} />
    <section className="management-stats"><div><span>Total {title.toLowerCase()}</span><strong>{rows.length}</strong></div><div><span>Active this month</span><strong>{Math.max(rows.length - 1, 0)}</strong></div><div><span>Needs attention</span><strong>1</strong></div></section>
    <section className="panel management-panel">
      <div className="manager-toolbar"><label className="manager-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${title.toLowerCase()}...`}/></label><span>{filtered.length} records</span></div>
      <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Actions</th></tr></thead><tbody>{filtered.map((row) => <tr key={String(row.id)}>{columns.map((column) => <td key={column.key}>{column.key === 'status' ? <select className={`table-status ${String(row[column.key]).toLowerCase().replaceAll(' ', '-')}`} value={row[column.key]} onChange={(event) => { setRows((current) => current.map((item) => item.id === row.id ? { ...item, status: event.target.value } : item)); toast.success('Status updated') }}>{(statuses ?? [String(row[column.key])]).map((status) => <option key={status}>{status}</option>)}</select> : column.key === 'id' || column.key === 'name' || column.key === 'client' || column.key === 'customer' ? <strong>{row[column.key]}</strong> : row[column.key]}</td>)}<td><div className="row-actions"><button className="icon-button" onClick={() => openEdit(row)} aria-label={`Edit ${row.id}`}><Pencil size={15}/></button><button className="icon-button danger" onClick={() => remove(row.id)} aria-label={`Delete ${row.id}`}><Trash2 size={15}/></button><button className="icon-button" aria-label={`More actions for ${row.id}`}><MoreHorizontal size={17}/></button></div></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No matching records found.</div>}</div>
    </section>
    {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><div className="modal" role="dialog" aria-modal="true" aria-label={`${editing ? 'Edit' : 'Add'} ${singular}`}><div className="modal-header"><div><span>{editing ? 'UPDATE RECORD' : 'NEW RECORD'}</span><h2>{editing ? `Edit ${singular}` : `Add ${singular}`}</h2></div><button className="icon-button" onClick={() => setModalOpen(false)} aria-label="Close modal"><X size={19}/></button></div><form onSubmit={save}><div className="form-grid">{fields.map((field) => <label key={field.key}><span>{field.label}</span>{field.type === 'select' ? <select value={String(form[field.key] ?? '')} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}><option value="">Select {field.label.toLowerCase()}</option>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input type={field.type ?? 'text'} value={String(form[field.key] ?? '')} onChange={(event) => setForm({ ...form, [field.key]: field.type === 'number' ? Number(event.target.value) : event.target.value })} />}</label>)}</div><div className="modal-footer"><button type="button" className="outline-button" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className="primary-button">Save {singular}</button></div></form></div></div>}
  </div>
}
