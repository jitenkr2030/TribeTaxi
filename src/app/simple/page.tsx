import './simple.css'

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-green-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Simple Test</h1>
      <p className="text-xl text-white mb-8">If you see colors, Tailwind CSS is working!</p>
      <button className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
        Test Button
      </button>
      <div className="test-class mt-4">
        This should have red background with white text
      </div>
    </div>
  )
}