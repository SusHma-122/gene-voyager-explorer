
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Gene Explorer
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full cursor-help">💡</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search for specific genes to see how they behave in healthy vs disease samples</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-gray-600">Explore individual gene expression patterns</p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Search for a gene (e.g., TP53, ERBB2, MYC)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                Search Gene
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Try these examples:</span>
              {Object.keys(geneDatabase).map(gene => (
                <Button 
                  key={gene}
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm(gene);
                    setSelectedGene(geneDatabase[gene]);
                  }}
                >
                  {gene}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedGene && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🧬 {selectedGene.name} - {selectedGene.fullName}
                  <Badge variant={selectedGene.foldChange > 0 ? 'destructive' : 'secondary'}>
                    {selectedGene.foldChange > 0 ? '↑ Upregulated' : '↓ Downregulated'}
                  </Badge>
                </CardTitle>
                <p className="text-gray-600">{selectedGene.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">📍 Gene Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Function:</span>
                        <span className="ml-2">{selectedGene.function}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <span className="ml-2">{selectedGene.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Fold Change:</span>
                        <span className={`ml-2 font-semibold ${selectedGene.foldChange > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                          {selectedGene.foldChange > 0 ? '+' : ''}{selectedGene.foldChange}x
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">P-Value:</span>
                        <span className="ml-2 font-semibold">{selectedGene.pValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">📊 Expression Statistics</h4>
                    <div className="space-y-2 text-sm">
                      {(() => {
                        const healthyStats = calculateStats(selectedGene.healthyExpression);
                        const diseaseStats = calculateStats(selectedGene.diseaseExpression);
                        return (
                          <>
                            <div className="flex justify-between">
                              <span className="text-green-700">✅ Healthy Mean:</span>
                              <span className="font-semibold">{healthyStats.mean} ± {healthyStats.std}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-red-700">❌ Disease Mean:</span>
                              <span className="font-semibold">{diseaseStats.mean} ± {diseaseStats.std}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Difference:</span>
                              <span className={`font-semibold ${selectedGene.foldChange > 0 ? 'text-red-600' : 'text-blue-600'}`}>
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📈 Expression Levels Comparison
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-help">💡</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This would show a box plot comparing gene expression between healthy and disease samples</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-green-100 via-white to-red-100 border rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <p className="text-lg font-medium">📊 Box Plot Visualization</p>
                    <p className="text-sm mt-2">{selectedGene.name} Expression Distribution</p>
                    <p className="text-xs mt-1">(Interactive plot placeholder)</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    Healthy Samples
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    Disease Samples
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  🏥 Clinical Significance
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full cursor-help">💡</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Real-world medical importance of this gene's expression pattern</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{selectedGene.clinical}</p>
                
                <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">🎯 What This Means for {dataset.diseaseType}:</h4>
                  <p className="text-sm text-gray-700">
                    {selectedGene.foldChange > 0 
                      ? `The ${selectedGene.foldChange}x increase in ${selectedGene.name} expression suggests this gene is more active in disease samples, which may contribute to disease progression or represent a cellular response to disease.`
                      : `The ${Math.abs(selectedGene.foldChange)}x decrease in ${selectedGene.name} expression suggests this gene is less active in disease samples, which may indicate loss of normal cellular function or regulatory mechanisms.`
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
