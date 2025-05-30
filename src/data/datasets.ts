
export interface Dataset {
  id: string;
  title: string;
  description: string;
  diseaseType: string;
  tumorSamples: number;
  normalSamples: number;
  totalGenes: number;
  platform: string;
  organism: string;
  summary: string;
  keyFindings: string[];
  notes: string;
  category: 'cancer' | 'inflammatory' | 'neurological' | 'metabolic' | 'respiratory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const availableDatasets: Dataset[] = [
  {
    id: 'GSE42872',
    title: 'Breast Cancer vs Normal Tissue',
    description: 'Gene expression analysis comparing breast tumor samples to normal breast tissue',
    diseaseType: 'Breast Cancer',
    tumorSamples: 12,
    normalSamples: 12,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'This study compares gene expression patterns between breast cancer tumor tissue and normal breast tissue to identify genes that are differently expressed in cancer.',
    keyFindings: [
      'ERBB2 (HER2) is significantly upregulated in tumor samples',
      'TP53 shows altered expression patterns in cancer',
      'Cell cycle genes are generally more active in tumors'
    ],
    notes: 'Great for first demo',
    category: 'cancer',
    difficulty: 'beginner'
  },
  {
    id: 'GSE2034',
    title: 'Breast Cancer Relapse Study',
    description: 'Large cohort study examining gene expression patterns in breast cancer with survival data',
    diseaseType: 'Breast Cancer (Relapse)',
    tumorSamples: 286,
    normalSamples: 0,
    totalGenes: 22283,
    platform: 'Affymetrix Human Genome U133A Array',
    organism: 'Homo sapiens',
    summary: 'This comprehensive study analyzes gene expression in breast cancer tumors to predict disease relapse and survival outcomes.',
    keyFindings: [
      'Proliferation genes strongly associated with poor prognosis',
      'Estrogen receptor pathway genes predict treatment response',
      'Immune response genes correlate with better outcomes'
    ],
    notes: 'Used in survival/classifier models',
    category: 'cancer',
    difficulty: 'advanced'
  },
  {
    id: 'GSE7305',
    title: 'Endometriosis vs Control',
    description: 'Small, clean comparison of endometriosis samples versus healthy controls',
    diseaseType: 'Endometriosis',
    tumorSamples: 5,
    normalSamples: 5,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'This study compares gene expression in endometrial tissue from women with endometriosis versus healthy controls.',
    keyFindings: [
      'Inflammatory response genes are upregulated',
      'Steroid hormone metabolism is altered',
      'Angiogenesis pathways show increased activity'
    ],
    notes: 'Small, clean groups',
    category: 'inflammatory',
    difficulty: 'beginner'
  },
  {
    id: 'GSE33126',
    title: 'Asthma vs Control',
    description: 'Airway epithelial cells from asthma patients versus healthy controls',
    diseaseType: 'Asthma',
    tumorSamples: 20,
    normalSamples: 20,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Gene expression analysis of airway epithelial cells comparing asthma patients to healthy individuals.',
    keyFindings: [
      'IL-13 pathway genes are significantly upregulated',
      'Mucin production genes show increased expression',
      'Antioxidant response pathways are downregulated'
    ],
    notes: 'Inflammatory disease',
    category: 'respiratory',
    difficulty: 'intermediate'
  },
  {
    id: 'GSE19804',
    title: 'Lung Cancer Study',
    description: 'Large-scale comparison of lung cancer tumors versus normal lung tissue',
    diseaseType: 'Lung Cancer',
    tumorSamples: 60,
    normalSamples: 60,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Comprehensive gene expression analysis comparing lung adenocarcinoma samples to normal lung tissue.',
    keyFindings: [
      'EGFR pathway shows significant alterations',
      'Cell adhesion genes are commonly downregulated',
      'DNA repair mechanisms are frequently disrupted'
    ],
    notes: 'Large and reliable',
    category: 'cancer',
    difficulty: 'intermediate'
  },
  {
    id: 'GSE6344',
    title: 'Chronic Kidney Disease',
    description: 'Kidney tissue samples from patients with various stages of chronic kidney disease',
    diseaseType: 'Chronic Kidney Disease',
    tumorSamples: 37,
    normalSamples: 15,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Analysis of gene expression changes in kidney tissue across different stages of chronic kidney disease.',
    keyFindings: [
      'Fibrosis-related genes progressively increase with disease stage',
      'Inflammatory markers are elevated in advanced stages',
      'Metabolic pathway genes show stage-specific changes'
    ],
    notes: 'Includes various disease stages',
    category: 'metabolic',
    difficulty: 'advanced'
  },
  {
    id: 'GSE10072',
    title: 'Lung Cancer in Smokers',
    description: 'Gene expression in lung cancer samples from smoking patients',
    diseaseType: 'Lung Cancer (Smoking-related)',
    tumorSamples: 58,
    normalSamples: 49,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Study examining gene expression patterns in lung cancer specifically related to smoking exposure.',
    keyFindings: [
      'Detoxification enzyme genes are commonly altered',
      'DNA damage response pathways are activated',
      'Smoking-specific mutational signatures affect gene expression'
    ],
    notes: 'Useful for lifestyle-based comparison',
    category: 'cancer',
    difficulty: 'intermediate'
  },
  {
    id: 'GSE29172',
    title: 'Alzheimer\'s Disease vs Control',
    description: 'Brain tissue gene expression comparison between Alzheimer\'s patients and controls',
    diseaseType: 'Alzheimer\'s Disease',
    tumorSamples: 8,
    normalSamples: 8,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Gene expression analysis of brain tissue comparing Alzheimer\'s disease patients to healthy controls.',
    keyFindings: [
      'Amyloid processing genes show altered expression',
      'Neuroinflammation pathways are activated',
      'Synaptic function genes are downregulated'
    ],
    notes: 'Good for neuro cases',
    category: 'neurological',
    difficulty: 'intermediate'
  },
  {
    id: 'GSE14827',
    title: 'Type 2 Diabetes vs Control',
    description: 'Blood-based gene expression analysis comparing diabetic patients to healthy controls',
    diseaseType: 'Type 2 Diabetes',
    tumorSamples: 8,
    normalSamples: 8,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Analysis of gene expression in blood samples from Type 2 diabetes patients versus healthy individuals.',
    keyFindings: [
      'Glucose metabolism genes show significant changes',
      'Inflammatory markers are elevated in diabetic samples',
      'Insulin signaling pathway components are altered'
    ],
    notes: 'Blood-based samples',
    category: 'metabolic',
    difficulty: 'beginner'
  },
  {
    id: 'GSE12417',
    title: 'Acute Myeloid Leukemia',
    description: 'Large cohort study of acute myeloid leukemia gene expression patterns',
    diseaseType: 'Acute Myeloid Leukemia',
    tumorSamples: 163,
    normalSamples: 0,
    totalGenes: 54675,
    platform: 'Affymetrix Human Genome U133 Plus 2.0 Array',
    organism: 'Homo sapiens',
    summary: 'Comprehensive gene expression profiling of acute myeloid leukemia samples for subtype classification.',
    keyFindings: [
      'Distinct gene expression signatures define AML subtypes',
      'Hematopoietic transcription factors show subtype-specific patterns',
      'Drug resistance genes vary significantly between subtypes'
    ],
    notes: 'Often used in ML models',
    category: 'cancer',
    difficulty: 'advanced'
  }
];

export const getCategoryColor = (category: Dataset['category']) => {
  const colors = {
    cancer: 'from-red-500 to-pink-500',
    inflammatory: 'from-orange-500 to-red-500',
    neurological: 'from-purple-500 to-indigo-500',
    metabolic: 'from-green-500 to-blue-500',
    respiratory: 'from-blue-500 to-cyan-500'
  };
  return colors[category];
};

export const getDifficultyColor = (difficulty: Dataset['difficulty']) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300'
  };
  return colors[difficulty];
};
