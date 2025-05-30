
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HelpSidebar = () => {
  const helpSections = [
    {
      title: "🚀 Getting Started",
      items: [
        "Click 'Try with Breast Cancer Demo' to load sample data",
        "Navigate through tabs to explore different views",
        "Hover over 💡 icons for helpful tooltips"
      ]
    },
    {
      title: "📊 Understanding Results",
      items: [
        "Fold Change: How much gene activity changes",
        "P-Value: How confident we are in the result",
        "Red = higher in disease, Blue = lower in disease"
      ]
    },
    {
      title: "🔍 Gene Search Tips",
      items: [
        "Try famous genes: TP53, ERBB2, MYC",
        "Use official gene symbols (all caps)",
        "Check the suggestions for valid examples"
      ]
    }
  ];

  const glossary = [
    { term: "Gene Expression", definition: "How actively a gene is being 'read' by the cell" },
    { term: "Fold Change", definition: "How many times more (or less) active a gene is" },
    { term: "P-Value", definition: "Probability the difference happened by chance" },
    { term: "Upregulated", definition: "Gene is more active in disease" },
    { term: "Downregulated", definition: "Gene is less active in disease" },
    { term: "Volcano Plot", definition: "Chart showing all gene changes at once" },
    { term: "Heatmap", definition: "Color-coded view of gene activity patterns" }
  ];

  return (
    <Sidebar className="border-r-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white">
      <SidebarHeader className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">❓</span>
          <h2 className="font-bold text-xl">Help & Guide</h2>
        </div>
        <SidebarTrigger className="text-white hover:bg-white/20 mt-2" />
      </SidebarHeader>
      
      <SidebarContent className="p-6 space-y-6">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              🎓 First Time Here?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p className="text-gray-700 leading-relaxed">
              This tool helps you explore how genes behave differently in healthy vs disease samples.
            </p>
            <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800 border border-blue-300">
              No biology background needed!
            </Badge>
          </CardContent>
        </Card>

        {helpSections.map((section, index) => (
          <SidebarGroup key={index} className="space-y-3">
            <SidebarGroupLabel className="text-base font-bold text-gray-800 border-b border-gray-200 pb-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton className="text-sm h-auto p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <span className="text-left leading-relaxed text-gray-700">{item}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <Card className="border-2 border-purple-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">📚 Quick Glossary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {glossary.map((item, index) => (
              <div key={index} className="border-l-4 border-purple-300 pl-4 py-2 bg-purple-50 rounded-r-lg">
                <div className="font-bold text-sm text-purple-800">{item.term}</div>
                <div className="text-xs text-gray-700 mt-1 leading-relaxed">{item.definition}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">🤔 Sample Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <p className="text-green-700 font-semibold p-2 bg-green-100 rounded-lg">"Which gene changes the most?"</p>
              <p className="text-blue-700 font-semibold p-2 bg-blue-100 rounded-lg">"What happens to TP53 in cancer?"</p>
              <p className="text-purple-700 font-semibold p-2 bg-purple-100 rounded-lg">"Are cell growth genes affected?"</p>
            </div>
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
};

export default HelpSidebar;
