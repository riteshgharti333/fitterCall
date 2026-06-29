"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaPaperPlane, FaHeadset, FaComment, FaCheckCircle } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Us",
      description: "Send us a message anytime",
      details: "support@fittercall.com",
      link: "mailto:support@fittercall.com"
    },
    {
      icon: <FaComment className="text-3xl" />,
      title: "Live Chat",
      description: "Get instant help from our team",
      details: "Available 24/7",
      link: "#chat"
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Help Center",
      description: "Find answers to common questions",
      details: "Visit our FAQ section",
      link: "/faq"
    }
  ];

  const subjects = [
    "General Inquiry",
    "Technical Support",
    "Feature Request",
    "Partnership Opportunity",
    "Feedback",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      {/* Header Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Have questions or need support? We're here to help you on your fitness journey.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Link
                key={index}
                href={method.link}
                className="group p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-800/30 border border-purple-700/20 backdrop-blur-lg transition-all duration-500 hover:border-purple-500/40 hover:translate-y-2 text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-purple-200 mb-3">
                    {method.description}
                  </p>
                  <p className="text-purple-400 font-medium">
                    {method.details}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Send us a Message</h2>
              <p className="text-lg text-purple-200">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-900/20 to-green-800/30 border border-green-700/20 backdrop-blur-lg">
                <FaCheckCircle className="text-5xl text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-green-200">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-purple-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Send Message</span>
                  <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Immediate Help?</h2>
            <p className="text-lg text-purple-200 mb-8">
              Check out our frequently asked questions for quick answers to common questions.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center px-6 py-3 border border-purple-600/30 hover:border-purple-400/50 bg-purple-950/40 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Visit FAQ Section
            </Link>
          </div>
        </div>
      </div>

      {/* Response Time Info */}
      <div className="py-12 bg-gradient-to-r from-purple-900/20 to-pink-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-purple-600/20">
                  <FaHeadset className="text-2xl text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Quick Response</h3>
                  <p className="text-purple-200">Typically within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-purple-600/20">
                  <FaPhone className="text-2xl text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Priority Support</h3>
                  <p className="text-purple-200">For technical issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;