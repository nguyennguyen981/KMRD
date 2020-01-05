const cartItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
        action.payload.number=1;
          return [...state, action.payload]
        case 'REMOVE_ITEM_FROM_CART':
          return state.filter(cartItem => cartItem.Id !== action.payload.Id)
        case 'CHANGE_ITEMNUMBER':
          return state.map(i=>{
            if(i.Id!==action.payload.Id)
            return i;
            return {...i,number:action.number};
          })
    }

    return state
}

export default cartItems
