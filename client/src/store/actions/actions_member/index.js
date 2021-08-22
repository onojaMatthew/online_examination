import { localAuth } from "../../../helper/authenticate";

export const MEMBER_LIST_START = "MEMBER_LIST_START";
export const MEMBER_LIST_SUCCESS = "MEMBER_LIST_SUCCESS";
export const MEMBER_LIST_FAILED = "MEMBER_LIST_FAILED";
export const POST_MEMBER_START = "POST_MEMBER_START";
export const POST_MEMBER_SUCCESS = "POST_MEMBER_SUCCESS";
export const POST_MEMBER_FAILED = "POST_MEMBER_FAILED";
export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";
export const UPDATE_MEMBER_START = "UPDATE_MEMBER_START";
export const UPDATE_MEMBER_SUCCESS = "UPDATE_MEMBER_SUCCESS";
export const UPDATE_MEMBER_FAILED = "UPDATE_MEMBER_FAILED";
export const DELETE_MEMBER_START = "DELETE_MEMBER_START";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAILED = "DELETE_MEMBER_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const memberListStart = () => {
  return {
    type: MEMBER_LIST_START
  }
}

export const memberListSuccess = (data) => {
  return {
    type: MEMBER_LIST_SUCCESS,
    data
  }
}

export const memberListFailed = (error) => {
  return {
    type: MEMBER_LIST_FAILED,
    error
  }
}

export const memberList = () => {
  return dispatch => {
    dispatch(memberListStart());
    fetch(`${BASE_URL}/member/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(memberListFailed(resp.message));
        return dispatch(memberListSuccess(resp.results));
      })
      .catch(err => dispatch(memberListFailed(err.message)));
  }
}

export const postMemberStart = () => {
  return {
    type: POST_MEMBER_START
  }
}

export const postMemberSuccess = (data) => {
  return {
    type: POST_MEMBER_SUCCESS,
    data
  }
}

export const postMemberFailed = (error) => {
  return {
    type: POST_MEMBER_FAILED,
    error
  }
}

export const postMember = (data) => {
  return dispatch => {
    dispatch(postMemberStart());
    fetch(`${BASE_URL}/member/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(postMemberFailed(resp.message));
        dispatch(postMemberSuccess(resp.results));
      })
      .catch(err => dispatch(postMemberFailed(err.message)));
  }
}


export const updateMemberStart = () => {
  return {
    type: UPDATE_MEMBER_START
  }
}

export const updateMemberSuccess = (data) => {
  return {
    type: UPDATE_MEMBER_SUCCESS,
    data
  }
}

export const updateMemberFailed = (error) => {
  return {
    type: UPDATE_MEMBER_FAILED,
    error
  }
}

export const updateMember = (data) => {
  return dispatch => {
    dispatch(updateMemberStart());
    fetch(`${BASE_URL}/member/update/${data.id}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateMemberFailed(resp.message));
        dispatch(updateMemberSuccess(resp.results));
      })
      .then(() => dispatch(memberList()))
      .catch(err => dispatch(updateMemberFailed(err.message)));
  }
}


export const searchStart = () => {
  return {
    type: SEARCH_START
  }
}

export const searchSuccess = (data) => {
  return {
    type: SEARCH_SUCCESS,
    data
  }
}

export const searchFailed = (error) => {
  return {
    type: SEARCH_FAILED,
    error
  }
}

export const searchMember = (data) => {
  return dispatch => {
    dispatch(searchStart());
    fetch(`${BASE_URL}/member/search?church=${id}&searchTerm=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(searchFailed(resp.message));
        return dispatch(searchSuccess(resp.results));
      })
      .catch(err => dispatch(searchFailed(err.message)));
  }
}

export const deleteStart = () => {
  return {
    type: DELETE_MEMBER_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_MEMBER_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_MEMBER_FAILED,
    error
  }
}

export const deleteMember = (data) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`${BASE_URL}/member/search?church${id}&searchTerm=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.message));
        return dispatch(deleteSuccess(resp.results));
      })
      .catch(err => dispatch(deleteFailed(err.message)));
  }
}