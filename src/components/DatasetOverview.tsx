
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dataset, getCategoryColor, getDifficultyColor } from '@/data/datasets';

interface DatasetOverviewProps {
  dataset: Dataset;
}

const DatasetOverview = ({ dataset }: DatasetOverviewProps) => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className={`border-2 bg-gradient-to-r from-green-50 to-blue-50 border-green-200`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 flex-wrap">
              <span className={`w-4 h-4 rounded-full bg-gradient-to-r ${getCategoryColor(dataset.category)}`}></span>
              🧬 Dataset: {dataset.id}
              <Badge className={`${getDifficultyColor(dataset.difficulty)}`}>
                {dataset.difficulty}
              </Badge>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-help">💡</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GEO (Gene Expression Omnibus) datasets contain gene activity measurements from biological samples</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-gray-600">{dataset.title}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{dataset.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">📊 Sample Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Badge variant="destructive">❌ Disease Samples</Badge>
                    </span>
                    <span className="font-semibold">{dataset.tumorSamples}</span>
                  </div>
                  {dataset.normalSamples > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">✅ Healthy Samples</Badge>
                      </span>
                      <span className="font-semibold">{dataset.normalSamples}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Total Genes Measured</span>
                    <span className="font-semibold">{dataset.totalGenes.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">🔬 Study Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Disease Type:</span>
                    <span className="ml-2 font-medium">{dataset.diseaseType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <Badge className={`ml-2 text-xs capitalize bg-gradient-to-r ${getCategoryColor(dataset.category)} text-white`}>
                      {dataset.category}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Organism:</span>
                    <span className="ml-2 font-medium">{dataset.organism}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Platform:</span>
                    <span className="ml-2 text-xs">{dataset.platform}</span>
                  </div>
                  {dataset.notes && (
                    <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-blue-800 font-medium">📝 Notes:</span>
                      <span className="ml-2 text-blue-700">{dataset.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 What This Means
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full cursor-help">💡</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This section explains the biological significance of the dataset in simple terms</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{dataset.summary}</p>
            
            <h4 className="font-semibold text-gray-800 mb-2">🔍 Key Findings to Explore:</h4>
            <ul className="space-y-2">
              {dataset.keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{finding}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">🧠 Understanding Gene Expression</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Gene Expression Basics:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Genes are like instruction manuals for cells</li>
                  <li>• Expression = how actively a gene is being "read"</li>
                  <li>• Higher expression = more gene activity</li>
                  <li>• Diseases often change gene activity patterns</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Why This Matters:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Helps identify disease mechanisms</li>
                  <li>• Can reveal potential drug targets</li>
                  <li>• Aids in developing diagnostic tests</li>
                  <li>• Advances personalized medicine</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default DatasetOverview;
