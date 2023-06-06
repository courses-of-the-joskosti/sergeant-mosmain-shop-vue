import axios from '@/axios/axiosInstance'
import { getProducts, getProductsName, getProductsCount, getProductsNameCount } from '@/axios/routes'
import type { Product, Category } from '@/axios/types'

export async function fetchProducts(limit: number): Promise<Product[]> {
  const response = await axios.get(getProducts(limit))
  return response.data
}

export async function fetchProductsCount(): Promise<number> {
  const response = await axios.get(getProductsCount())
  return response.data.length
}

export async function fetchProductsByName(searchQuery: string, limit: number): Promise<Product[]> {
  const response = await axios.get(getProductsName(searchQuery, limit))
  return response.data
}

export async function fetchProductsByNameCount(searchQuery: string): Promise<number> {
  const response = await axios.get(getProductsNameCount(searchQuery))
  return response.data.length
}
// export async function fetchCategories(): Promise<Category[]> {
//   const response = await axios.get(getCategories())
//   return response.data
// }

// export async function fetchProductsByCategoryId(categoryId: number): Promise<Product[]> {
//   const response = await axios.get(getProductCategoryId(categoryId))
//   return response.data
// }
