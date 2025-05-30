
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

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

  // Generate volcano plot data
  const volcanoData = mockData.map(gene => ({
    ...gene,
    x: gene.foldChange,
    y: -Math.log10(gene.pValue),
    color: gene.direction === 'up' ? '#ef4444' : '#3b82f6'
  }));

  // Generate heatmap data
  const heatmapData = mockData.slice(0, 8).map((gene, index) => ({
    gene: gene.gene,
    samples: Array.from({ length: 12 }, (_, i) => ({
      sample: `S${i + 1}`,
      type: i < 6 ? 'healthy' : 'disease',
      value: gene.direction === 'up' 
        ? (i < 6 ? Math.random() * 2 + 3 : Math.random() * 2 + 7)
        : (i < 6 ? Math.random() * 2 + 7 : Math.random() * 2 + 3)
    }))
  }));

  const getSignificanceLabel = (pValue) => {
    if (pValue < 0.001) return { label: 'Very Strong', color: 'bg-green-500' };
    if (pValue < 0.01) return { label: 'Strong', color: 'bg-yellow-500' };
    if (pValue < 0.05) return { label: 'Moderate', color: 'bg-orange-500' };
    return { label: 'Weak', color: 'bg-red-500' };
  };

  const chartConfig = {
    foldChange: {
      label: "Fold Change",
    },
    pValue: {
      label: "P-Value",
    },
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              📊 Differential Gene Expression Results
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm bg-white/20 text-white px-3 py-1 rounded-full cursor-help hover:bg-white/30 transition-colors">💡</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This shows genes that behave differently between healthy and disease samples</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-blue-100">Genes with significant expression changes in {dataset.diseaseType}</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg shadow-sm">
              <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                🔑 How to Read This Data
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
                <div className="flex items-start gap-2">
                  <span className="text-lg">📈</span>
                  <div>
                    <strong>Fold Change:</strong> How much gene activity increases (positive) or decreases (negative) in disease
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🎯</span>
                  <div>
                    <strong>P-Value:</strong> How confident we are this difference is real (lower = more confident)
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">Gene Name</th>
                    <th className="border-b border-gray-200 p-4 text-center font-semibold text-gray-700">Fold Change</th>
                    <th className="border-b border-gray-200 p-4 text-center font-semibold text-gray-700">Significance</th>
                    <th className="border-b border-gray-200 p-4 text-left font-semibold text-gray-700">What This Means</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row, index) => {
                    const significance = getSignificanceLabel(row.pValue);
                    return (
                      <tr key={index} className="hover:bg-blue-50 transition-colors duration-200">
                        <td className="border-b border-gray-100 p-4 font-bold text-blue-700 text-lg">
                          {row.gene}
                        </td>
                        <td className="border-b border-gray-100 p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Badge 
                              variant={row.direction === 'up' ? 'destructive' : 'secondary'}
                              className={`${row.direction === 'up' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-blue-100 text-blue-800 border-blue-300'} font-semibold px-3 py-1`}
                            >
                              {row.direction === 'up' ? '↑' : '↓'} {Math.abs(row.foldChange).toFixed(1)}x
                            </Badge>
                          </div>
                        </td>
                        <td className="border-b border-gray-100 p-4 text-center">
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center justify-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${significance.color} shadow-sm`}></div>
                                <span className="text-sm font-medium">{significance.label}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>P-value: {row.pValue.toFixed(4)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        <td className="border-b border-gray-100 p-4 text-sm text-gray-700">
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

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-2 border-purple-100 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                🌋 Volcano Plot
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm bg-white/20 text-white px-2 py-1 rounded-full cursor-help hover:bg-white/30 transition-colors">💡</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Each dot is a gene. Higher dots are more significant, further from center are more changed.</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-80">
                <ScatterChart data={volcanoData}>
                  <XAxis 
                    dataKey="x" 
                    type="number"
                    domain={[-5, 5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    dataKey="y"
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Scatter dataKey="y">
                    {volcanoData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ChartContainer>
              <div className="mt-4 flex justify-between text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  ← Less in Disease
                </span>
                <span className="flex items-center gap-2">
                  More in Disease →
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-green-100 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                🔥 Expression Heatmap
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm bg-white/20 text-white px-2 py-1 rounded-full cursor-help hover:bg-white/30 transition-colors">💡</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Red = high expression, Blue = low expression. Each column is a sample.</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                {heatmapData.map((gene, geneIndex) => (
                  <div key={geneIndex} className="flex items-center gap-2">
                    <div className="w-16 text-xs font-medium text-gray-700 truncate">
                      {gene.gene}
                    </div>
                    <div className="flex gap-1 flex-1">
                      {gene.samples.map((sample, sampleIndex) => {
                        const intensity = Math.min(Math.max(sample.value / 10, 0), 1);
                        const color = sample.type === 'healthy' 
                          ? `rgb(${Math.round(255 * (1 - intensity))}, ${Math.round(255 * (1 - intensity * 0.3))}, 255)`
                          : `rgb(255, ${Math.round(255 * (1 - intensity))}, ${Math.round(255 * (1 - intensity))})`;
                        
                        return (
                          <Tooltip key={sampleIndex}>
                            <TooltipTrigger>
                              <div 
                                className="h-6 w-4 rounded-sm border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors"
                                style={{ backgroundColor: color }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{gene.gene}: {sample.value.toFixed(2)}</p>
                              <p>{sample.type === 'healthy' ? 'Healthy' : 'Disease'} sample</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded"></div>
                  Healthy
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded"></div>
                  Disease
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-2 border-emerald-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">🎯 Key Biological Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-emerald-700 mb-3 flex items-center gap-2 text-lg">
                  🔼 Upregulated Genes (More Active in Disease)
                </h4>
                <div className="space-y-3">
                  {mockData.filter(d => d.direction === 'up').slice(0, 4).map((gene, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></span>
                      <div>
                        <strong className="text-red-700">{gene.gene}</strong>
                        <p className="text-sm text-gray-600 mt-1">{gene.meaning.split(' - ')[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2 text-lg">
                  🔽 Downregulated Genes (Less Active in Disease)
                </h4>
                <div className="space-y-3">
                  {mockData.filter(d => d.direction === 'down').slice(0, 4).map((gene, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                      <div>
                        <strong className="text-blue-700">{gene.gene}</strong>
                        <p className="text-sm text-gray-600 mt-1">{gene.meaning.split(' - ')[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default DifferentialAnalysis;
