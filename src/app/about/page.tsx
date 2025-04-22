"use client";

import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Chef Ahmed Hassan",
    role: "Executive Chef",
    bio: "With over 20 years of experience in Mediterranean cuisine, Chef Ahmed brings authentic flavors and innovative techniques to our kitchen.",
    image: "/images/staff/chef-ahmed.jpg",
  },
  {
    name: "Maria Rodriguez",
    role: "Restaurant Manager",
    bio: "Maria ensures every guest receives exceptional service and a memorable dining experience.",
    image: "/images/staff/maria-rodriquez.jpg",
  },
  {
    name: "Sofia Papadopoulos",
    role: "Pastry Chef",
    bio: "Sofia's expertise in Mediterranean desserts brings the perfect sweet ending to every meal.",
    image: "/images/staff/sofia-papadopoulos.jpg",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] min-h-[300px] bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/hero/about-hero.jpeg')",
          backgroundPosition: "center 60%"
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Journey</h2>
              <p className="text-gray-600 mb-4">
                Mediterranean Delight was born from a passion for authentic
                Mediterranean cuisine and a desire to share the rich culinary
                traditions of the region with our community. Founded in 2010 by
                Chef Ahmed Hassan, our restaurant has become a beloved destination
                for those seeking genuine Mediterranean flavors.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began in a small kitchen in New York City, where Chef
                Ahmed started experimenting with family recipes passed down through
                generations. Today, we continue to honor these traditions while
                embracing innovation in our culinary approach.
              </p>
              <p className="text-gray-600">
                Every dish we serve tells a story - a story of heritage, passion,
                and the joy of bringing people together through food.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/restaurant/chef-cooking.jpg"
                alt="Chef Cooking"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Space</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/restaurant/interior.jpg"
                alt="Main Dining Area"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/restaurant/interior1.jpg"
                alt="Private Dining Room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              To create an authentic Mediterranean dining experience that
              celebrates the region's rich culinary heritage while fostering
              community and connection through exceptional food and service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Authentic Flavors</h3>
              <p className="text-gray-600">
                We source the finest ingredients and stay true to traditional
                recipes to bring you genuine Mediterranean flavors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Warm Hospitality</h3>
              <p className="text-gray-600">
                Our team is dedicated to providing exceptional service and creating
                a welcoming atmosphere for every guest.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Community Focus</h3>
              <p className="text-gray-600">
                We believe in giving back to our community and supporting local
                farmers and producers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-[300px] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Mediterranean Delight
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join us for an unforgettable dining experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservations"
              className="bg-white hover:bg-gray-100 text-amber-600 px-6 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Book a Table
            </a>
            <a
              href="/menu"
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 