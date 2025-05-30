
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const LandingSection = ({ onDatasetLoad }) => {
  const handleDemoLoad = () => {
    const demoDataset = {
      id: 'GSE42872',
      title: 'Breast Cancer vs Normal Tissue',
      description: 'Gene expression analysis comparing breast tumor samples to normal breast tissue',
      tumorSamples: 12,
      normalSamples: 12,
      totalGenes: 54675,
      platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
      organism: 'Homo sapiens',
      diseaseType: 'Breast Cancer',
      summary: 'This study compares gene expression patterns between breast cancer tumor tissue and normal breast tissue to identify genes that are differently expressed in cancer.',
      keyFindings: [
        'ERBB2 (HER2) is significantly upregulated in tumor samples',
        'TP53 shows altered expression patterns in cancer',
        'Cell cycle genes are generally more active in tumors'
      ]
    };
    
    onDatasetLoad(demoDataset);
    toast({
      title: "Demo Dataset Loaded! 🎉",
      description: "Breast cancer dataset GSE42872 is ready for exploration.",
    });
  };

  const handleCustomDataset = () => {
    toast({
      title: "Feature Coming Soon! 🚧",
      description: "Custom dataset loading will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-700">🚀 Get Started</CardTitle>
          <p className="text-gray-600">
            Load a gene expression dataset to begin exploring genetic differences between healthy and disease samples
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Enter GEO Dataset ID (e.g., GSE42872)" 
              className="flex-1"
            />
            <Button onClick={handleCustomDataset} variant="outline">
              Load Dataset
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or try our demo</span>
            </div>
          </div>

          <Button 
            onClick={handleDemoLoad} 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            size="lg"
          >
            🧬 Try with Breast Cancer Demo Dataset
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                How genes behave differently in disease vs healthy tissue
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Which genes are most affected by disease
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Basic machine learning applied to medical data
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                How to interpret scientific visualizations
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Perfect For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Students learning about genetics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Researchers exploring new datasets
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Anyone curious about precision medicine
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Educators teaching bioinformatics concepts
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingSection;
