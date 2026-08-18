export type ProductCategory = 
  | 'essential-oils' 
  | 'botanicals' 
  | 'hydrosols-clays' 
  | 'packaging';

export interface CoaCompound {
  compound: string;
  percentage: string;
  status: 'Passed' | 'Optimal';
}

export interface CoaDetails {
  batchNumber: string;
  testDate: string;
  purityPercentage?: string;
  harvestRegion: string;
  gcmsProfile?: CoaCompound[];
  heavyMetals: string;
  microbialLimit: string;
  qualityDirectorNote: string;
}

export interface BotanicalProduct {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  category: ProductCategory;
  subFamily: string;
  badgeNumber: string; // e.g. "AIB-001"
  description: string;
  availableForms: string[];
  extractionMethod?: string;
  harvestOrigin: string;
  image: string;
  coaDetails?: CoaDetails;
  specifications: {
    appearance: string;
    aromaProfile?: string;
    activeMarkers?: string;
    shelfLife: string;
    packagingOptions: string[];
    typicalSolvent?: string;
  };
}

export interface WorkflowStep {
  id: number;
  step: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
}

export interface ProvenanceRegion {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  keyCrops: string[];
  exportCorridor: string;
  latitude: number;
  longitude: number;
  image: string;
}

export interface B2BQuoteRequest {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phoneWhatsapp?: string;
  selectedProduct: string;
  preferredForm: string;
  estimatedQuantity: string;
  applicationUse: string;
  destinationPort: string;
  packagingPreference: string;
  documentationNeeds: string[];
  additionalNotes?: string;
  consent: boolean;
}

export interface SpecConsultationResult {
  title: string;
  summary: string;
  recommendedIngredients: Array<{
    commonName: string;
    botanicalName: string;
    recommendedForm: string;
    specificationStandard: string;
    function: string;
  }>;
  testingStandard: string;
  suggestedPackaging: string;
  documentationAvailable: string[];
  leadTimeEstimate: string;
}
