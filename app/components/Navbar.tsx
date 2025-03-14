"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FaLeaf, FaMicroscope, FaStore, FaEnvelope } from "react-icons/fa"

const navItems = [
  { name: "Home", href: "/", icon: FaLeaf },
  { name: "AI Engine", href: "/ai-engine", icon: FaMicroscope },
  { name: "Market", href: "/market", icon: FaStore },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <FaLeaf className="h-8 w-8 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300" />
              <span className="ml-2 text-xl font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                PlantCare AI
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="ml-8 flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="mr-2" />
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

