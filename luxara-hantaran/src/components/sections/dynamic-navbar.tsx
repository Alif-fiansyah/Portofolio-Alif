import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DynamicNavbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastYRef.current
    if (Math.abs(diff) > 20) {
      if (latest < 50) {
        setHidden(false)
        setScrolled(false)
      } else {
        setHidden(diff > 0)
        setScrolled(latest > 100)
      }
      lastYRef.current = latest
    }
  })

  const navLinks = [
    { name: 'Koleksi', href: '#collections' },
    { name: 'Tentang Kami', href: '#about' },
  ]

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl px-6 py-3 rounded-full transition-all duration-300 border backdrop-blur-md',
          scrolled
            ? 'bg-white/80 border-brand-200 shadow-lg'
            : 'bg-white/40 border-white/20'
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <a href="/" className="font-display font-bold text-xl tracking-tight text-brand-900 ml-2 md:ml-6">
            SekarArum
          </a>

          {/* Links and CTA - Right Side Grouped */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-brand-900/60 hover:text-brand-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden md:block px-5 py-2 text-sm font-semibold text-white bg-brand-500 rounded-full hover:bg-brand-600 transition-all hover:scale-105 active:scale-95"
            >
              Mulai Konsultasi
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1, pointerEvents: 'auto' },
          closed: { clipPath: 'inset(10% 20% 80% 20% round 2rem)', opacity: 0, pointerEvents: 'none' },
        }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] bg-white border border-brand-100 p-8 shadow-2xl md:hidden"
      >
        <div className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-display font-bold text-brand-900"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-6 py-4 text-lg font-bold text-white bg-brand-500 rounded-2xl"
          >
            Mulai Konsultasi
          </a>
        </div>
      </motion.div>
    </>
  )
}
