"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa"

export default function AIEngine() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Response data:", data)

      if (!data || Object.keys(data).length === 0) {
        throw new Error("Empty response received from server")
      }

      if (data.error) {
        throw new Error(data.error)
      }

      localStorage.setItem("results", JSON.stringify(data))
      router.push("/results")
    } catch (error) {
      console.error("Error:", error)
      setError(`Error: ${error.message}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-emerald-50/50 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-heading font-bold mb-8 text-center">
          <span className="gradient-text">AI Plant Disease Detection</span>
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              {preview ? (
                <motion.img
                  src={preview}
                  alt="Preview"
                  className="w-64 h-64 object-cover rounded-lg mb-4 shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="w-64 h-64 border-4 border-dashed border-emerald-200 rounded-lg flex items-center justify-center mb-4 bg-emerald-50">
                  <FaCloudUploadAlt className="w-16 h-16 text-emerald-400" />
                </div>
              )}
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg
                         shadow-lg transition-all duration-300
                         hover:bg-amber-600 hover:shadow-xl hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50
                         active:bg-amber-700 active:shadow-inner"
              >
                Choose File
              </label>
              <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              {file && <p className="mt-2 text-sm text-emerald-600 font-medium">{file.name}</p>}
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
              disabled={!file || isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Analyze Plant"
              )}
            </motion.button>
          </form>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

