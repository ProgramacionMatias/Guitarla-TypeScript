import { useReducer, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"
import { cartReducer, initialState } from "./reducers/cart-reducer"


function App() {


    const [state, dispatch] = useReducer(cartReducer, initialState)

    // solo se ejecuta cuando el valor de cart cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart)) // guarda datos en el navegador CONVIERTE EL VALOR A STRING
    }, [state.cart])

    return (
        <>
            <Header
                cart={state.cart}
                dispatch={dispatch}

            />


            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {state.data.map((data) => {
                        return (
                            <Guitar key={data.id} guitar={data} dispatch={dispatch} />

                        )
                    })}


                </div>
            </main>

            <Footer />

        </>
    )
}

export default App
