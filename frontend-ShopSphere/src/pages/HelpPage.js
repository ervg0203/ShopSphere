import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button on the home page and fill in your email, name, and password. You'll receive a confirmation email to verify your account.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your inbox.",
    },
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add items to your cart, and click 'Checkout'. Fill in your delivery address, choose a payment method, and confirm your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept both cash on delivery and card payments. You can choose your preferred payment method during checkout.",
    },
    {
      question: "Can I edit my order after placing it?",
      answer:
        "Unfortunately, once your order is placed, it cannot be edited. You can contact our support team for urgent changes.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Log in to your account and go to 'My Orders' to view the status and details of all your orders.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Go to 'My Profile' in your account menu to update your personal information, address, and contact details.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect all your payment and personal information.",
    },
  ];

  return (
    <div>
      <NavBar>
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Help Center
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Find answers fast.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Browse common questions or reach out to our support team
                anytime.
              </p>
            </div>
          </section>

          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-slate-100"
                  >
                    <span className="font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <span
                      className={`text-2xl text-slate-400 transition ${
                        expandedFaq === index ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="border-t border-slate-200 px-4 py-4 text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
              <h3 className="text-lg font-semibold text-indigo-900">
                Still need help?
              </h3>
              <p className="mt-2 text-indigo-700">
                Our support team is ready to assist you. Send us a message and
                we'll get back to you shortly.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default HelpPage;
