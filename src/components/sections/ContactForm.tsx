import React, { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSound } from "react-sounds";

export const ContactForm: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: product
      ? `I'm interested in purchasing: ${product.name} (${product.price})`
      : "",
    interest: product ? "battery" : "residential",
    privacyPolicy: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { play: playSubmit } = useSound("ui/submit", { volume: 0.5 });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSubmit();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      if (product) {
        formDataToSend.append("product_id", product.id);
        formDataToSend.append("product_name", product.name);
        formDataToSend.append("product_price", product.price);
      }

      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error("Google Script URL is not defined");
      }

      await fetch(scriptUrl, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        interest: "residential",
        privacyPolicy: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors((prev) => ({
        ...prev,
        form: "An error occurred while sending your message. Please try again or contact us directly.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Get in Touch
            </h2>
            <div className="h-1 w-20 bg-primary-500 rounded mb-6"></div>
            <p className="text-lg text-secondary-600 mb-8">
              Ready to switch to solar? Contact us today for a free consultation
              and quote. Our team of experts is ready to help you find the
              perfect solar solution for your needs.
            </p>

            <div className="bg-secondary-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Why Contact Us?
              </h3>
              <ul className="space-y-3">
                {[
                  "Free on-site assessment and quote",
                  "Expert advice on the best solar solution for your needs",
                  "Information about financing options and incentives",
                  "Professional installation by certified technicians",
                  "Ongoing support and maintenance services",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-secondary-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="text-secondary-900 font-medium mb-2">
                  Email Us
                </div>
                <a
                  href="mailto:sunphilsolarpowerinstallation@gmail.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  sunphilsolarpowerinstallation@gmail.com
                </a>
              </div>
              <div className="flex-1">
                <div className="text-secondary-900 font-medium mb-2">
                  Call Us
                </div>
                <a
                  href="tel:+1234567890"
                  className="text-primary-600 hover:text-primary-700"
                >
                  (+63) 935 365 8092
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-elevation-2 overflow-hidden">
            <div className="bg-primary-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Contact Form</h3>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle size={48} className="text-success-500 mb-4" />
                  <h4 className="text-xl font-medium text-secondary-900 mb-2">
                    Thank You!
                  </h4>
                  <p className="text-center text-secondary-600">
                    Your message has been sent successfully. We'll get back to
                    you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  {product && (
                    <div className="mb-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-medium text-secondary-900 mb-1">
                        Product Inquiry
                      </h4>
                      <p className="text-secondary-700">
                        {product.name} - {product.price}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-secondary-700 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.name
                            ? "border-error-500"
                            : "border-secondary-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-secondary-700 mb-1"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${
                            errors.email
                              ? "border-error-500"
                              : "border-secondary-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-error-500">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-secondary-700 mb-1"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${
                            errors.phone
                              ? "border-error-500"
                              : "border-secondary-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-error-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-sm font-medium text-secondary-700 mb-1"
                      >
                        I'm Interested In
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="residential">
                          Residential Solar Installation
                        </option>
                        <option value="commercial">
                          Commercial Solar Installation
                        </option>
                        <option value="battery">
                          Battery Storage Solutions
                        </option>
                        <option value="maintenance">
                          Maintenance & Support
                        </option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-secondary-700 mb-1"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.message
                            ? "border-error-500"
                            : "border-secondary-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-error-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="privacyPolicy"
                          name="privacyPolicy"
                          type="checkbox"
                          checked={formData.privacyPolicy}
                          onChange={handleChange}
                          className={`h-4 w-4 rounded border ${
                            errors.privacyPolicy
                              ? "border-error-500"
                              : "border-secondary-300"
                          } text-primary-600 focus:ring-primary-500`}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="privacyPolicy"
                          className="text-secondary-700"
                        >
                          I agree to the{" "}
                          <Link
                            to="/privacy-policy"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            Privacy Policy
                          </Link>
                          *
                        </label>
                        {errors.privacyPolicy && (
                          <p className="mt-1 text-sm text-error-500">
                            {errors.privacyPolicy}
                          </p>
                        )}
                      </div>
                    </div>

                    {errors.form && (
                      <div className="p-2 text-sm text-error-500 bg-error-50 rounded">
                        {errors.form}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={18} className="ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
