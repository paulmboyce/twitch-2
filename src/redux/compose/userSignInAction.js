const userSignInAction = () => {

  return {
    type:"USER_SIGNED_IN", 
    payload : { status: true}
  }
}

export default userSignInAction;