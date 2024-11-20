import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store'
import { CartContextWrapper } from './CartContext.tsx'

createRoot(document.getElementById('root')!).render(
    <CartContextWrapper>
        <Provider store={store}>
            <App />
        </Provider>
    </CartContextWrapper>
)
