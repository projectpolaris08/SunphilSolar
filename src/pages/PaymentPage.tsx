import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ChevronRight,
  CreditCard,
  Banknote,
  Smartphone,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";

const PaymentPage = () => {
  const paymentMethods = [
    {
      id: "credit-card",
      title: "Credit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      features: ["Secure payment", "Instant confirmation", "24/7 support"],
      color: "bg-blue-500",
    },
    {
      id: "eastwest-installment",
      title: "EastWest Bank 0% Installment",
      description: "0% interest for qualified cardholders",
      icon: Banknote,
      features: ["0% interest", "Flexible terms", "Easy approval"],
      color: "bg-green-500",
      badge: "Special Offer",
    },
    {
      id: "cash",
      title: "Cash Payment",
      description: "Pay in cash upon installation",
      icon: Banknote,
      features: ["No fees", "Direct payment", "Immediate receipt"],
      color: "bg-yellow-500",
    },
    {
      id: "cashless-payments",
      title: "Cashless Payments",
      description: "BDO, BPI, Metrobank, and more",
      icon: Smartphone,
      features: ["Bank-to-bank", "Secure transfer", "Real-time confirmation"],
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-blue-950 to-neutral-900">
      <Helmet>
        <title>Payment Options | Sunphil Solar</title>
        <meta
          name="description"
          content="Secure payment options for your solar installation. Accepting major credit cards, EastWest Bank 0% installment, cash payments, and cashless payments."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-white/80">
            <li>
              <Link
                to="/"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <svg
                  className="mr-2"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9.75L12 4l9 5.75V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.75Z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="mx-1" />
              <span className="text-blue-400">Payment</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payment Options
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose from our flexible payment methods designed to make your solar
            investment accessible and convenient.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-2">
                Secure & Protected
              </h3>
              <p className="text-white/80">
                All payments are processed through secure, encrypted channels.
                Your financial information is protected with bank-level
                security.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;

            return (
              <div
                key={method.id}
                className="relative p-6 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                {method.badge && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {method.badge}
                  </div>
                )}

                <div className="text-center">
                  <div
                    className={`p-4 rounded-lg ${method.color} flex-shrink-0 mx-auto mb-4 w-fit`}
                  >
                    <IconComponent className="text-white" size={32} />
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2">
                    {method.title}
                  </h3>
                  <p className="text-white/70 mb-4 text-sm">
                    {method.description}
                  </p>

                  <div className="space-y-2">
                    {method.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center text-white/80 text-xs"
                      >
                        <CheckCircle
                          size={12}
                          className="mr-2 text-green-400"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="text-blue-400" size={24} />
              <h3 className="text-white font-semibold">Processing Time</h3>
            </div>
            <p className="text-white/80 text-sm">
              Credit card and cashless payments are processed instantly. Cash
              payments are collected upon installation completion.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-green-400" size={24} />
              <h3 className="text-white font-semibold">Security</h3>
            </div>
            <p className="text-white/80 text-sm">
              All transactions are encrypted and processed through secure
              payment gateways with PCI DSS compliance.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="text-purple-400" size={24} />
              <h3 className="text-white font-semibold">Support</h3>
            </div>
            <p className="text-white/80 text-sm">
              Need help with payment? Contact our support team at +63 960 692
              1760 or email sunphilsolar@sunphilsolar.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
