type ProductStatus = "None" | "Available" | "OutOfStock"; // Example values

export interface IProduct {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  categoryName: string | null;
  subCategoryId: string;
  subCategoryName: string;
  status: ProductStatus;
}
export interface IPagedProducts {
  items: IProduct[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
