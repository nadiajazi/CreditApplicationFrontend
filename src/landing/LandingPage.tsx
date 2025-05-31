import React from 'react';
import illustration from "../assets/illustration.jpg";
import { useNavigate } from 'react-router-dom';
import { Button } from '../design-system';
import { ArrowRightIcon, CreditCardIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: CreditCardIcon,
      title: "Smart Credit Management",
      description: "Monitor and control your credit spending with intelligent insights and real-time tracking."
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "Get detailed reports and analytics to understand your spending patterns and optimize your finances."
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Reliable",
      description: "Bank-level security ensures your financial data is protected with industry-standard encryption."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="lg:w-1/2 space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-balance">
                <span className="gradient-text">Smart Credit</span>
                <br />
                <span className="text-neutral-900">Management</span>
              </h1>
              <p className="text-xl text-neutral-600 text-pretty max-w-lg">
                Take control of your credit purchases with our intelligent application.
                Monitor transactions, set limits, and make informed financial decisions with ease.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGetStartedClick}
                size="lg"
                rightIcon={<ArrowRightIcon className="h-5 w-5" />}
                className="ripple"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/demo')}
              >
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10K+</div>
                <div className="text-sm text-neutral-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">$2M+</div>
                <div className="text-sm text-neutral-600">Managed Credit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">99.9%</div>
                <div className="text-sm text-neutral-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="lg:w-1/2 animate-fade-in-up animation-delay-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl blur-3xl opacity-20 animate-pulse-slow"></div>
              <img
                src={illustration}
                alt="Credit Management Illustration"
                className="relative w-full h-auto object-cover rounded-3xl shadow-hard card-hover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover the powerful features that make credit management simple, secure, and intelligent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Credit Management?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their finances with our platform.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStartedClick}
            rightIcon={<ArrowRightIcon className="h-5 w-5" />}
            className="bg-white text-primary-600 hover:bg-neutral-100"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;


