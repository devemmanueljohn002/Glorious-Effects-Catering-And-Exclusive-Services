export default function PageHeader({ eyebrow = 'MANAGEMENT', title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return <section className="page-heading"><div><p>{eyebrow}</p><h1>{title}</h1><span>{description}</span></div>{action && <div className="heading-actions">{action}</div>}</section>
}
