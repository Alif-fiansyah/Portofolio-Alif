import { cn } from '@/lib/utils'

export interface HeroSectionProps {
  title: string
  description: string
  imageSrc: string
  className?: string
}

export function HeroSection({
  title,
  description,
  imageSrc,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative w-full h-dvh flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background Image - Full Home */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt="SekarArum Hantaran"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/40" /> {/* Dark overlay for readability */}
      </div>

      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
        <h1
          className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-[clamp(2.5rem,10vw,7rem)] text-white"
        >
          {title}
        </h1>
        <p className="mt-8 text-xl leading-8 text-brand-50/80 max-w-2xl mx-auto font-medium">
          {description}
        </p>
      </div>
    </section>
  )
}
