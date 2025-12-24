import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-12 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif mb-4"
        >
          Celestial Harmony
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-stone-600 max-w-2xl"
        >
          A digital space dedicated to the art of piano, performance, and musical exploration.
        </motion.p>
      </section>

      {/* Piano Keys Visual Detail */}
      <div className="flex justify-center space-x-1 opacity-20 mb-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`h-24 w-8 rounded-b ${i % 2 === 0 ? 'bg-black' : 'bg-stone-300'}`} />
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="max-w-4xl mx-auto px-6 grid gap-12 pb-20">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
          <h2 className="text-2xl font-serif mb-4 italic">The Journey</h2>
          <p className="leading-relaxed">
            Welcome to my portfolio. Whether you're here to listen to my latest recordings or 
            learn more about my classical training, I'm glad you've arrived.
          </p>
        </div>
      </div>
    </div>
  );
}