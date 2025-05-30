
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingSection from '@/components/LandingSection';
import DatasetOverview from '@/components/DatasetOverview';
import DifferentialAnalysis from '@/components/DifferentialAnalysis';
import GeneExplorer from '@/components/GeneExplorer';
import HelpSidebar from '@/components/HelpSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Dataset } from '@/data/datasets';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [activeDataset, setActiveDataset] = useState<Dataset | null>(null);
  const [activeTab, setActiveTab] = useState('landing');

  const handleDatasetLoad = (dataset: Dataset) => {
    setActiveDataset(dataset);
    setActiveTab('overview');
    toast({
      title: `Dataset Loaded! 🎉`,
      description: `${dataset.id}: ${dataset.title} is ready for exploration.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 w-full">
        <div className="flex w-full">
          <HelpSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <header className="text-center mb-12 px-6">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                  🧬 Gene Expression Explorer
                </h1>
                <p className="text-gray-700 text-xl max-w-4xl mx-auto leading-relaxed tracking-wide px-4 py-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-sm">
                  Explore how genes behave in healthy and disease samples across multiple conditions — no biology degree required! 
                  Discover the molecular stories hidden in real research data with interactive visualizations and beginner-friendly explanations.
                </p>
                {activeDataset && (
                  <div className="mt-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-200 inline-block shadow-lg">
                    <span className="text-sm text-gray-600 tracking-wide">Currently analyzing: </span>
                    <span className="font-semibold text-blue-800 tracking-wide">{activeDataset.id} - {activeDataset.diseaseType}</span>
                  </div>
                )}
              </header>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-10 h-16 bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-xl rounded-2xl p-2">
                  <TabsTrigger 
                    value="landing" 
                    className="flex items-center gap-3 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300 px-6 py-3 tracking-wide"
                  >
                    🏠 Choose Dataset
                  </TabsTrigger>
                  <TabsTrigger 
                    value="overview" 
                    disabled={!activeDataset} 
                    className="flex items-center gap-3 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-xl transition-all duration-300 px-6 py-3 tracking-wide disabled:opacity-50"
                  >
                    🧬 Dataset Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analysis" 
                    disabled={!activeDataset} 
                    className="flex items-center gap-3 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300 px-6 py-3 tracking-wide disabled:opacity-50"
                  >
                    📊 Gene Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="explorer" 
                    disabled={!activeDataset} 
                    className="flex items-center gap-3 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl transition-all duration-300 px-6 py-3 tracking-wide disabled:opacity-50"
                  >
                    🔍 Gene Explorer
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="landing" className="mt-0">
                  <LandingSection onDatasetLoad={handleDatasetLoad} />
                </TabsContent>

                <TabsContent value="overview" className="mt-0">
                  {activeDataset && <DatasetOverview dataset={activeDataset} />}
                </TabsContent>

                <TabsContent value="analysis" className="mt-0">
                  {activeDataset && <DifferentialAnalysis dataset={activeDataset} />}
                </TabsContent>

                <TabsContent value="explorer" className="mt-0">
                  {activeDataset && <GeneExplorer dataset={activeDataset} />}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
