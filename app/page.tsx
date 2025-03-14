"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaLeaf, FaMicroscope, FaChartLine, FaShieldAlt } from "react-icons/fa"

export default function Home() {
  return (
    <div className="min-h-screen leaf-pattern">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-8">
            <span className="gradient-text">Protect Your Plants</span>
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-emerald-800">
            Advanced AI-powered plant disease detection to keep your garden healthy and thriving. Upload a photo and get
            instant diagnosis and treatment recommendations.
          </p>
          <Link href="/ai-engine">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
              Start Diagnosis
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <FeatureCard
            icon={FaLeaf}
            title="Smart Detection"
            description="Advanced AI algorithms identify plant diseases with high accuracy"
            color="text-emerald-500"
          />
          <FeatureCard
            icon={FaMicroscope}
            title="Instant Analysis"
            description="Get immediate results and detailed diagnosis reports"
            color="text-amber-500"
          />
          <FeatureCard
            icon={FaChartLine}
            title="Treatment Plans"
            description="Receive customized treatment recommendations"
            color="text-emerald-600"
          />
          <FeatureCard
            icon={FaShieldAlt}
            title="Prevention Tips"
            description="Learn how to protect your plants from future diseases"
            color="text-amber-600"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-heading font-bold text-center mb-12 gradient-text">Supported Plants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Tomato", image: "https://cdn.pixabay.com/photo/2019/05/29/19/04/tomatoes-4238247_1280.jpg" },
              { name: "Apple", image: "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg" },
              { name: "Potato", image: "https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg" },
              { name: "Corn", image: "https://cdn.pixabay.com/photo/2015/05/26/17/42/pop-corn-785074_1280.jpg" },
              { name: "Grape", image: "https://cdn.pixabay.com/photo/2018/09/22/22/39/grapes-3695498_1280.jpg" },
              { name: "Cherry", image: "https://cdn.pixabay.com/photo/2016/05/24/13/29/olive-1412363_1280.jpg" },
              { name: "Pepper", image: "https://cdn.pixabay.com/photo/2016/08/03/20/41/bell-pepper-1567794_1280.jpg" },
              {
                name: "Strawberry",
                image: "https://cdn.pixabay.com/photo/2017/05/07/19/32/strawberry-2293337_1280.jpg",
              },
            ].map((plant) => (
              <motion.div key={plant.name} className="card group" whileHover={{ y: -5 }}>
                <img src={plant.image} alt={plant.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-heading font-semibold text-emerald-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {plant.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="card group">
      <div className={`${color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="w-10 h-10 mx-auto" />
      </div>
      <h3 className="text-xl font-heading font-semibold mb-2 text-emerald-800 group-hover:text-emerald-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-emerald-700">{description}</p>
    </motion.div>
  )
}

