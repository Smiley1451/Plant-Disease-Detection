"use client"

import { motion } from "framer-motion"
import { FaShoppingCart, FaStar } from "react-icons/fa"

const products = [
  {
    id: 1,
    name: "Organic Plant Food",
    price: 1499,
    discountedPrice: 1199,
    rating: 4.5,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FPlant-Food-Bio-Stimulant-Micronutrients-Fertilizer%2Fdp%2FB0DDTQG6K1&psig=AOvVaw1dguZ_Ye3FXO4eYGfbCJhP&ust=1735578371500000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPClvbi7zYoDFQAAAAAdAAAAABAE",
    description: "Complete nutrition for all types of plants",
    link: "https://www.amazon.in/s?k=organic+plant+food",
  },
  {
    id: 2,
    name: "Disease Control Spray",
    price: 899,
    discountedPrice: 749,
    rating: 4.8,
    image: "https://earthsally.com/wp-content/uploads/2021/11/Earths_Ally_Disease_Control_24.jpg",
    description: "Effective against common plant diseases",
    link: "https://www.amazon.in/s?k=plant+disease+control",
  },
  {
    id: 3,
    name: "Root Booster",
    price: 1299,
    discountedPrice: 1099,
    rating: 4.6,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2Fbig-leaf-Root-Booster-250%2Fdp%2FB0D8ZZQTXS&psig=AOvVaw3H7hPnvKyTnvAZwXoAgTAK&ust=1735578545968000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDEkIm8zYoDFQAAAAAdAAAAABAE",
    description: "Promotes healthy root development",
    link: "https://www.amazon.in/s?k=root+booster",
  },
  {
    id: 4,
    name: "Leaf Shine Spray",
    price: 699,
    discountedPrice: 599,
    rating: 4.3,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcnairsto.en.made-in-china.com%2Fproduct%2FBfrUGwkVXRcj%2FChina-Make-Your-Plant-Shine-Natural-Aerosol-Leaf-Shine-Spray-Beautifying-Leaf-Shine-Spray-for-Houseplant-Leaves.html&psig=AOvVaw3auUiUJSM0wtkaEu2F0Tp1&ust=1735578584318000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCbvpq8zYoDFQAAAAAdAAAAABAE",
    description: "Keeps leaves clean and healthy",
    link: "https://www.amazon.in/s?k=leaf+shine+spray",
  },
]

export default function Market() {
  return (
    <div className="min-h-screen bg-emerald-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-heading font-bold mb-8">
            <span className="gradient-text">Plant Care Products</span>
          </h1>
          <p className="text-xl text-emerald-800 max-w-2xl mx-auto">
            Discover our curated selection of high-quality plant care products to keep your garden healthy and thriving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                    <FaStar className="w-4 h-4 mr-1" />
                    {product.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-emerald-800 mb-2">{product.name}</h3>
                  <p className="text-emerald-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-emerald-700">₹{product.discountedPrice}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
                    </div>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 text-white px-4 py-2 rounded-lg
                               shadow-lg transition-all duration-300
                               hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50
                               active:bg-emerald-700 active:shadow-inner
                               flex items-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

