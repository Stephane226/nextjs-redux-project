
export interface SubProduct {
  _id: string;
  name: string;
  price: number;
  basePrice : number;

  type: string;   
  options: any[];   


}

export interface ProductType {
  _id: string;
  title: string;
  image: string;
  type: "Menstrual" | "Other" | null; 
  subProducts?: SubProduct[];
  packet?: boolean; 
  name: string;
  options: string[];
  basePrice: number;

}
