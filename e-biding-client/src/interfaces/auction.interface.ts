export interface IAuction {
  id: number;
  bidId: string;
  bidDescription: string;
  itemDescription: string;
  startingAmount: number;
  bidRequirements: string[];
  categories: string[];
  itemImg: string;
  startDate: any;
  endDate: any;
  highestBid: any;
}

export interface IAuctionsResponse {
  success: boolean;
  message: string;
  data: IAuction[];
  total: number;
  lastPage: number;
}

export interface IAuctionResponse {
  success: boolean;
  message: string;
  data: IAuction;
}

export interface IBid {
  bidAmount: number;
  createdAt: any;
  id: number;
  auction: {
    bidDescription: string;
    bidId: string;
    bidRequirements: string[];
    categories: string[];
    endDate: any;
    id: number;
    itemDescription: string;
    itemImg: string;
    startDate: any;
    startingAmount: number;
  };
  user: {
    CACDoc: string;
    RCNumber: string;
    alternatePhone: string;
    companyAddress: string;
    companyName: string;
    createdAt: string;
    email: string;
    firstName: string;
    id: number;
    isActive: boolean;
    isVerified: boolean;
    lastName: string;
    phone: string;
    postalCode: any;
  };
}

export interface IRecommendedResponse {
  bids: IAuction[];
  message: string;
  success: boolean;
}
