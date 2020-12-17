const userSignOutAction = () => {

  return {
    type:"USER_SIGNED_OUT", 
    payload : { status: false}
  }
}

export default userSignOutAction;