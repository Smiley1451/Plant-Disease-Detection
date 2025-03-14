"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">🍀 AI Engine 🍀</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            {preview && <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-lg mb-4" />}
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Choose File
            </label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {file && <p className="mt-2">{file.name}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-green-700 transition duration-300"
            disabled={!file || isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Why is it necessary to detect disease in plants?</h2>
        <p>
          Plant diseases affect the growth of their respective species. Proper disease diagnosis is necessary for
          effective control measures. Without proper identification of the disease and the disease-causing agent,
          disease control measures can be a waste of time and money and can lead to further plant losses.
        </p>
      </div>
    </div>
  )
}

