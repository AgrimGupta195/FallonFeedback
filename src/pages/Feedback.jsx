import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const { loading, postFeedback } = useUserStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Feedback message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await postFeedback({
          fullName: formData.fullName,
          email: formData.email,
          message: formData.message
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Thank You!</h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Your feedback has been submitted successfully.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mb-6 mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="text-gray-300 mb-6">
              We appreciate your input and will use it to improve our services.
            </p>
            <button
              onClick={() => {
                setFormData({ fullName: "", email: "", message: "" });
                setIsSubmitted(false);
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
            >
              <Send className="mr-2 h-5 w-5" aria-hidden="true" />
              Submit Another Feedback
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Share Your Feedback</h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                  focus:border-emerald-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <motion.p 
                  className="mt-1 text-sm text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                  focus:border-emerald-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <motion.p 
                  className="mt-1 text-sm text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Feedback Message
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                  focus:border-emerald-500 sm:text-sm"
                  placeholder="Your feedback helps us improve our service..."
                />
              </div>
              {errors.message && (
                <motion.p 
                  className="mt-1 text-sm text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
               hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;