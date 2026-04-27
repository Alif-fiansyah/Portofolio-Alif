import { HeroSection } from '@/components/ui/hero-section'
import { DynamicNavbar } from '@/components/sections/dynamic-navbar'
import { RevealText } from '@/components/ui/reveal-text'
import { TiltCard } from '@/components/ui/tilt-card'
import { motion } from 'framer-motion'
import { Quote, CheckCircle, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const products = [
  { 
    title: "Frame Mahar Acrylic", 
    desc: "Koleksi Claudia & Ridho dengan kelopak bunga premium", 
    img: "/WhatsApp Image 2026-04-27 at 15.12.42.jpeg", 
    size: "lg" 
  },
  { 
    title: "Dulang Series", 
    desc: "Elegan bersemi dengan aksen Calla Lily", 
    img: "/WhatsApp Image 2026-04-27 at 15.12.43.jpeg", 
    size: "lg" 
  },
  { 
    title: "Luxury Gold Series", 
    desc: "Sentuhan tradisi dalam balutan modern", 
    img: "/WhatsApp Image 2026-04-27 at 15.12.44.jpeg", 
    size: "sm" 
  },
  { 
    title: "Luxury Gold Series", 
    desc: "Set perhiasan dan aksesoris eksklusif", 
    img: "/WhatsApp Image 2026-04-27 at 15.12.44 (1).jpeg", 
    size: "sm" 
  },
  { 
    title: "Luxury Gold Series", 
    desc: "Detail bordir Clara & Wisnu", 
    img: "/WhatsApp Image 2026-04-27 at 15.12.44 (2).jpeg", 
    size: "md" 
  },
  { 
    title: "Luxury Gold Series", 
    desc: "Keindahan yang tersusun rapi", 
    img: "/WhatsApp Image 2026-04-27 at 15.13.07.jpeg", 
    size: "lg" 
  },
  { 
    title: "Dulang Gold", 
    desc: "Pilihan terbaik untuk momen sakral", 
    img: "/WhatsApp Image 2026-04-27 at 15.13.07 (1).jpeg", 
    size: "lg" 
  },
]

export default function App() {
  return (
    <main className="relative bg-background overflow-x-hidden">
      <DynamicNavbar />
      
      {/* Hero Section */}
      <HeroSection 
        title="Elegan Bersemi dalam Tradisi"
        description="Pusat hantaran pernikahan eksklusif dengan kurasi artisanal terbaik. Keindahan yang nyata dalam setiap detail."
        imageSrc="/hero_main.png"
      />

      {/* Philosophy Section */}
      <section id="about" className="py-20 md:py-32 container-app">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            <span className="text-eyebrow text-center lg:text-left block">Filosofi Kami</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-brand-900 leading-[1.1] text-center lg:text-left">
              <RevealText text="Sekar Arum" overlayColor="text-brand-500" />
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center lg:text-left">
              Sekar Arum merepresentasikan rangkaian seserahan yang ditata seindah bunga, penuh kelembutan, ketelitian, dan nilai estetika. Keharuman dalam makna filosofis mencerminkan doa dan harapan agar ikatan AR & pernikahan yang diawali dengan seserahan ini senantiasa membawa kebahagiaan, keharmonisan, dan nama baik bagi kedua mempelai.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-4">
              {[
                { icon: <CheckCircle size={18} />, text: "Artesan Lokal" },
                { icon: <Layers size={18} />, text: "Desain Eksklusif" },
                { icon: <CheckCircle size={18} />, text: "Kualitas Premium" }
              ].map((item, i) => (
                <span key={i} className="px-4 py-2 border border-brand-200 rounded-full text-brand-700 bg-brand-50 flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
                  {item.icon} {item.text}
                </span>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <TiltCard className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-brand-100 group shadow-2xl mx-auto max-w-[500px] lg:max-w-none">
              <img 
                src="/profil.jpeg" 
                alt="Artisanal Decor" 
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent flex items-end p-8 md:p-12">
                  <div className="text-white" style={{ transform: 'translateZ(50px)' }}>
                    <Quote size={40} className="mb-4 text-brand-300 hidden md:block" />
                    <p className="text-xl md:text-2xl font-display italic">"Keindahan abadi berawal dari ketelitian."</p>
                  </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="collections" className="py-20 md:py-32 bg-brand-50">
        <div className="container-app">
          <div className="text-center mb-12 md:mb-20 max-w-2xl mx-auto px-4">
            <span className="text-eyebrow">Mahakarya Pilihan</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 text-brand-900">Koleksi Eksklusif Kami</h2>
            <p className="mt-4 md:mt-6 text-brand-800/60 text-sm md:text-base">Hantaran asli hasil kurasi SekarArum untuk menyempurnakan hari istimewa Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative group cursor-pointer",
                  product.size === "lg" ? "sm:col-span-2 lg:row-span-2" : "",
                  product.size === "md" ? "sm:col-span-2" : ""
                )}
              >
                <TiltCard className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white border border-brand-100 shadow-sm hover:shadow-xl transition-all">
                  <div className={cn(
                    "relative overflow-hidden",
                    product.size === "lg" ? "aspect-square sm:aspect-auto h-full min-h-[300px]" : "aspect-[4/5]",
                    product.size === "md" ? "aspect-video sm:aspect-video" : ""
                  )}>
                    <img 
                      src={product.img} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/10 to-transparent p-6 md:p-10 flex flex-col justify-end lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="text-xl md:text-2xl font-display font-bold text-white mb-2" style={{ transform: 'translateZ(30px)' }}>{product.title}</h4>
                      <p className="text-brand-100/80 text-xs md:text-sm" style={{ transform: 'translateZ(20px)' }}>{product.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Contact CTA */}
      <section id="contact" className="bg-brand-900 py-20 md:py-32 text-center px-4">
        <div className="container-app">
          <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-6">Wujudkan Hantaran Impian</h2>
          <p className="text-brand-200/70 text-base md:text-lg mb-10 md:mb-12 max-w-xl mx-auto">Tim kurator kami siap membantu merancang hantaran yang personal dan berkesan untuk hari spesial Anda.</p>
          <a
            href="https://wa.link/1gmn8x"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto px-12 py-4 md:py-5 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 text-lg"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-100 py-12 md:py-16">
        <div className="container-app text-center">
           <h2 className="font-display font-bold text-2xl md:text-3xl mb-4 text-brand-900">SekarArum</h2>
           <p className="text-brand-900/50 max-w-xs md:max-w-sm mx-auto mb-8 md:mb-10 text-sm md:text-base px-4">Artisanal Hantaran & Wedding Gift Curator. Menghadirkan keindahan tradisi dalam setiap detail.</p>
           <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm font-bold text-brand-900/60 mb-10 md:mb-12">
              <a href="https://www.instagram.com/sekar______arum/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500">INSTAGRAM</a>
              <a href="https://wa.link/1gmn8x" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500">WHATSAPP</a>
           </div>
           <div className="text-[10px] md:text-xs text-muted-foreground border-t border-brand-50 pt-8 uppercase tracking-widest px-4">
              &copy; 2026 SekarArum Hantaran. Dibuat dengan cinta untuk tradisi.
           </div>
        </div>
      </footer>
    </main>
  )
}
