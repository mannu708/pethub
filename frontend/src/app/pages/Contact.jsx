import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export function Contact() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have questions about adopting a pet or our services? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white font-medium">hello@pawmarket.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Online Support 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Office</p>
                    <p className="text-gray-900 dark:text-white font-medium">123 Pet Avenue</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Business Hours</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Pet Adoption</option>
                    <option>Order Support</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
