import './globals-test.css'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">TribeTaxi Test</h1>
      <p className="text-xl text-gray-600 mb-8">CSS is working!</p>
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
        Test Button
      </button>
    </div>
  )
}