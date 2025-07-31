'use client';
import { useState } from 'react';
import { useLocalization } from '../../hooks/useLocalization';
import { validateRequired, validateCardNumber, validateCVV, validateExpirationDate } from '../../utils/validation';
import { authAPI } from '../../utils/api';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import PaymentProcessingModal from '../ui/PaymentProcessingModal';
import PaymentSuccessModal from '../ui/PaymentSuccessModal';
import PaymentFailedModal from '../ui/PaymentFailedModal';

export default function PaymentForm({ userData }) {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    giftCode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (field, value) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      // Remove all non-digits and format with spaces
      const digitsOnly = value.replace(/\D/g, '');
      formattedValue = digitsOnly.replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    } else if (field === 'expirationDate') {
      // Format as MM/YY
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length >= 2) {
        formattedValue = digitsOnly.substring(0, 2) + '/' + digitsOnly.substring(2, 4);
      } else {
        formattedValue = digitsOnly;
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!validateRequired(formData.expirationDate)) {
      newErrors.expirationDate = 'Expiration date is required';
    } else if (!validateExpirationDate(formData.expirationDate)) {
      newErrors.expirationDate = 'Please enter a valid expiration date';
    }

    if (!validateRequired(formData.cvv)) {
      newErrors.cvv = 'CVV is required';
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setLoading(true);
    setShowProcessingModal(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await authAPI.payment({
        ...userData,
        paymentDetails: formData
      });
      
      console.log('Payment successful:', response);
      setShowProcessingModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setShowProcessingModal(false);
      setShowFailedModal(true);
      setApiError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setShowFailedModal(false);
    setApiError('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number and Expiration Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-[#103358] mb-2">
              {t('payment.cardNumber')}
            </label>
            <Input
              value={formData.cardNumber}
              onChange={(e) => handleChange('cardNumber', e.target.value)}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-[#103358] mb-2">
              {t('payment.expirationDate')}
            </label>
            <div className="relative">
              <Input
                value={formData.expirationDate}
                onChange={(e) => handleChange('expirationDate', e.target.value)}
                error={errors.expirationDate}
                placeholder="MM/YY"
                className="w-full pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img 
                src={`/icons/payment/date.svg`} 
              
                className="w-5 h-5 rounded"
              />
              </div>
            </div>
          </div>
        </div>

        {/* CVV Field */}
        <div className="w-full">
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('payment.cvv')}
          </label>
          <div className="w-full md:w-1/2">
            <Input
              value={formData.cvv}
              onChange={(e) => handleChange('cvv', e.target.value)}
              error={errors.cvv}
              placeholder="123"
              className="w-full"
            />
          </div>
        </div>

        {/* Gift/Discount Code */}
        <div className="md:max-w-[350px]">
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('payment.giftCode')}
          </label>
          <Input
            value={formData.giftCode}
            onChange={(e) => handleChange('giftCode', e.target.value)}
            placeholder="SAVE20 or GIFT123"
            className="w-full"
          />
        </div>

        {apiError && <ErrorMessage message={apiError} />}

        <Button
          type="submit"
          className="w-full h-12"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="small" color="white" /> : t('payment.pay')}
        </Button>
      </form>

      {/* Processing Modal */}
      <PaymentProcessingModal 
        isOpen={showProcessingModal} 
        onClose={() => setShowProcessingModal(false)}
      />

      {/* Failed Modal */}
      <PaymentFailedModal 
        isOpen={showFailedModal} 
        onClose={() => setShowFailedModal(false)}
        onRetry={handleRetry}
      />

      {/* Success Modal */}
      <PaymentSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}