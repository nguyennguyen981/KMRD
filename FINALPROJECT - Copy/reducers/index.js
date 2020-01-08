import { combineReducers } from 'redux'
import cartItems from './cartItems'
import userData from './userData'

export default combineReducers({
    cartItems:cartItems,
    userData:userData
})
