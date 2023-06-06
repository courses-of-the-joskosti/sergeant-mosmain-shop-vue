export const getProducts = (limit: number) => `/products?offset=0&limit=${limit}`
export const getProductsCount = () => `/products`
export const getProductId = (id: number) => `/products/${id}`
// export const getProductCategoryId = (id: Number) => `/products?category_id=${id}`
export const getProductsName = (name: string, limit: number) =>
  `/products?title=${name}&offset=0&limit=${limit}`
export const getProductsNameCount = (name: string) => `/products?title=${name}`

export const getCategories = () => `/products/categories`
// export const getCategoryName = (name: String) => `products/category/${name}`
