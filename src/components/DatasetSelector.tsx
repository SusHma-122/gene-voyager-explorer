
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { availableDatasets, getCategoryColor, getDifficultyColor, Dataset } from '@/data/datasets';
import { Search, Database, Users, BarChart3 } from 'lucide-react';

interface DatasetSelectorProps {
  onDatasetLoad: (dataset: Dataset) => void;
}

const DatasetSelector = ({ onDatasetLoad }: DatasetSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDatasets = availableDatasets.filter(dataset => {
    const matchesSearch = dataset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.diseaseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(availableDatasets.map(d => d.category)))];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-700 flex items-center justify-center gap-2">
            <Database className="w-8 h-8" />
            Choose Your Dataset
          </CardTitle>
          <p className="text-gray-600">
            Select from real research datasets to explore gene expression differences
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search by dataset ID, disease, or keywords..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-6 w-full">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDatasets.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(dataset.category)}`}></span>
                    {dataset.id}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{dataset.diseaseType}</p>
                </div>
                <Badge className={`text-xs ${getDifficultyColor(dataset.difficulty)}`}>
                  {dataset.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700 line-clamp-2">{dataset.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {dataset.tumorSamples + dataset.normalSamples} samples
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  {dataset.organism}
                </div>
              </div>

              <div className="flex gap-2 text-xs">
                {dataset.normalSamples > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {dataset.normalSamples} Normal
                  </Badge>
                )}
                <Badge variant="destructive" className="text-xs">
                  {dataset.tumorSamples} Disease
                </Badge>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={() => onDatasetLoad(dataset)}
                  className={`w-full bg-gradient-to-r ${getCategoryColor(dataset.category)} text-white hover:opacity-90`}
                  size="sm"
                >
                  Load Dataset
                </Button>
              </div>

              {dataset.notes && (
                <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  💡 {dataset.notes}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-gray-500">No datasets found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-2"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatasetSelector;
