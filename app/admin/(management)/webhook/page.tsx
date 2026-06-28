'use client'

import { useState } from 'react'
import axios from 'axios'
import { Loader2, Send, Webhook } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/dashboard/page-header'

const samples={
  'charge.success':{event:'charge.success',data:{reference:'test-ref-success-001',status:'success',amount:5000,currency:'NGN'}},
  'charge.failed':{event:'charge.failed',data:{reference:'test-ref-failed-001',status:'failed',amount:5000,currency:'NGN'}},
  'charge.refunded':{event:'charge.refunded',data:{reference:'test-ref-refund-001',status:'refunded',amount:5000,currency:'NGN'}},
}

export default function WebhookPage(){
  const [sample,setSample]=useState<keyof typeof samples>('charge.success')
  const [body,setBody]=useState(JSON.stringify(samples['charge.success'],null,2))
  const [signature,setSignature]=useState('valid')
  const [busy,setBusy]=useState(false)
  const [result,setResult]=useState<unknown>(null)
  function loadSample(value:keyof typeof samples){setSample(value);setBody(JSON.stringify(samples[value],null,2));setResult(null)}
  async function send(){let payload:unknown;try{payload=JSON.parse(body)}catch{toast.error('Payload must be valid JSON');return}setBusy(true);setResult(null);try{const response=await axios.post('/api/admin/webhook-test',{payload,signature});setResult(response.data);toast.success('Webhook test completed')}catch(error){const message=axios.isAxiosError(error)?error.response?.data??error.message:'Webhook test failed';setResult({error:message});toast.error('Webhook endpoint is not connected yet')}finally{setBusy(false)}}
  return <div className="dashboard-content"><PageHeader eyebrow="DEVELOPER TOOLS" title="Webhook tester" description="Test Kora-compatible payment payloads against the configured backend endpoint."/><div className="webhook-grid"><section className="panel webhook-card"><div className="panel-heading"><div><h2>Test payload</h2><p>Use a sample or edit the JSON manually.</p></div></div><label><span>Sample event</span><select value={sample} onChange={event=>loadSample(event.target.value as keyof typeof samples)}>{Object.keys(samples).map(key=><option key={key}>{key}</option>)}</select></label><label><span>Payload JSON</span><textarea value={body} onChange={event=>setBody(event.target.value)} rows={16}/></label><div className="webhook-actions"><label><span>Signature mode</span><select value={signature} onChange={event=>setSignature(event.target.value)}><option value="valid">Valid HMAC</option><option value="invalid">Invalid signature</option></select></label><button className="primary-button" onClick={send} disabled={busy}>{busy?<Loader2 className="spin" size={16}/>:<Send size={16}/>}Send test</button></div></section><section className="panel webhook-card"><div className="panel-heading"><div><h2>Result</h2><p>Verification and endpoint response.</p></div></div>{result?<pre className="payload-preview result-preview">{JSON.stringify(result,null,2)}</pre>:<div className="empty-table-state webhook-empty"><Webhook/><strong>Run a test to see the response</strong><span>The frontend posts to /api/admin/webhook-test.</span></div>}</section></div></div>
}
