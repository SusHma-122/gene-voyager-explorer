
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
        "Click 'Try with Breast Cancer Demo' to load sample data and see how the analysis works",
        "Navigate through tabs to explore different views - each builds on the previous one",
        "Hover over 💡 icons for helpful tooltips explaining scientific terms"
      ]
    },
    {
      title: "📊 Understanding Results", 
      items: [
        "Fold Change: How much gene activity changes (2x = doubled, 0.5x = halved)",
        "P-Value: How confident we are in the result (below 0.05 = statistically significant)",
        "Red genes = higher in disease, Blue genes = lower in disease samples"
      ]
    },
    {
      title: "🔍 Gene Search Tips",
      items: [
        "Try famous genes: TP53 (tumor suppressor), ERBB2 (breast cancer), MYC (cell growth)",
        "Use official gene symbols (all caps) for best results",
        "Check the suggestions for valid examples if your search doesn't work"
      ]
    }
  ];

  const glossary = [
    { term: "Gene Expression", definition: "How actively a gene is being 'read' by the cell to make proteins" },
    { term: "Fold Change", definition: "How many times more (or less) active a gene is in disease vs healthy" },
    { term: "P-Value", definition: "Probability the difference happened by chance (lower = more reliable)" },
    { term: "Upregulated", definition: "Gene is more active in disease - potentially driving pathology" },
    { term: "Downregulated", definition: "Gene is less active in disease - may indicate lost function" },
    { term: "Volcano Plot", definition: "Chart showing all gene changes at once - big changes rise to the top" },
    { term: "Heatmap", definition: "Color-coded view of gene activity patterns across all samples" }
  ];

  return (
    <Sidebar className="border-r-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white w-80">
      <SidebarHeader className="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center gap-4">
          <span className="text-4xl">❓</span>
          <h2 className="font-bold text-2xl tracking-wide">Help & Guide</h2>
        </div>
        <SidebarTrigger className="text-white hover:bg-white/20 mt-3 p-2 rounded-lg" />
      </SidebarHeader>
      
      <SidebarContent className="p-8 space-y-8">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3 text-blue-800 tracking-wide">
              🎓 First Time Here?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base space-y-4">
            <p className="text-gray-700 leading-relaxed tracking-wide">
              This tool helps you explore how genes behave differently in healthy vs disease samples. 
              It's designed to make complex biological data accessible and understandable.
            </p>
            <Badge variant="secondary" className="text-base bg-blue-100 text-blue-800 border border-blue-300 px-4 py-2 tracking-wide">
              No biology background needed!
            </Badge>
          </CardContent>
        </Card>

        {helpSections.map((section, index) => (
          <SidebarGroup key={index} className="space-y-4">
            <SidebarGroupLabel className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-3 tracking-wide">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton className="text-base h-auto p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
                      <span className="text-left leading-relaxed text-gray-700 tracking-wide">{item}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-purple-800 tracking-wide">📚 Quick Glossary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {glossary.map((item, index) => (
              <div key={index} className="border-l-4 border-purple-300 pl-5 py-3 bg-purple-50 rounded-r-xl">
                <div className="font-bold text-base text-purple-800 tracking-wide">{item.term}</div>
                <div className="text-sm text-gray-700 mt-2 leading-relaxed tracking-wide">{item.definition}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-green-800 tracking-wide">🤔 Sample Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-base space-y-3">
              <p className="text-green-700 font-semibold p-4 bg-green-100 rounded-xl tracking-wide">
                "Which gene changes the most in this disease?"
              </p>
              <p className="text-blue-700 font-semibold p-4 bg-blue-100 rounded-xl tracking-wide">
                "What happens to TP53 in cancer samples?"
              </p>
              <p className="text-purple-700 font-semibold p-4 bg-purple-100 rounded-xl tracking-wide">
                "Are cell growth genes affected by this condition?"
              </p>
            </div>
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
};

export default HelpSidebar;
