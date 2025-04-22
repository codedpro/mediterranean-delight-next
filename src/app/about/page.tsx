"use client";

import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Chef Ahmed",
    role: "Head Chef",
    image: "/images/staff/chef-ahmed.jpg",
    bio: "With over 20 years of experience in Mediterranean cuisine, Chef Ahmed brings authentic flavors to every dish.",
  },
  {
    name: "Maria Rodriguez",
    role: "Sous Chef",
    image: "/images/staff/maria-rodriquez.jpg",
    bio: "Maria specializes in Spanish and Greek dishes, bringing her passion for Mediterranean cooking to our kitchen.",
  },
  {
    name: "Sofia Papadopoulos",
    role: "Pastry Chef",
    image: "/images/staff/sofia-papadopoulos.jpg",
    bio: "Sofia creates our delicious desserts, from traditional baklava to modern Mediterranean-inspired sweets.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] md:h-[70vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/about-hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">About Our Mediterranean Journey</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Mediterranean Delight, where we bring the authentic flavors of the Mediterranean to your table. Our restaurant is a celebration of the rich culinary traditions from countries like Greece, Turkey, Lebanon, and Morocco.
            </p>
            <p className="text-gray-600 mb-4">
              Founded in 2020, we&apos;ve been passionate about sharing the vibrant tastes and warm hospitality of the Mediterranean region with our community.
            </p>
            <Link href="/menu/" className="inline-block mt-4 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
              View Our Menu
            </Link>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/images/restaurant/interior.jpg"
              alt="Restaurant interior"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-amber-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Visit Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-gray-600 mb-4">
                123 Mediterranean Street<br />
                San Francisco, CA 94105
              </p>
              <h3 className="text-2xl font-bold mb-4">Hours</h3>
              <p className="text-gray-600 mb-2">Monday - Thursday: 11:00 AM - 10:00 PM</p>
              <p className="text-gray-600 mb-2">Friday - Saturday: 11:00 AM - 11:00 PM</p>
              <p className="text-gray-600">Sunday: 10:00 AM - 9:00 PM</p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/restaurant/interior1.jpg"
                alt="Restaurant interior"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 