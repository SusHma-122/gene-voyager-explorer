
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 w-full">
        <div className="flex w-full">
          <HelpSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <header className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  🧬 Gene Expression Explorer
                </h1>
                <p className="text-gray-600 text-lg">
                  Explore how genes behave in healthy and disease samples — no biology degree required!
                </p>
              </header>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="landing" className="flex items-center gap-2">
                    🏠 Start Here
                  </TabsTrigger>
                  <TabsTrigger value="overview" disabled={!activeDataset} className="flex items-center gap-2">
                    🧬 Dataset Overview
                  </TabsTrigger>
                  <TabsTrigger value="analysis" disabled={!activeDataset} className="flex items-center gap-2">
                    📊 Gene Analysis
                  </TabsTrigger>
                  <TabsTrigger value="explorer" disabled={!activeDataset} className="flex items-center gap-2">
                    🔍 Gene Explorer
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="landing">
                  <LandingSection onDatasetLoad={handleDatasetLoad} />
                </TabsContent>

                <TabsContent value="overview">
                  {activeDataset && <DatasetOverview dataset={activeDataset} />}
                </TabsContent>

                <TabsContent value="analysis">
                  {activeDataset && <DifferentialAnalysis dataset={activeDataset} />}
                </TabsContent>

                <TabsContent value="explorer">
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
