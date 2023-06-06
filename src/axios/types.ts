export interface RootState {
  // определите типы состояния здесь
}

export interface Users {
  id: number
  name: string
  role: string
  email: string
  password: string
  avatar: string
}

export interface Category {
  id: number
  name: string
  base_name: string
  image_url: string
}

export interface Product {
  id: number
  category_id: number
  title: string
  description: string
  brand: string
  manufacturer: string
  images: string
  price: number
  quantity: number
  total_price: number
}

export interface Carts {
  id: number
  user_id: number
  products: {
    product_id: number
    price: number
    quantity: number
  }
  total_price: number
}
