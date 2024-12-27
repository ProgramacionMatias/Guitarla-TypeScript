import { Dispatch } from 'react'
import type { Guitar } from '../types'
import { CartActions } from '../reducers/cart-reducer'
import ShowGuitar from './ShowGuitar'

// no es necesario llevarlo a type porque solamente lo estamos ocupando aqui
type GuitarProps = {
    guitar: Guitar,
    dispatch: Dispatch<CartActions>

}


export default function Guitar({ guitar, dispatch }: GuitarProps) {




    return (
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <ShowGuitar guitar={guitar} dispatch={dispatch} />
            </div>
        </>
    )
}
