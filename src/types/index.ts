export type Guitar = {

    id: number
    name: string
    image: string
    description: string
    price: number
}

// Heredando del type Guitar 
export type CartItem = Guitar & {
    quantity: number
}

