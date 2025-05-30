
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingSection from '@/components/LandingSection';
import DatasetOverview from '@/components/DatasetOverview';
import DifferentialAnalysis from '@/components/DifferentialAnalysis';
import GeneExplorer from '@/components/GeneExplorer';
import HelpSidebar from '@/components/HelpSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  const [activeDataset, setActiveDataset] = useState(null);
  const [activeTab, setActiveTab] = useState('landing');

  const handleDatasetLoad = (dataset) => {
    setActiveDataset(dataset);
    setActiveTab('overview');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 w-full">
        <div className="flex w-full">
          <HelpSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <header className="text-center mb-10">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  🧬 Gene Expression Explorer
                </h1>
                <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                  Explore how genes behave in healthy and disease samples — no biology degree required! 
                  Discover the molecular stories hidden in your data.
                </p>
              </header>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg rounded-xl">
                  <TabsTrigger 
                    value="landing" 
                    className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                  >
                    🏠 Start Here
                  </TabsTrigger>
                  <TabsTrigger 
                    value="overview" 
                    disabled={!activeDataset} 
                    className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    🧬 Dataset Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analysis" 
                    disabled={!activeDataset} 
                    className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    📊 Gene Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="explorer" 
                    disabled={!activeDataset} 
                    className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
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
