"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaLeaf, FaShieldAlt, FaShoppingCart } from "react-icons/fa"

interface ResultsData {
  title: string
  description: string
  prevent: string
  image_url: string
  supplement_name: string
  supplement_image_url: string
  supplement_buy_link: string
}

export default function Results() {
  const [results, setResults] = useState<ResultsData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedResults = localStorage.getItem("results")
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        if (Object.keys(parsedResults).length === 0) {
          throw new Error("Empty results data")
        }
        setResults(parsedResults)
      } catch (error) {
        console.error("Error parsing results:", error)
        setError("Failed to load results. Please try again.")
      }
    } else {
      setError("No results found. Please try submitting an image again.")
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-primary mb-6">Error</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/ai-engine">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-primary-light transition duration-300"
            >
              Try Again
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FaLeaf className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold text-primary mb-6">Loading Results...</h1>
        </motion.div>
      </div>
    )
  }

  const { title, description, prevent, image_url, supplement_name, supplement_image_url, supplement_buy_link } = results

  return (
    <div className="min-h-screen bg-background py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-bold font-display mb-8 text-center">
          <span className="gradient-text">{title}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={image_url} alt={title} className="w-full h-64 object-cover rounded-lg shadow-md" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 flex items-center text-gray-900">
                <FaLeaf className="mr-2 text-primary" />
                Description
              </h2>
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 flex items-center text-gray-900">
                <FaShieldAlt className="mr-2 text-secondary" />
                Prevention
              </h2>
              <p className="text-gray-600">{prevent}</p>
            </div>
          </motion.div>
        </div>
        {supplement_name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center gradient-text">Recommended Supplement</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <img
                src={supplement_image_url}
                alt={supplement_name}
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-8"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{supplement_name}</h3>
                <a href={supplement_buy_link} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Buy Product
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

