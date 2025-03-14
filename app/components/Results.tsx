"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Error</h1>
        <p className="text-red-600 mb-4">{error}</p>
        <Link
          href="/ai-engine"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
        >
          Try Again
        </Link>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Loading...</h1>
      </div>
    )
  }

  const { title, description, prevent, image_url, supplement_name, supplement_image_url, supplement_buy_link } = results

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={image_url} alt={title} className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{description}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Prevention</h2>
            <p>{prevent}</p>
          </div>
        </div>
      </div>
      {supplement_name && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Supplement</h2>
          <div className="flex flex-col items-center">
            <img
              src={supplement_image_url}
              alt={supplement_name}
              className="w-48 h-48 object-cover rounded-lg shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{supplement_name}</h3>
            <a
              href={supplement_buy_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-lg hover:bg-green-700 transition duration-300"
            >
              Buy Product
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

