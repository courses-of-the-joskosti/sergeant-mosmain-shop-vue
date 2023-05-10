export interface RootState {
  // определите типы состояния здесь
}

export interface Users {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Categories {
  id: number
  name: string
  image_url: string
}

export interface Product {
  id: number
  category_id: number
  name: string
  description: string
  brand: string
  manufacturer: string
  image_url: string
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
