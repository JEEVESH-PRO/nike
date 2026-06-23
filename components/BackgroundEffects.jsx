'use client'

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute rounded-full"
        style={{
          left: '10%', top: '20%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(204,0,0,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-slow 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          right: '10%', bottom: '15%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-slow 14s ease-in-out 3s infinite',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
    </div>
  )
}
