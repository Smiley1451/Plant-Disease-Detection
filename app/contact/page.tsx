"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-emerald-50/50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-heading font-bold mb-8">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-xl text-emerald-800 max-w-2xl mx-auto">
            Have questions about plant care? Need help with disease diagnosis? We're here to help!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-emerald-800 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-emerald-200
                         bg-white shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-emerald-800 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-emerald-200
                         bg-white shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-emerald-800 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200
                         bg-white shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="How can we help you?"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg
                       shadow-lg transition-all duration-300
                       hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50
                       active:bg-emerald-700 active:shadow-inner
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center">
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </div>
              )}
            </motion.button>
          </form>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center"
            >
              <FaCheckCircle className="mr-2" />
              Thank you for your message! We'll get back to you soon.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

