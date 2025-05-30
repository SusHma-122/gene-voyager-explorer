
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const DifferentialAnalysis = ({ dataset }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock differential expression data
  const mockData = [
    { gene: 'ERBB2', foldChange: 4.2, pValue: 0.0001, meaning: 'Strongly upregulated in cancer - important oncogene', direction: 'up' },
    { gene: 'TP53', foldChange: -2.1, pValue: 0.0023, meaning: 'Downregulated - tumor suppressor gene', direction: 'down' },
    { gene: 'MYC', foldChange: 3.8, pValue: 0.0005, meaning: 'Upregulated - promotes cell growth', direction: 'up' },
    { gene: 'BRCA1', foldChange: -1.9, pValue: 0.0156, meaning: 'Slightly downregulated - DNA repair gene', direction: 'down' },
    { gene: 'ESR1', foldChange: 2.4, pValue: 0.0089, meaning: 'Upregulated - estrogen receptor', direction: 'up' },
    { gene: 'CCND1', foldChange: 3.1, pValue: 0.0012, meaning: 'Upregulated - cell cycle control', direction: 'up' },
    { gene: 'CDH1', foldChange: -2.8, pValue: 0.0034, meaning: 'Downregulated - cell adhesion', direction: 'down' },
    { gene: 'VEGFA', foldChange: 2.9, pValue: 0.0067, meaning: 'Upregulated - blood vessel formation', direction: 'up' }
  ];

  const getSignificanceLabel = (pValue) => {
    if (pValue < 0.001) return { label: 'Very Strong', color: 'bg-green-500' };
    if (pValue < 0.01) return { label: 'Strong', color: 'bg-yellow-500' };
    if (pValue < 0.05) return { label: 'Moderate', color: 'bg-orange-500' };
    return { label: 'Weak', color: 'bg-red-500' };
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Differential Gene Expression Results
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-help">💡</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This shows genes that behave differently between healthy and disease samples</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-gray-600">Genes with significant expression changes in {dataset.diseaseType}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">🔑 How to Read This Table:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                <div>
                  <strong>Fold Change:</strong> How much gene activity increases (positive) or decreases (negative) in disease
                </div>
                <div>
                  <strong>P-Value:</strong> How confident we are this difference is real (lower = more confident)
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">Gene Name</th>
                    <th className="border border-gray-200 p-3 text-center">Fold Change</th>
                    <th className="border border-gray-200 p-3 text-center">Significance</th>
                    <th className="border border-gray-200 p-3 text-left">What This Means</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row, index) => {
                    const significance = getSignificanceLabel(row.pValue);
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-3 font-medium text-blue-700">
                          {row.gene}
                        </td>
                        <td className="border border-gray-200 p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Badge 
                              variant={row.direction === 'up' ? 'destructive' : 'secondary'}
                              className={row.direction === 'up' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}
                            >
                              {row.direction === 'up' ? '↑' : '↓'} {Math.abs(row.foldChange).toFixed(1)}x
                            </Badge>
                          </div>
                        </td>
                        <td className="border border-gray-200 p-3 text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center justify-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${significance.color}`}></div>
                                <span className="text-sm">{significance.label}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>P-value: {row.pValue.toFixed(4)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        <td className="border border-gray-200 p-3 text-sm text-gray-700">
                          {row.meaning}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🌋 Volcano Plot
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full cursor-help">💡</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Each dot is a gene. Top genes are most significantly changed.</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-t from-gray-100 to-white border rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium">📊 Interactive Volcano Plot</p>
                  <p className="text-sm mt-2">Fold Change vs Significance</p>
                  <p className="text-xs mt-1">(Visualization placeholder)</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>← Less in Disease</span>
                <span>More in Disease →</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔥 Expression Heatmap
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full cursor-help">💡</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Red = high expression, Blue = low expression. Each column is a sample.</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-blue-200 via-white to-red-200 border rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <p className="text-lg font-medium">🎨 Expression Heatmap</p>
                  <p className="text-sm mt-2">Top 20 Changed Genes</p>
                  <p className="text-xs mt-1">(Visualization placeholder)</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  Healthy
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  Disease
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">🎯 Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">🔼 Upregulated Genes (More Active in Disease):</h4>
                <ul className="text-sm space-y-1">
                  {mockData.filter(d => d.direction === 'up').slice(0, 4).map((gene, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <strong>{gene.gene}</strong> - {gene.meaning.split(' - ')[1]}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">🔽 Downregulated Genes (Less Active in Disease):</h4>
                <ul className="text-sm space-y-1">
                  {mockData.filter(d => d.direction === 'down').slice(0, 4).map((gene, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <strong>{gene.gene}</strong> - {gene.meaning.split(' - ')[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default DifferentialAnalysis;
