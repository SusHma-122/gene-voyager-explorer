
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DatasetSelector from '@/components/DatasetSelector';
import { Dataset } from '@/data/datasets';

interface LandingSectionProps {
  onDatasetLoad: (dataset: Dataset) => void;
}

const LandingSection = ({ onDatasetLoad }: LandingSectionProps) => {
  return (
    <div className="space-y-6">
      <DatasetSelector onDatasetLoad={onDatasetLoad} />

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              💡 What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                How genes behave differently in disease vs healthy tissue
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                Which genes are most affected by different diseases
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                Basic bioinformatics applied to real medical data
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                How to interpret scientific visualizations
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                Disease mechanisms at the molecular level
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              🎯 Dataset Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex-shrink-0"></span>
                <span><strong>Cancer:</strong> Tumor vs normal comparisons</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0"></span>
                <span><strong>Inflammatory:</strong> Disease-related inflammation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex-shrink-0"></span>
                <span><strong>Neurological:</strong> Brain and nervous system</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0"></span>
                <span><strong>Metabolic:</strong> Diabetes, kidney disease</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0"></span>
                <span><strong>Respiratory:</strong> Lung and airway diseases</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800 text-center">🧠 Beginner's Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🟢</span>
              </div>
              <h4 className="font-semibold mb-2 text-green-800">Start with Green</h4>
              <p className="text-sm">Beginner-friendly datasets with clear differences and small sample sizes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🟡</span>
              </div>
              <h4 className="font-semibold mb-2 text-yellow-800">Try Yellow Next</h4>
              <p className="text-sm">Intermediate datasets with more samples and complex patterns</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔴</span>
              </div>
              <h4 className="font-semibold mb-2 text-red-800">Advanced Red</h4>
              <p className="text-sm">Large datasets perfect for machine learning and complex analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingSection;
