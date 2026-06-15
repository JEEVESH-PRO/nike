'use client'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
      />
    </div>
  )
}
