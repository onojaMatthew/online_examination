export const isAuthenticated = () => {
  if ( typeof window === "undefined" ) {
    return false;
  }

  if ( sessionStorage.getItem( "token" ) ) {
    return JSON.parse( sessionStorage.getItem( "token" ) );
  } else {
    return false;
  }
}

export const localAuth = () => {
  if ( typeof window === "undefined" ) {
    return false;
  }

  if ( localStorage.getItem( "token" ) ) {
    return JSON.parse( localStorage.getItem( "token" ) );
  } else {
    return false;
  }
}