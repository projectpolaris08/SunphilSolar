import React, { useState, useEffect } from "react";
import {
  Calculator,
  CreditCard,
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
} from "lucide-react";
import { useAdminAuth } from "../contexts/AdminAuthContext";

interface PaymentComputation {
  transactionAmount: number;
  bank: string;
  tenor: number;
  mdrRate: number;
  merchantDiscount: number;
  monthlyPayment: number;
  totalPayments: number;
  totalMonthlyAmount: number;
  savings: number;
  monthlyBreakdown: MonthlyPayment[];
}

interface MonthlyPayment {
  month: number;
  paymentDate: string;
  amount: number;
  remainingBalance: number;
}

interface BankRates {
  [key: string]: {
    [tenor: string]: number | null;
  };
}

const AdminPaymentPage: React.FC = () => {
  const { isAuthenticated, loading } = useAdminAuth();
  const [transactionAmount, setTransactionAmount] = useState<number | "">("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedTenor, setSelectedTenor] = useState<number>(0);
  const [computations, setComputations] = useState<PaymentComputation[]>([]);
  const [showAllBanks, setShowAllBanks] = useState<boolean>(false);
  const [selectedComputation, setSelectedComputation] =
    useState<PaymentComputation | null>(null);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  // GlobalPayments 0% Installment Program - Official Partner Banks Only
  const bankRates: BankRates = {
    "Bank of Commerce": {
      "3": 2.5,
      "6": 5.5,
      "9": null, // N/A
      "12": 10.0,
      "18": null, // N/A
      "24": 20.0,
      "36": 30.0,
    },
    "Bank of the Philippine Islands (BPI)": {
      "3": 3.0,
      "6": 6.0,
      "9": 9.0,
      "12": 12.0,
      "18": 18.0,
      "24": 24.0,
      "36": 36.0,
    },
    "China Banking Corporation": {
      "3": 3.0,
      "6": 6.0,
      "9": 9.0,
      "12": 12.0,
      "18": 18.0,
      "24": 24.0,
      "36": 36.0,
    },
    "East West Banking Corporation": {
      "3": 2.5,
      "6": 5.5,
      "9": 8.0,
      "12": 9.5,
      "18": 15.0,
      "24": 15.0,
      "36": null, // N/A
    },
    HSBC: {
      "3": 3.0,
      "6": 6.0,
      "9": 9.0,
      "12": 12.0,
      "18": 18.0,
      "24": 24.0,
      "36": 36.0,
    },
    "Union Bank of the Philippines": {
      "3": null, // To be negotiated
      "6": null, // To be negotiated
      "9": null, // To be negotiated
      "12": null, // To be negotiated
      "18": null, // To be negotiated
      "24": null, // To be negotiated
      "36": null, // To be negotiated
    },
  };

  const tenors = [3, 6, 9, 12, 18, 24, 36];
  const banks = Object.keys(bankRates);

  // Generate monthly breakdown
  const generateMonthlyBreakdown = (
    amount: number,
    tenor: number
  ): MonthlyPayment[] => {
    const monthlyPayment = Math.round((amount / tenor) * 100) / 100; // Round to 2 decimal places
    const breakdown: MonthlyPayment[] = [];
    const startDate = new Date();

    for (let i = 1; i <= tenor; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      const remainingBalance =
        Math.round((amount - monthlyPayment * i) * 100) / 100;

      breakdown.push({
        month: i,
        paymentDate: paymentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        amount: monthlyPayment,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }

    return breakdown;
  };

  const calculatePayment = (
    amount: number,
    bank: string,
    tenor: number
  ): PaymentComputation => {
    const mdrRate = bankRates[bank]?.[tenor.toString()] || 0;
    const mdrAmount = mdrRate
      ? Math.round(((amount * mdrRate) / 100) * 100) / 100
      : 0;
    const taxAmount = Math.round(amount * 0.01 * 100) / 100; // 1% tax on transaction amount
    const totalAdditionalFees = Math.round((mdrAmount + taxAmount) * 100) / 100;
    const totalAmountWithFees =
      Math.round((amount + totalAdditionalFees) * 100) / 100;
    const monthlyPayment =
      Math.round((totalAmountWithFees / tenor) * 100) / 100;
    const totalPayments = totalAmountWithFees;
    const totalMonthlyAmount = Math.round(monthlyPayment * tenor * 100) / 100;
    const savings = totalAdditionalFees; // This is the additional amount customer pays (MDR + Tax)
    const monthlyBreakdown = generateMonthlyBreakdown(
      totalAmountWithFees,
      tenor
    );

    return {
      transactionAmount: amount,
      bank,
      tenor,
      mdrRate: mdrRate || 0,
      merchantDiscount: totalAdditionalFees, // Keep same field name for compatibility (now includes MDR + Tax)
      monthlyPayment,
      totalPayments,
      totalMonthlyAmount,
      savings,
      monthlyBreakdown,
    };
  };

  const calculateAllBanks = () => {
    if (
      transactionAmount === "" ||
      transactionAmount <= 0 ||
      selectedTenor <= 0
    )
      return;

    const newComputations: PaymentComputation[] = [];

    banks.forEach((bank) => {
      const computation = calculatePayment(
        transactionAmount,
        bank,
        selectedTenor
      );
      if (computation.mdrRate > 0) {
        // Only include banks with available rates
        newComputations.push(computation);
      }
    });

    // Sort by merchant discount (ascending - best rate first)
    newComputations.sort((a, b) => a.merchantDiscount - b.merchantDiscount);
    setComputations(newComputations);
  };

  const calculateSpecificBank = () => {
    if (
      transactionAmount === "" ||
      transactionAmount <= 0 ||
      selectedBank === "" ||
      selectedTenor <= 0
    )
      return;

    const computation = calculatePayment(
      transactionAmount,
      selectedBank,
      selectedTenor
    );
    setComputations([computation]);
  };

  const handleShowBreakdown = (computation: PaymentComputation) => {
    setSelectedComputation(computation);
    setShowBreakdown(true);
  };

  const exportToPDF = async () => {
    if (computations.length === 0) return;

    // Dynamic import of jsPDF
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Computation Report", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(
      `Transaction Amount: PHP ${
        transactionAmount === "" ? "0" : transactionAmount.toLocaleString()
      }`,
      20,
      35
    );
    doc.text(`Tenor: ${selectedTenor} months`, 20, 40);

    // Table headers
    const headers = [
      "Bank",
      "Tenor",
      "Additional Fee (MDR + Tax)",
      "Monthly Payment",
      "Total Monthly Amount",
      "Total Payments",
    ];
    const colWidths = [40, 20, 30, 30, 30, 30];
    let yPosition = 55;

    // Draw table headers
    doc.setFont("helvetica", "bold");
    let xPosition = 20;
    headers.forEach((header) => {
      doc.text(header, xPosition, yPosition);
      xPosition += colWidths[headers.indexOf(header)];
    });

    // Draw table rows
    doc.setFont("helvetica", "normal");
    yPosition += 10;

    computations.forEach((comp) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      xPosition = 20;
      const additionalFeeDisplay =
        comp.merchantDiscount > 0
          ? `+PHP ${comp.merchantDiscount.toLocaleString()}`
          : "PHP 0.00";

      const rowData = [
        comp.bank,
        `${comp.tenor}m`,
        additionalFeeDisplay,
        `PHP ${comp.monthlyPayment.toLocaleString()}`,
        `PHP ${comp.totalMonthlyAmount.toLocaleString()}`,
        `PHP ${comp.totalPayments.toLocaleString()}`,
      ];

      rowData.forEach((data, colIndex) => {
        doc.text(data, xPosition, yPosition);
        xPosition += colWidths[colIndex];
      });

      yPosition += 8;
    });

    // Summary section
    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 20, yPosition);
    yPosition += 8;

    doc.setFont("helvetica", "normal");
    doc.text(
      `Best Monthly Interest Rate: ${(
        computations[0]?.mdrRate / computations[0]?.tenor
      ).toFixed(2)}% (${computations[0]?.bank})`,
      20,
      yPosition
    );
    yPosition += 6;
    doc.text(
      `Lowest MDR Fee: PHP ${computations[0]?.merchantDiscount.toLocaleString()}`,
      20,
      yPosition
    );

    // Save the PDF
    doc.save(
      `payment-computation-${new Date().toISOString().split("T")[0]}.pdf`
    );
  };

  const exportBreakdownToPDF = async () => {
    if (!selectedComputation) return;

    // Dynamic import of jsPDF
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Monthly Payment Breakdown", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Bank: ${selectedComputation.bank}`, 20, 30);
    doc.text(`Tenor: ${selectedComputation.tenor} months`, 20, 35);
    doc.text(
      `Total Amount: PHP ${selectedComputation.transactionAmount.toLocaleString()}`,
      20,
      40
    );
    doc.text(
      `Monthly Payment: PHP ${selectedComputation.monthlyPayment.toLocaleString()}`,
      20,
      45
    );
    doc.text(
      `Monthly Interest Rate: ${(
        selectedComputation.mdrRate / selectedComputation.tenor
      ).toFixed(2)}%`,
      20,
      50
    );

    // Table headers
    const headers = [
      "Month",
      "Payment Date",
      "Payment Amount",
      "Remaining Balance",
    ];
    const colWidths = [20, 50, 40, 40];
    let yPosition = 70;

    // Draw table headers
    doc.setFont("helvetica", "bold");
    let xPosition = 20;
    headers.forEach((header, index) => {
      doc.text(header, xPosition, yPosition);
      xPosition += colWidths[index];
    });

    // Draw table rows
    doc.setFont("helvetica", "normal");
    yPosition += 10;

    selectedComputation.monthlyBreakdown.forEach((payment) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      xPosition = 20;
      const rowData = [
        payment.month.toString(),
        payment.paymentDate,
        `PHP ${payment.amount.toLocaleString()}`,
        `PHP ${payment.remainingBalance.toLocaleString()}`,
      ];

      rowData.forEach((data, colIndex) => {
        doc.text(data, xPosition, yPosition);
        xPosition += colWidths[colIndex];
      });

      yPosition += 8;
    });

    // Summary
    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total Payments: PHP ${selectedComputation.totalPayments.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 15;

    // Conforme Section
    // Check if we need a new page for conforme section
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    // Conforme title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CONFORME", 20, yPosition);
    yPosition += 20;

    // Conforme fields
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Printed Name
    doc.text("Printed Name:", 20, yPosition);
    doc.line(60, yPosition - 3, 120, yPosition - 3);
    yPosition += 15;

    // Signature
    doc.text("Signature:", 20, yPosition);
    doc.line(60, yPosition - 3, 120, yPosition - 3);
    yPosition += 15;

    // Date
    doc.text("Date:", 20, yPosition);
    doc.line(60, yPosition - 3, 120, yPosition - 3);
    yPosition += 20;

    // Terms and conditions note
    doc.setFontSize(10);
    doc.text(
      "I acknowledge that I have read and understood the terms and conditions",
      20,
      yPosition
    );
    yPosition += 5;
    doc.text(
      "of this payment plan and agree to the monthly payment schedule above.",
      20,
      yPosition
    );

    // Save the PDF
    doc.save(
      `monthly-breakdown-${selectedComputation.bank.replace(/\s+/g, "-")}-${
        selectedComputation.tenor
      }months-${new Date().toISOString().split("T")[0]}.pdf`
    );
  };

  useEffect(() => {
    if (showAllBanks) {
      calculateAllBanks();
    } else {
      calculateSpecificBank();
    }
  }, [transactionAmount, selectedBank, selectedTenor, showAllBanks]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please log in to access the admin payment computation page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Payment Computation
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate 0% installment payment options with GlobalPayments MDR
            rates
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Payment Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transaction Amount (₱)
              </label>
              <input
                type="number"
                value={transactionAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setTransactionAmount(value === "" ? "" : Number(value));
                }}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter amount"
                min="3000"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum: ₱3,000</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tenor (Months)
              </label>
              <select
                value={selectedTenor}
                onChange={(e) => setSelectedTenor(Number(e.target.value))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={0}>Select Tenor</option>
                {tenors.map((tenor) => (
                  <option key={tenor} value={tenor}>
                    {tenor} Months
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bank Selection
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAllBanks(true)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showAllBanks
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  All Banks
                </button>
                <button
                  onClick={() => setShowAllBanks(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !showAllBanks
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Specific Bank
                </button>
              </div>
            </div>

            {!showAllBanks && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {computations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment Computation Results
              </h2>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Bank
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tenor
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Additional Fee (MDR + Tax)
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Monthly Payment
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Total Monthly Amount
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Total Payments
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {computations.map((comp, index) => (
                    <tr
                      key={`${comp.bank}-${comp.tenor}`}
                      className={`border-b border-gray-100 dark:border-gray-700 ${
                        index === 0 && showAllBanks
                          ? "bg-green-50 dark:bg-green-900/20"
                          : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comp.bank}
                          </span>
                          {index === 0 && showAllBanks && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              Best Rate
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {comp.tenor} months
                      </td>
                      <td className="py-3 px-4 text-right">
                        {comp.merchantDiscount > 0 ? (
                          <span className="text-orange-600 dark:text-orange-400 font-semibold">
                            +₱{comp.merchantDiscount.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-green-600 dark:text-green-400 font-semibold">
                            ₱0.00
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                        ₱{comp.monthlyPayment.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                        ₱{comp.totalMonthlyAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                        ₱{comp.totalPayments.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleShowBreakdown(comp)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          View Breakdown
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    Transaction Amount
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ₱
                  {transactionAmount === ""
                    ? "0"
                    : transactionAmount.toLocaleString()}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    Best Rate Available
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {computations.length > 0
                    ? `${computations[0].mdrRate.toFixed(2)}%`
                    : "N/A"}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {computations.length > 0 ? computations[0].bank : ""}
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold text-orange-700 dark:text-orange-300">
                    Lowest MDR Fee
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  ₱
                  {computations.length > 0
                    ? computations[0].merchantDiscount.toLocaleString()
                    : "0"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                GlobalPayments 0% Installment Program
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Minimum transaction amount: ₱3,000</li>
                <li>
                  • Higher minimum amounts may be required for longer tenors
                </li>
                <li>
                  • Merchants may agree with card issuing partners on which
                  tenors to activate
                </li>
                <li>
                  • Union Bank of the Philippines rates are negotiated directly
                  with the merchant
                </li>
                <li>
                  • Includes major Philippine banks: BDO, BPI, Metrobank, Land
                  Bank, PNB, Security Bank, RCBC, AUB, PSBank, City Savings,
                  Sterling Bank, Bank of Makati, Philippine Business Bank, and
                  more
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                MDR (Merchant Discount Rate)
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>
                  • This is the fee charged by the bank for processing the
                  payment
                </li>
                <li>• Customer pays 0% interest on their installment</li>
                <li>
                  • Official partner banks: Bank of Commerce, BPI, China Bank,
                  East West Bank, HSBC
                </li>
                <li>• Union Bank rates to be negotiated directly</li>
                <li>
                  • MDR fee is added to the customer's total payment amount
                </li>
                <li>• Rates vary by bank and tenor period</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Modal */}
      {showBreakdown && selectedComputation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden my-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Monthly Payment Breakdown
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={exportBreakdownToPDF}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
                >
                  <FileText className="h-4 w-4" />
                  Export PDF
                </button>
                <button
                  onClick={() => setShowBreakdown(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {selectedComputation.bank} - {selectedComputation.tenor} Month
                  Plan
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 dark:text-blue-300">
                      Total Amount:
                    </span>
                    <p className="font-bold text-blue-900 dark:text-blue-100">
                      ₱{selectedComputation.transactionAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-blue-300">
                      Monthly Payment:
                    </span>
                    <p className="font-bold text-blue-900 dark:text-blue-100">
                      ₱{selectedComputation.monthlyPayment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-blue-300">
                      Total Monthly Amount:
                    </span>
                    <p className="font-bold text-blue-900 dark:text-blue-100">
                      ₱{selectedComputation.totalMonthlyAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-blue-300">
                      Additional Fee (MDR + Tax):
                    </span>
                    <p
                      className={`font-bold ${
                        selectedComputation.merchantDiscount > 0
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {selectedComputation.merchantDiscount > 0
                        ? `+₱${selectedComputation.merchantDiscount.toLocaleString()}`
                        : "₱0.00"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-auto max-h-96 border border-gray-200 dark:border-gray-600 rounded-lg -webkit-overflow-scrolling-touch">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Month
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Payment Date
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Payment Amount
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Remaining Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedComputation.monthlyBreakdown.map(
                      (payment, index) => (
                        <tr
                          key={payment.month}
                          className={`border-b border-gray-100 dark:border-gray-700 ${
                            index % 2 === 0
                              ? "bg-gray-50 dark:bg-gray-700/50"
                              : ""
                          }`}
                        >
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                            {payment.month}
                          </td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                            {payment.paymentDate}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">
                            ₱{payment.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                            ₱{payment.remainingBalance.toLocaleString()}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 dark:text-green-300 font-semibold">
                    Total Payments:
                  </span>
                  <span className="text-2xl font-bold text-green-900 dark:text-green-100">
                    ₱{selectedComputation.totalPayments.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Customer pays 0% interest - all payments go towards principal
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentPage;
