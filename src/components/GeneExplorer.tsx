
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { toast } from '@/hooks/use-toast';

const GeneExplorer = ({ dataset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGene, setSelectedGene] = useState(null);

  // Mock gene data
  const geneDatabase = {
    'TP53': {
      name: 'TP53',
      fullName: 'Tumor Protein P53',
      description: 'Known as the "guardian of the genome", TP53 is a crucial tumor suppressor gene that prevents cancer formation.',
      function: 'DNA damage response, cell cycle control, apoptosis',
      location: 'Chromosome 17p13.1',
      healthyExpression: [8.2, 8.5, 7.9, 8.1, 8.3, 7.8, 8.0, 8.4, 8.2, 7.9, 8.1, 8.3],
      diseaseExpression: [6.1, 5.8, 6.3, 5.9, 6.0, 6.2, 5.7, 6.1, 5.9, 6.4, 6.0, 5.8],
      foldChange: -1.3,
      pValue: 0.0023,
      clinical: 'TP53 mutations are found in over 50% of human cancers. Lower expression in this dataset suggests potential dysfunction.'
    },
    'ERBB2': {
      name: 'ERBB2',
      fullName: 'Erb-B2 Receptor Tyrosine Kinase 2',
      description: 'Also known as HER2, this gene codes for a protein that promotes cell growth and division.',
      function: 'Cell growth signaling, receptor activity',
      location: 'Chromosome 17q12',
      healthyExpression: [5.1, 4.9, 5.3, 5.0, 4.8, 5.2, 5.1, 4.9, 5.0, 5.1, 4.9, 5.2],
      diseaseExpression: [8.9, 9.2, 8.7, 9.1, 8.8, 9.0, 9.3, 8.9, 9.1, 8.8, 9.0, 9.2],
      foldChange: 4.2,
      pValue: 0.0001,
      clinical: 'ERBB2 overexpression occurs in ~20% of breast cancers and is associated with more aggressive tumors. This is a target for therapy.'
    },
    'MYC': {
      name: 'MYC',
      fullName: 'MYC Proto-Oncogene',
      description: 'A master regulator gene that controls cell growth, proliferation, and metabolism.',
      function: 'Transcription regulation, cell cycle progression',
      location: 'Chromosome 8q24.21',
      healthyExpression: [6.2, 6.1, 6.3, 6.0, 6.2, 6.1, 6.3, 6.0, 6.2, 6.1, 6.0, 6.3],
      diseaseExpression: [9.1, 9.3, 8.9, 9.2, 9.0, 9.1, 9.4, 9.0, 9.2, 8.9, 9.1, 9.3],
      foldChange: 3.8,
      pValue: 0.0005,
      clinical: 'MYC overexpression drives uncontrolled cell growth and is implicated in many cancer types.'
    }
  };

  const handleSearch = () => {
    const gene = searchTerm.toUpperCase();
    if (geneDatabase[gene]) {
      setSelectedGene(geneDatabase[gene]);
      toast({
        title: `Gene Found! 🧬`,
        description: `Displaying results for ${gene}`,
      });
    } else {
      toast({
        title: "Gene Not Found 🔍",
        description: "Try searching for TP53, ERBB2, or MYC",
        variant: "destructive"
      });
    }
  };

  const calculateStats = (data) => {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    const std = Math.sqrt(variance);
    return { mean: mean.toFixed(2), std: std.toFixed(2) };
  };

  const getBoxPlotData = (gene) => {
    if (!gene) return [];
    
    const healthyStats = calculateStats(gene.healthyExpression);
    const diseaseStats = calculateStats(gene.diseaseExpression);
    
    return [
      {
        category: 'Healthy',
        value: parseFloat(healthyStats.mean),
        samples: gene.healthyExpression.length,
        color: '#10b981'
      },
      {
        category: 'Disease', 
        value: parseFloat(diseaseStats.mean),
        samples: gene.diseaseExpression.length,
        color: '#ef4444'
      }
    ];
  };

  const chartConfig = {
    value: {
      label: "Expression Level",
    },
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              🔍 Gene Explorer
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm bg-white/20 text-white px-3 py-1 rounded-full cursor-help hover:bg-white/30 transition-colors">💡</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search for specific genes to see how they behave in healthy vs disease samples</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-purple-100 text-lg">Explore individual gene expression patterns</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-3 mb-6">
              <Input 
                placeholder="Search for a gene (e.g., TP53, ERBB2, MYC)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 text-lg p-4 border-2 border-purple-200 focus:border-purple-400 rounded-lg"
              />
              <Button 
                onClick={handleSearch} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Search Gene
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-gray-600 font-medium">✨ Try these examples:</span>
              {Object.keys(geneDatabase).map(gene => (
                <Button 
                  key={gene}
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm(gene);
                    setSelectedGene(geneDatabase[gene]);
                  }}
                  className="border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-colors duration-200"
                >
                  {gene}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedGene && (
          <div className="space-y-8">
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  🧬 {selectedGene.name} - {selectedGene.fullName}
                  <Badge 
                    variant={selectedGene.foldChange > 0 ? 'destructive' : 'secondary'}
                    className={`${selectedGene.foldChange > 0 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-blue-100 text-blue-800 border-blue-300'} px-3 py-1 text-sm font-semibold`}
                  >
                    {selectedGene.foldChange > 0 ? '↑ Upregulated' : '↓ Downregulated'}
                  </Badge>
                </CardTitle>
                <p className="text-emerald-100 text-lg">{selectedGene.description}</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      📍 Gene Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Function:</span>
                        <span className="font-semibold text-right">{selectedGene.function}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Location:</span>
                        <span className="font-semibold">{selectedGene.location}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Fold Change:</span>
                        <span className={`font-bold text-lg ${selectedGene.foldChange > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                          {selectedGene.foldChange > 0 ? '+' : ''}{selectedGene.foldChange}x
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">P-Value:</span>
                        <span className="font-bold">{selectedGene.pValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      📊 Expression Statistics
                    </h4>
                    <div className="space-y-3 text-sm">
                      {(() => {
                        const healthyStats = calculateStats(selectedGene.healthyExpression);
                        const diseaseStats = calculateStats(selectedGene.diseaseExpression);
                        return (
                          <>
                            <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                              <span className="text-green-700 font-medium flex items-center gap-2">
                                ✅ Healthy Mean:
                              </span>
                              <span className="font-bold text-green-800">{healthyStats.mean} ± {healthyStats.std}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                              <span className="text-red-700 font-medium flex items-center gap-2">
                                ❌ Disease Mean:
                              </span>
                              <span className="font-bold text-red-800">{diseaseStats.mean} ± {diseaseStats.std}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <span className="text-purple-700 font-medium">Difference:</span>
                              <span className={`font-bold ${selectedGene.foldChange > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                                {selectedGene.foldChange > 0 ? 'Higher' : 'Lower'} in disease
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-blue-100 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  📈 Expression Levels Comparison
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm bg-white/20 text-white px-2 py-1 rounded-full cursor-help hover:bg-white/30 transition-colors">💡</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compare average gene expression between healthy and disease samples</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="h-80">
                  <BarChart data={getBoxPlotData(selectedGene)}>
                    <XAxis 
                      dataKey="category" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 14, fontWeight: 600 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {getBoxPlotData(selectedGene).map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
                <div className="mt-6 flex justify-center gap-8 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    Healthy Samples
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    Disease Samples
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-3">
                  🏥 Clinical Significance
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm bg-white/20 text-white px-2 py-1 rounded-full cursor-help hover:bg-white/30 transition-colors">💡</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Real-world medical importance of this gene's expression pattern</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 text-lg mb-6">{selectedGene.clinical}</p>
                
                <div className="p-6 bg-white rounded-lg border-2 border-amber-200 shadow-sm">
                  <h4 className="font-bold text-amber-800 mb-4 text-lg flex items-center gap-2">
                    🎯 What This Means for {dataset.diseaseType}:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedGene.foldChange > 0 
                      ? `The ${selectedGene.foldChange}x increase in ${selectedGene.name} expression suggests this gene is more active in disease samples, which may contribute to disease progression or represent a cellular response to disease. This upregulation could be a potential therapeutic target.`
                      : `The ${Math.abs(selectedGene.foldChange)}x decrease in ${selectedGene.name} expression suggests this gene is less active in disease samples, which may indicate loss of normal cellular function or regulatory mechanisms. This downregulation could contribute to disease development.`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default GeneExplorer;
