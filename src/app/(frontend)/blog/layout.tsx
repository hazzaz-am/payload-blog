import { ReactNode } from 'react'

export default function BlogIndexLayout({ children }: { children: ReactNode }) {
  return <div className="dev-container py-20">{children}</div>
}
