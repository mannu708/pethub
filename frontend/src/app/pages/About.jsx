import { Heart, Shield, Users, Award, Target, Zap } from "lucide-react";
import { Link } from "react-router";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Animal Welfare First",
      description:
        "We prioritize the health and happiness of every pet on our platform. All sellers are vetted to ensure ethical practices.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Every transaction is protected, and all pets come with health certificates and guarantees.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "We've built a passionate community of pet lovers who support and help each other.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "We maintain the highest standards for pets and products available on our marketplace.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Pets Adopted" },
    { number: "5K+", label: "Verified Sellers" },
    { number: "4.9", label: "Average Rating" },
  ];

  const team = [
    {
      name: "Aanya Patel",
      role: "Founder & CEO",
      image: "/team/indian_female_ceo.png",
    },
    {
      name: "Rohan Sharma",
      role: "Head of Operations",
      image: "/team/indian_male_operations.png",
    },
    {
      name: "Priya Desai",
      role: "Chief Veterinarian",
      image: "/team/indian_female_vet.png",
    },
    {
      name: "Vikram Singh",
      role: "Customer Success Lead",
      image: "/team/indian_male_success.png",
    },
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Target className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Our Mission
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Connecting Pets with
              <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Loving Families
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              PawMarket was founded with a simple mission: to make pet adoption
              and pet care accessible, safe, and joyful for everyone. We believe
              every pet deserves a loving home and every pet parent deserves the
              best resources.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded in 2020, PawMarket started as a small passion project
                  by a group of pet lovers who noticed a gap in the market for a
                  trusted, comprehensive pet marketplace.
                </p>
                <p>
                  What began as a local community platform has grown into a
                  nationwide network, connecting thousands of pets with loving
                  families every year. We've also expanded our offerings to
                  include premium pet food, toys, and accessories from trusted
                  brands.
                </p>
                <p>
                  Today, we're proud to be one of the most trusted names in pet
                  adoption and pet care, but we never forget our roots. Every
                  decision we make is guided by our commitment to animal welfare
                  and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1591911949558-2b0b620d545a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBldHMlMjBmYW1pbHl8ZW58MXx8fHwxNzc1NjM4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our story"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do at PawMarket
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate pet lovers working to make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-orange-500 dark:text-orange-400 font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you're looking to adopt a pet, sell pet products, or simply
            be part of our community, we'd love to have you with us.
          </p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-orange-500 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
