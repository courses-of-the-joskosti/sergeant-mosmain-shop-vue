export const getProducts = () => "/products"
export const getProductId = (id: Number) => `/products?id=${id}`
export const getProductCategoryId = (id: Number) => `/products?category_id=${id}`
export const getProductsName = (name: String) => `/products?name_like=${name}`

export const getCategories = () => `/categories`
export const getCategoryId = (id: Number) => `/categories?id=${id}`