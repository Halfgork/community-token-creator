'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Info,
  CheckCircle,
  Users,
  Coins,
  Settings as SettingsIcon,
  Zap
} from 'lucide-react';

interface CommunityFormData {
  // Basic Info
  name: string;
  description: string;
  image?: File;
  
  // Token Settings
  tokenName: string;
  tokenSymbol: string;
  initialSupply: number;
  decimals: number;
  
  // Community Settings
  isPublic: boolean;
  requiresApproval: boolean;
  votingPeriod: number;
  quorumPercentage: number;
  proposalThreshold: number;
  categories: string[];
  
  // Distribution
  treasuryAllocation: number;
  founderAllocation: number;
  communityAllocation: number;
}

const initialFormData: CommunityFormData = {
  name: '',
  description: '',
  tokenName: '',
  tokenSymbol: '',
  initialSupply: 1000000,
  decimals: 7,
  isPublic: true,
  requiresApproval: false,
  votingPeriod: 7,
  quorumPercentage: 20,
  proposalThreshold: 1000,
  categories: ['general', 'treasury', 'governance'],
  treasuryAllocation: 50,
  founderAllocation: 20,
  communityAllocation: 30,
};

const steps = [
  { id: 1, name: 'Basic Info', icon: Info },
  { id: 2, name: 'Token Settings', icon: Coins },
  { id: 3, name: 'Governance', icon: SettingsIcon },
  { id: 4, name: 'Distribution', icon: Users },
  { id: 5, name: 'Review', icon: CheckCircle },
];

export default function CreateCommunityPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CommunityFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const updateFormData = (data: Partial<CommunityFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    // Redirect to community page
    console.log('Creating community with data:', formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Community Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your community name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your community's purpose and goals"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Community Image (Optional)
              </label>
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                <Upload className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                <p className="text-secondary-600">Click to upload or drag and drop</p>
                <p className="text-secondary-500 text-sm">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Token Name
                </label>
                <input
                  type="text"
                  value={formData.tokenName}
                  onChange={(e) => updateFormData({ tokenName: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Community Token"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={formData.tokenSymbol}
                  onChange={(e) => updateFormData({ tokenSymbol: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="COMM"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Initial Supply
                </label>
                <input
                  type="number"
                  value={formData.initialSupply}
                  onChange={(e) => updateFormData({ initialSupply: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Decimals
                </label>
                <select
                  value={formData.decimals}
                  onChange={(e) => updateFormData({ decimals: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value={7}>7 (Standard)</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-secondary-900">Public Community</h3>
                  <p className="text-sm text-secondary-600">Anyone can discover and join</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => updateFormData({ isPublic: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-secondary-900">Requires Approval</h3>
                  <p className="text-sm text-secondary-600">New members need admin approval</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.requiresApproval}
                  onChange={(e) => updateFormData({ requiresApproval: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Voting Period (days)
                </label>
                <input
                  type="number"
                  value={formData.votingPeriod}
                  onChange={(e) => updateFormData({ votingPeriod: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Quorum Percentage
                </label>
                <input
                  type="number"
                  value={formData.quorumPercentage}
                  onChange={(e) => updateFormData({ quorumPercentage: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="1"
                  max="100"
                />
                <p className="text-sm text-secondary-600 mt-1">
                  Minimum participation needed for proposals to pass
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Proposal Threshold (tokens)
              </label>
              <input
                type="number"
                value={formData.proposalThreshold}
                onChange={(e) => updateFormData({ proposalThreshold: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1"
              />
              <p className="text-sm text-secondary-600 mt-1">
                Minimum tokens required to create a proposal
              </p>
            </div>
          </div>
        );

      case 4:
        const totalAllocation = formData.treasuryAllocation + formData.founderAllocation + formData.communityAllocation;
        
        return (
          <div className="space-y-6">
            <div className="bg-secondary-50 p-4 rounded-lg">
              <h3 className="font-medium text-secondary-900 mb-2">Token Distribution</h3>
              <p className="text-sm text-secondary-600">
                Allocate your initial token supply across different purposes
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Treasury Allocation ({formData.treasuryAllocation}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.treasuryAllocation}
                  onChange={(e) => updateFormData({ treasuryAllocation: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-secondary-600 mt-1">
                  <span>0%</span>
                  <span>{(formData.initialSupply * formData.treasuryAllocation / 100).toLocaleString()} tokens</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Founder Allocation ({formData.founderAllocation}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.founderAllocation}
                  onChange={(e) => updateFormData({ founderAllocation: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-secondary-600 mt-1">
                  <span>0%</span>
                  <span>{(formData.initialSupply * formData.founderAllocation / 100).toLocaleString()} tokens</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Community Allocation ({formData.communityAllocation}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.communityAllocation}
                  onChange={(e) => updateFormData({ communityAllocation: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-secondary-600 mt-1">
                  <span>0%</span>
                  <span>{(formData.initialSupply * formData.communityAllocation / 100).toLocaleString()} tokens</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {totalAllocation !== 100 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  Total allocation: {totalAllocation}%. Must equal 100% to proceed.
                </p>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="font-semibold text-secondary-900 mb-4">Review Your Community</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-secondary-600">Name:</span> {formData.name}</div>
                    <div><span className="text-secondary-600">Description:</span> {formData.description}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Token Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-secondary-600">Name:</span> {formData.tokenName}</div>
                    <div><span className="text-secondary-600">Symbol:</span> {formData.tokenSymbol}</div>
                    <div><span className="text-secondary-600">Supply:</span> {formData.initialSupply.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Governance</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-secondary-600">Voting Period:</span> {formData.votingPeriod} days</div>
                    <div><span className="text-secondary-600">Quorum:</span> {formData.quorumPercentage}%</div>
                    <div><span className="text-secondary-600">Public:</span> {formData.isPublic ? 'Yes' : 'No'}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Distribution</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-secondary-600">Treasury:</span> {formData.treasuryAllocation}%</div>
                    <div><span className="text-secondary-600">Founder:</span> {formData.founderAllocation}%</div>
                    <div><span className="text-secondary-600">Community:</span> {formData.communityAllocation}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-accent-900">Ready to Deploy</h4>
                  <p className="text-accent-800 text-sm mt-1">
                    Your community and token contract will be deployed to the Stellar blockchain. 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link 
              href="/dashboard"
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-2
                    ${isActive ? 'bg-primary-600 text-white' : 
                      isCompleted ? 'bg-accent-600 text-white' : 
                      'bg-secondary-200 text-secondary-600'}
                  `}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-primary-600' : 
                    isCompleted ? 'text-accent-600' : 
                    'text-secondary-600'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block absolute w-full h-0.5 mt-5 ${
                      isCompleted ? 'bg-accent-600' : 'bg-secondary-200'
                    }`} style={{ left: '50%', zIndex: -1 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl border border-secondary-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
              {steps[currentStep - 1].name}
            </h1>
            <p className="text-secondary-600">
              {currentStep === 1 && "Tell us about your community"}
              {currentStep === 2 && "Configure your community token"}
              {currentStep === 3 && "Set up governance rules"}
              {currentStep === 4 && "Allocate token distribution"}
              {currentStep === 5 && "Review and deploy your community"}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-secondary-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 4 && formData.treasuryAllocation + formData.founderAllocation + formData.communityAllocation !== 100) ||
                  (currentStep === 1 && (!formData.name || !formData.description)) ||
                  (currentStep === 2 && (!formData.tokenName || !formData.tokenSymbol))
                }
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center space-x-2 px-8 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deploying...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Deploy Community</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 