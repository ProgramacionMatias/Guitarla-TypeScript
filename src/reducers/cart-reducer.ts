import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

//1) crear El ACtions
export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decrease-quantity', payload: { id: Guitar['id'] } } |
    { type: 'increase-quantity', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' }

//2Crear el State
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

 //Esta función se utiliza cuando el componente o la aplicación se carga por primera vez
 const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] //JSON.PARSE CONVIERTE UN JSON A VALOR DE JS
}


//3) Iniciar el State
export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

//Variable para min y max
const MAX_ITEMS = 5
const MIN_ITEMS = 1

//4) Crear el reducer
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === "add-to-cart") {

        // Encontrar y verificar si los indices son iguales. si no existe muestra -1 si existe muestra 0
        const itemExists = state.cart.find((guitar) => { return guitar.id === action.payload.item.id })

        let updatedCart: CartItem[] = []
        // si el itemExists es mayor a 0 entonces si hay algo en el carrito
        if (itemExists) {
            updatedCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return {
                            ...item, quantity: item.quantity + 1
                        }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }

            // Agrega al carrito sin remplazar el agregado
            updatedCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "remove-from-cart") {
        // version nueva

        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }
    if (action.type === "decrease-quantity") {

        const productoDecremento = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item


        })


        return {
            ...state,
            cart: productoDecremento
        }
    }
    if (action.type === "increase-quantity") {


        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item
        })


        return {

            ...state,
            cart: updatedCart
        }
    }
    if (action.type === "clear-cart") {

      


        return {
            ...state,
            cart: []
        }
    }
    return state
}



