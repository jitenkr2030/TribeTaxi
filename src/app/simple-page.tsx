import Link from "next/link";

export default function SimpleHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container">
        {/* Hero Section */}
        <section className="py-20">
          <div className="text-center">
            <div className="badge badge-green mb-4">
              🚖 Jharkhand's Own Ride App
            </div>
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Welcome to <span className="text-green-600">TribeTaxi</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Zero commission, transparent pricing, and reliable rides across Jharkhand. 
              Join the community-owned mobility platform that puts drivers and riders first.
            </p>
            <div className="flex flex-col gap-4 justify-center">
              <Link href="/rider/register" className="btn btn-primary">
                Book Your First Ride
              </Link>
              <Link href="/driver/register" className="btn btn-outline">
                Become a Driver
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose TribeTaxi?
            </h2>
            <p className="text-xl text-gray-600">
              Built for Jharkhand, by the community of Jharkhand
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Zero Commission</h3>
              </div>
              <p className="card-description">
                Drivers keep 100% of their earnings. No hidden fees, no commissions.
              </p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Safe & Secure</h3>
              </div>
              <p className="card-description">
                Verified drivers, tracked rides, and 24/7 support for your safety.
              </p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Jharkhand Wide</h3>
              </div>
              <p className="card-description">
                Available in Ranchi, Dhanbad, Bokaro, Deoghar, and more cities.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Explore TribeTaxi</h2>
            <div className="grid grid-cols-3 gap-8">
              <Link href="/rider/dashboard" className="card">
                <h3 className="card-title">Rider Dashboard</h3>
                <p className="card-description">Book and manage your rides</p>
              </Link>
              
              <Link href="/driver/dashboard" className="card">
                <h3 className="card-title">Driver Dashboard</h3>
                <p className="card-description">Manage your driving business</p>
              </Link>
              
              <Link href="/admin/dashboard" className="card">
                <h3 className="card-title">Admin Panel</h3>
                <p className="card-description">Platform management and analytics</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Info */}
        <section className="py-20">
          <div className="card">
            <h2 className="card-title text-center">Demo Login Credentials</h2>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="font-bold">Admin</h3>
                <p>Email: admin@tribetaxi.com</p>
                <p>Password: password123</p>
              </div>
              <div>
                <h3 className="font-bold">Rider</h3>
                <p>Email: rajesh@example.com</p>
                <p>Password: password123</p>
              </div>
              <div>
                <h3 className="font-bold">Driver</h3>
                <p>Email: driver1@tribetaxi.com</p>
                <p>Password: password123</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}