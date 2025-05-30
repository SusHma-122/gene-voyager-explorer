
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
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">❓</span>
          <h2 className="font-bold text-lg">Help & Guide</h2>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent className="p-4 space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              🎓 First Time Here?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <p className="text-gray-600">
              This tool helps you explore how genes behave differently in healthy vs disease samples.
            </p>
            <Badge variant="secondary" className="text-xs">
              No biology background needed!
            </Badge>
          </CardContent>
        </Card>

        {helpSections.map((section, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-sm font-semibold">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton className="text-xs h-auto p-2">
                      <span className="text-left">{item}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">📚 Quick Glossary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {glossary.map((item, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-3">
                <div className="font-semibold text-xs text-blue-700">{item.term}</div>
                <div className="text-xs text-gray-600 mt-1">{item.definition}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-sm">🤔 Sample Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs space-y-1">
              <p className="text-green-700 font-medium">"Which gene changes the most?"</p>
              <p className="text-blue-700 font-medium">"What happens to TP53 in cancer?"</p>
              <p className="text-purple-700 font-medium">"Are cell growth genes affected?"</p>
            </div>
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
};

export default HelpSidebar;
