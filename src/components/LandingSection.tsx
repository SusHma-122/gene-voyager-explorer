
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DatasetSelector from '@/components/DatasetSelector';
import { Dataset } from '@/data/datasets';

interface LandingSectionProps {
  onDatasetLoad: (dataset: Dataset) => void;
}

const LandingSection = ({ onDatasetLoad }: LandingSectionProps) => {
  return (
    <div className="space-y-8 px-4">
      <DatasetSelector onDatasetLoad={onDatasetLoad} />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 transform hover:scale-105">
          <CardHeader className="pb-4 px-8 pt-8">
            <CardTitle className="flex items-center gap-3 text-blue-800 text-2xl tracking-wide">
              💡 What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="bg-white/70 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-gray-700 mb-6 leading-relaxed tracking-wide text-lg">
                This platform teaches you bioinformatics through hands-on exploration of real medical research data. 
                You'll understand how diseases affect gene activity at the molecular level.
              </p>
              <ul className="space-y-4 text-base text-gray-700">
                <li className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
                  <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                  <span className="tracking-wide leading-relaxed">How genes behave differently in disease vs healthy tissue</span>
                </li>
                <li className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 mt-2"></span>
                  <span className="tracking-wide leading-relaxed">Which genes are most affected by different diseases</span>
                </li>
                <li className="flex items-start gap-4 p-3 bg-purple-50 rounded-lg">
                  <span className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 mt-2"></span>
                  <span className="tracking-wide leading-relaxed">Basic bioinformatics applied to real medical data</span>
                </li>
                <li className="flex items-start gap-4 p-3 bg-orange-50 rounded-lg">
                  <span className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0 mt-2"></span>
                  <span className="tracking-wide leading-relaxed">How to interpret scientific visualizations</span>
                </li>
                <li className="flex items-start gap-4 p-3 bg-red-50 rounded-lg">
                  <span className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 mt-2"></span>
                  <span className="tracking-wide leading-relaxed">Disease mechanisms at the molecular level</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 transform hover:scale-105">
          <CardHeader className="pb-4 px-8 pt-8">
            <CardTitle className="flex items-center gap-3 text-green-800 text-2xl tracking-wide">
              🎯 Dataset Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="bg-white/70 rounded-xl p-6 backdrop-blur-sm">
              <p className="text-gray-700 mb-6 leading-relaxed tracking-wide text-lg">
                Choose from carefully curated datasets spanning major disease categories. Each dataset contains real patient samples from published research studies.
              </p>
              <ul className="space-y-4 text-base text-gray-700">
                <li className="flex items-start gap-4 p-3 bg-red-50 rounded-lg">
                  <span className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex-shrink-0 mt-1"></span>
                  <div className="tracking-wide leading-relaxed">
                    <strong>Cancer:</strong> Tumor vs normal tissue comparisons across breast, lung, and blood cancers
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 bg-orange-50 rounded-lg">
                  <span className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0 mt-1"></span>
                  <div className="tracking-wide leading-relaxed">
                    <strong>Inflammatory:</strong> Disease-related inflammation including asthma and endometriosis
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 bg-purple-50 rounded-lg">
                  <span className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex-shrink-0 mt-1"></span>
                  <div className="tracking-wide leading-relaxed">
                    <strong>Neurological:</strong> Brain and nervous system disorders like Alzheimer's disease
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
                  <span className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                  <div className="tracking-wide leading-relaxed">
                    <strong>Metabolic:</strong> Diabetes and kidney disease affecting body metabolism
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
                  <span className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0 mt-1"></span>
                  <div className="tracking-wide leading-relaxed">
                    <strong>Respiratory:</strong> Lung and airway diseases including smoking-related changes
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
        <CardHeader className="px-8 pt-8 pb-4">
          <CardTitle className="text-purple-800 text-center text-3xl tracking-wide">🧠 Beginner's Guide</CardTitle>
          <p className="text-center text-purple-700 mt-4 text-lg tracking-wide leading-relaxed">
            New to gene expression analysis? Start here for the best learning experience.
          </p>
        </CardHeader>
        <CardContent className="text-gray-700 px-8 pb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/70 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🟢</span>
              </div>
              <h4 className="font-semibold mb-3 text-green-800 text-xl tracking-wide">Start with Green</h4>
              <p className="text-base tracking-wide leading-relaxed">
                Beginner-friendly datasets with clear differences and small sample sizes. 
                Perfect for understanding the basics of gene expression analysis.
              </p>
            </div>
            <div className="text-center bg-white/70 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🟡</span>
              </div>
              <h4 className="font-semibold mb-3 text-yellow-800 text-xl tracking-wide">Try Yellow Next</h4>
              <p className="text-base tracking-wide leading-relaxed">
                Intermediate datasets with more samples and complex patterns. 
                Build on your knowledge with moderate difficulty analyses.
              </p>
            </div>
            <div className="text-center bg-white/70 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔴</span>
              </div>
              <h4 className="font-semibold mb-3 text-red-800 text-xl tracking-wide">Advanced Red</h4>
              <p className="text-base tracking-wide leading-relaxed">
                Large datasets perfect for machine learning and complex analysis. 
                Challenge yourself with real-world research complexity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingSection;
