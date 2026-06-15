'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function TransitionLink({ href, children, className, onClick, ...props }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey) return
    e.preventDefault()
    if (onClick) onClick(e)
    if (pathname !== href) router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
