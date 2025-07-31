'use client';
import { useState } from 'react';
import { useLocalization } from '../../hooks/useLocalization';
import { validateRequired } from '../../utils/validation';
import { authAPI } from '../../utils/api';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function AccountDetailsForm({ userData, onNext }) {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    schoolName: '',
    gradeLevel: '',
    subjects: ['Maths'],
    estimatedExamDate: '',
    aptitudeLevel: '',
    desiredExamScore: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const gradeOptions = [
    { value: 'grade-1', label: 'Grade 1' },
    { value: 'grade-2', label: 'Grade 2' },
    { value: 'grade-3', label: 'Grade 3' },
    { value: 'grade-4', label: 'Grade 4' },
    { value: 'grade-5', label: 'Grade 5' },
    { value: 'grade-6', label: 'Grade 6' },
    { value: 'grade-7', label: 'Grade 7' },
    { value: 'grade-8', label: 'Grade 8' },
    { value: 'grade-9', label: 'Grade 9' },
    { value: 'grade-10', label: 'Grade 10' },
    { value: 'grade-11', label: 'Grade 11' },
    { value: 'grade-12', label: 'Grade 12' }
  ];

  const subjects = ['Maths', 'Science', 'English', 'Geography'];

  const aptitudeLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.schoolName)) {
      newErrors.schoolName = 'School name is required';
    }

    if (!validateRequired(formData.gradeLevel)) {
      newErrors.gradeLevel = 'Grade level is required';
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'At least one subject must be selected';
    }

    if (!validateRequired(formData.estimatedExamDate)) {
      newErrors.estimatedExamDate = 'Estimated exam date is required';
    }

    if (!validateRequired(formData.aptitudeLevel)) {
      newErrors.aptitudeLevel = 'Aptitude level is required';
    }

    if (!validateRequired(formData.desiredExamScore)) {
      newErrors.desiredExamScore = 'Desired exam score is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.signup({
        ...userData,
        ...formData
      });
      console.log('Account details saved:', response);
      onNext({ ...userData, ...formData });
    } catch (error) {
      setApiError('Failed to save account details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div className='max-w-[320px]'>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.schoolName')}
          </label>
          <Input
            value={formData.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            error={errors.schoolName}
            placeholder="School name..."
          />
        </div>
      <div className='max-w-[320px]'>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.gradeLevel')}
          </label>
          <Select
            options={gradeOptions}
            value={formData.gradeLevel}
            onChange={(e) => handleChange('gradeLevel', e.target.value)}
            error={errors.gradeLevel}
            placeholder="Grade..."
          />
        </div>
      </div>

   <div>
  <label className="block text-sm font-medium text-[#103358] mb-2">
    {t('signup.subjects')}
  </label>
  <div className="flex flex-wrap gap-2">
    {subjects.map((subject) => (
      <button
        key={subject}
        type="button"
        className={`flex flex-col justify-center items-center transition-colors ${
          formData.subjects.includes(subject)
            ? 'bg-[rgba(16,51,88,0.1)] text-[#103358] border-[1.5px] border-[#103358]'
            : 'bg-[rgba(0,0,0,0.05)] text-black border border-[#CBD5E1] hover:border-[#103358]'
        }`}
        style={{
          boxSizing: 'border-box',
          padding: '8px',
          width: '71px',
          height: '36px',
          borderRadius: '8px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '20px'
        }}
        onClick={() => handleSubjectToggle(subject)}
      >
        {subject}
      </button>
    ))}
  </div>
  {errors.subjects && <p className="mt-1 text-sm text-[#C8393B]">{errors.subjects}</p>}
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className='max-w-[320px]'>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.estimatedExamDate')}
          </label>
          <Input
            type="date"
            value={formData.estimatedExamDate}
            onChange={(e) => handleChange('estimatedExamDate', e.target.value)}
            error={errors.estimatedExamDate}
            placeholder="Exams..."
          />
          <p className="text-sm text-red-500 mt-1">{t('signup.examDateNote')}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.aptitudeLevel')}
          </label>
          <Select
            options={aptitudeLevels}
            value={formData.aptitudeLevel}
            onChange={(e) => handleChange('aptitudeLevel', e.target.value)}
            error={errors.aptitudeLevel}
            placeholder="Level..."
          />
          <p className="text-sm text-red-500 mt-1">{t('signup.aptitudeLevelNote')}</p>
        </div>
      </div>

      <div className='max-w-[320px]'>
        <label className="block text-sm font-medium text-[#103358] mb-2">
          {t('signup.desiredExamScore')}
        </label>
        <Input
          value={formData.desiredExamScore}
          onChange={(e) => handleChange('desiredExamScore', e.target.value)}
          error={errors.desiredExamScore}
          placeholder="Desired Score..."
        />
      </div>

      {apiError && <ErrorMessage message={apiError} />}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? <LoadingSpinner size="small" color="white" /> : t('signup.register')}
      </Button>
    </form>
  );
}