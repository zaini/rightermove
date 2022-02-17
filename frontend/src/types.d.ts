export interface Property {
  price: Number;
  type: String;
  address: String;
  url: String;
  bedrooms: Number;
  travel_time: Number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ListingUpdate {
  listingUpdateReason: string;
  listingUpdateDate: Date;
}

export interface DisplayPrices {
  displayPrice: string;
  displayPriceQualifier: string;
}

export interface Customer {
  branchId: number;
  brandPlusLogoURI: string;
  contactTelephone: string;
  branchDisplayName: string;
  branchName: string;
  brandTradingName: string;
  branchLandingPageUrl: string;
  development: boolean;
  showReducedProperties: boolean;
  commercial: boolean;
  showOnMap: boolean;
  enhancedListing: boolean;
  developmentContent?: any;
  buildToRent: boolean;
  buildToRentBenefits: any[];
  brandPlusLogoUrl: string;
}

export interface ProductLabel {
  productLabelText: string;
  spotlightLabel: boolean;
}

export interface Image {
  srcUrl: string;
  url: string;
  caption?: any;
}

export interface PropertyImages {
  images: Image[];
  mainImageSrc: string;
  mainMapImageSrc: string;
}

export interface CustomProperty {
  isCustom: boolean;
  id: number;
  bedrooms: number;
  bathrooms: number;
  numberOfImages: number;
  numberOfFloorplans: number;
  numberOfVirtualTours: number;
  summary: string;
  displayAddress: string;
  countryCode: string;
  location: Location;
  propertySubType: string;
  listingUpdate: ListingUpdate;
  premiumListing: boolean;
  featuredProperty: boolean;
  price: number;
  customer: Customer;
  distance?: any;
  transactionType: string;
  productLabel: ProductLabel;
  commercial: boolean;
  development: boolean;
  residential: boolean;
  students: boolean;
  auction: boolean;
  feesApply: boolean;
  feesApplyText?: any;
  displaySize: string;
  showOnMap: boolean;
  propertyUrl: string;
  contactUrl: string;
  staticMapUrl?: any;
  channel: string;
  firstVisibleDate: Date;
  onlineViewingsAvailable: boolean;
  enhancedListing: boolean;
  isRecent: boolean;
  formattedDistance: string;
  formattedBranchName: string;
  hasBrandPlus: boolean;
  propertyImages: PropertyImages;
  propertyTypeFullDescription: string;
  displayStatus: string;
  addedOrReduced: string;
  heading: string;
  travel_time: number;
}
