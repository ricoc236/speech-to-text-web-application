import { motion, type Variants } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Hero() {
  const navigate = useNavigate();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
      },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };


  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#E0F7FA] to-white" />
      <div className="absolute top-0 right-0 z-0 w-3/4 h-3/4 bg-[#85D1DB] opacity-10 transform rotate-12 -translate-y-1/4 translate-x-1/4 rounded-[80px]" />
      <div className="absolute bottom-0 left-0 z-0 w-1/2 h-1/2 bg-[#A0D9EF] opacity-10 transform -rotate-12 translate-y-1/2 -translate-x-1/2 rounded-[80px]" />


      
      <Navbar />

      <motion.div
        className="flex flex-1 items-center justify-center p-8 pt-16 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="text-center w-full max-w-2xl mx-auto p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl">
         
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-[#85D1DB] drop-shadow-lg"
            variants={itemVariants}
          >
            Welcome to Textify!
          </motion.h1>

 
          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-4 font-medium"
            variants={itemVariants}
          >
            Convert Speech to Text! Using the power of AI.
          </motion.p>
          
          <motion.p
            className="text-md md:text-lg text-gray-500 mb-8"
            variants={itemVariants}
          >
            Textify delivers accurate and lightning-fast transcriptions, helping you turn spoken words into written documents in seconds.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            
            <motion.button
              className="px-10 py-4 font-semibold text-lg text-white rounded-full bg-gradient-to-r from-[#85D1DB] to-[#A0D9EF] hover:from-[#A0D9EF] hover:to-[#85D1DB] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#85D1DB] focus:ring-opacity-50 shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/recorder");
              }}
            >
              Get Started
            </motion.button>
            <motion.a 
              href="/"
              className="text-gray-600 font-medium hover:underline hover:text-[#85D1DB] transition-colors duration-200"
              variants={itemVariants}
              onClick={(e) => { e.preventDefault(); console.log('Learn More clicked'); }}
            >
              Learn More &rarr;
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
