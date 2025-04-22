import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] md:h-[70vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/hero-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Mediterranean Delight
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience authentic Mediterranean cuisine in a warm and welcoming
              atmosphere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
              >
                View Menu
              </Link>
              <Link
                href="/reservations"
                className="bg-white hover:bg-gray-100 text-amber-600 px-6 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Make a Reservation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Signature Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Item 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/food/grilled-lamb-kebabs.jpg"
                  alt="Grilled Lamb Kebabs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Grilled Lamb Kebabs</h3>
                <p className="text-gray-600 mb-4">
                  Tender lamb marinated in Mediterranean spices, served with
                  tzatziki sauce
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold">$24.99</span>
                  <Link
                    href="/menu"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Item 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/food/seafood-paella.jpg"
                  alt="Seafood Paella"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Seafood Paella</h3>
                <p className="text-gray-600 mb-4">
                  Authentic Spanish-style paella with shrimp, mussels, and
                  saffron rice
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold">$28.99</span>
                  <Link
                    href="/menu"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Item 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/food/falafel-platter.jpg"
                  alt="Falafel Platter"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Falafel Platter</h3>
                <p className="text-gray-600 mb-4">
                  Handcrafted falafels served with hummus, pita, and tahini sauce
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold">$18.99</span>
                  <Link
                    href="/menu"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Mediterranean Delight?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Make a reservation or order online today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservations"
              className="bg-white hover:bg-gray-100 text-amber-600 px-6 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Book a Table
            </Link>
            <Link
              href="/menu"
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
