import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function PageContainer({ children, className = '', as: Tag = 'div' }: Props) {
  return <Tag className={`page-container ${className}`}>{children}</Tag>
}
