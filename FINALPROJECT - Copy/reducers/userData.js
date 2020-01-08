const defaultState = {uid:'',name:'',phone:'',address:''}
const userData = (state = defaultState, action) => {
    switch (action.type) {
      case 'SET_UID':
        return {...state,uid:action.uid}
      case 'USER_LOGIN':
        return {...state,name:action.name,phone:action.phone,address:action.address};
      case 'USER_LOGOUT':
        return {uid:'',name:'',phone:'',address:''}
    }
    return state
}

export default userData
