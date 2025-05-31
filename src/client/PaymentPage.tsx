import React, { useState } from 'react';
import Navbar from './Layout/Navbar';
import {
  CreditCardIcon,
  CalendarIcon,
  LockClosedIcon,
  ShoppingCartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Button, Input, Card, CardHeader, CardContent } from '../design-system';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  amount: string;
  productName: string;
  quantity: string;
}

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    amount: '',
    productName: '',
    quantity: '1'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PaymentData) => {
    let value = e.target.value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) return; // Max 16 digits + 3 spaces
    }

    // Format expiry date
    if (field === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) return;
    }

    // CVV validation
    if (field === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 4) return;
    }

    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!paymentData.productName.trim()) errors.push('Product name is required');
    if (!paymentData.amount.trim()) errors.push('Amount is required');
    if (!paymentData.cardholderName.trim()) errors.push('Cardholder name is required');
    if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) errors.push('Card number must be 16 digits');
    if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) errors.push('Invalid expiry date format (MM/YY)');
    if (paymentData.cvv.length < 3) errors.push('CVV must be at least 3 digits');

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setStep('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      setStep('success');
      toast.success('Payment processed successfully!');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      setStep('form');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      amount: '',
      productName: '',
      quantity: '1'
    });
    setStep('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      <ToastContainer position="top-right" />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Secure Payment
            </h1>
            <p className="text-xl text-neutral-600">
              Complete your purchase with our secure payment system
            </p>
          </div>

          {step === 'form' && (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Purchase Details */}
              <Card variant="elevated" className="h-fit">
                <CardHeader title="Purchase Details" />
                <CardContent>
                  <div className="space-y-6">
                    <Input
                      label="Product Name"
                      type="text"
                      value={paymentData.productName}
                      onChange={(e) => handleInputChange(e, 'productName')}
                      leftIcon={<ShoppingCartIcon className="h-5 w-5" />}
                      placeholder="Enter product name"
                      fullWidth
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Quantity"
                        type="number"
                        value={paymentData.quantity}
                        onChange={(e) => handleInputChange(e, 'quantity')}
                        placeholder="1"
                        fullWidth
                        min="1"
                      />

                      <Input
                        label="Amount ($)"
                        type="number"
                        value={paymentData.amount}
                        onChange={(e) => handleInputChange(e, 'amount')}
                        placeholder="0.00"
                        fullWidth
                        step="0.01"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card variant="elevated">
                <CardHeader
                  title="Payment Information"
                  subtitle="Your payment details are secure and encrypted"
                />
                <CardContent>
                  <div className="space-y-6">
                    <Input
                      label="Cardholder Name"
                      type="text"
                      value={paymentData.cardholderName}
                      onChange={(e) => handleInputChange(e, 'cardholderName')}
                      placeholder="John Doe"
                      fullWidth
                    />

                    <Input
                      label="Card Number"
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleInputChange(e, 'cardNumber')}
                      leftIcon={<CreditCardIcon className="h-5 w-5" />}
                      placeholder="1234 5678 9012 3456"
                      fullWidth
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => handleInputChange(e, 'expiryDate')}
                        leftIcon={<CalendarIcon className="h-5 w-5" />}
                        placeholder="MM/YY"
                        fullWidth
                      />

                      <Input
                        label="CVV"
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange(e, 'cvv')}
                        leftIcon={<LockClosedIcon className="h-5 w-5" />}
                        placeholder="123"
                        fullWidth
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleSubmit}
                        loading={isLoading}
                        fullWidth
                        size="lg"
                        leftIcon={<LockClosedIcon className="h-5 w-5" />}
                      >
                        Process Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-8"></div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Processing Payment</h2>
              <p className="text-neutral-600">Please wait while we process your payment securely...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircleIcon className="h-10 w-10 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Payment Successful!</h2>
              <p className="text-neutral-600 mb-8">Your payment has been processed successfully.</p>
              <div className="space-x-4">
                <Button onClick={resetForm} variant="outline">
                  Make Another Payment
                </Button>
                <Button onClick={() => window.location.href = '/client/dashboard'}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-12 bg-primary-50 rounded-xl p-6 border border-primary-200">
            <div className="flex items-start gap-4">
              <LockClosedIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Secure Payment</h3>
                <p className="text-primary-700 text-sm">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption
                  to protect your data during transmission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;