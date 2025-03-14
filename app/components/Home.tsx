import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">🍁 Plant Disease Detection 🍁</h1>
      <p className="text-xl mb-8">This AI Engine will help you detect diseases in various fruits and vegetables.</p>
      <Link
        href="/ai-engine"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
      >
        Try AI Engine
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {["Apple", "Blueberry", "Cherry", "Corn", "Grape", "Orange", "Peach", "Pepper Bell"].map((plant) => (
          <div key={plant} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`/placeholder.svg?height=200&width=200&text=${plant}`}
              alt={plant}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-lg font-semibold text-gray-900">{plant}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

