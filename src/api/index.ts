import axios from '@/axios/axiosInstance'
import { getProducts, getProductsName, getCategories, getProductCategoryId } from '@/axios/routes'
import type { Product, Category } from '@/axios/types'

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(getProducts())
  return response.data
}

export async function fetchProductsByName(searchQuery: string): Promise<Product[]> {
  const response = await axios.get(getProductsName(searchQuery), { params: { search: searchQuery } })
  return response.data
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await axios.get(getCategories())
  return response.data
}

export async function fetchProductsByCategoryId(categoryId: number): Promise<Product[]> {
  const response = await axios.get(getProductCategoryId(categoryId))
  return response.data
}