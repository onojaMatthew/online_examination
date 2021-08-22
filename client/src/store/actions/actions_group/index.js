import { localAuth } from "../../../helper/authenticate";

export const CREATE_GROUP_START = "CREATE_GROUP_START";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_FAILED = "CREATE_GROUP_FAILED";
export const GROUP_LIST_START = "GROUP_LIST_START";
export const GROUP_LIST_SUCCESS = "GROUP_LIST_SUCCESS";
export const GROUP_LIST_FAILED = "GROUP_LIST_FAILED";
export const GROUP_DETAIL_START = "GROUP_DETAIL_START";
export const GROUP_DETAIL_SUCCESS = "GROUP_DETAIL_SUCCESS";
export const GROUP_DETAIL_FAILED = "GROUP_DETAIL_FAILED";
export const GROUP_UPDATE_START = "GROUP_UPDATE_START";
export const GROUP_UPDATE_SUCCESS = "GROUP_UPDATE_SUCCESS";
export const GROUP_UPDATE_FAILED = "GROUP_UPDATE_FAILED";
export const GROUP_DELETE_START = "GROUP_DELETE_START";
export const GROUP_DELETE_SUCCESS = "GROUP_DELETE_SUCCESS";
export const GROUP_DELETE_FAILED = "GROUP_DELETE_FAILED";

const token = localAuth() && localAuth().token;
const id = localAuth() && localAuth().church && localAuth().church._id;

const BASE_URL = process.env.REACT_APP_URL;

export const createGroupStart = () => {
  return {
    type: CREATE_GROUP_START
  }
}

export const createGroupSuccess = (data) => {
  return {
    type: CREATE_GROUP_SUCCESS,
    data
  }
}

export const createGroupFailed = (error) => {
  return {
    type: CREATE_GROUP_FAILED,
    error
  }
}

export const createGroup = (data) => {
  return dispatch => {
    dispatch(createGroupStart());
    fetch(`${BASE_URL}/group/new`, {
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
        if (resp.error) return dispatch(createGroupFailed(resp.message));
        return dispatch(createGroupSuccess(resp.results));
      })
      .catch(err => dispatch(createGroupFailed(err.message)));
  }
}

export const groupListStart = () => {
  return {
    type: GROUP_LIST_START
  }
}

export const groupListSuccess = (data) => {
  return {
    type: GROUP_LIST_SUCCESS,
    data
  }
}

export const groupListFailed = (error) => {
  return {
    type: GROUP_LIST_FAILED,
    error
  }
}

export const groupList = () => {
  return dispatch => {
    dispatch(groupListStart());
    fetch(`${BASE_URL}/group/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(groupListFailed(resp.message));
        return dispatch(groupListSuccess(resp.results));
      })
      .catch(err => dispatch(groupListFailed(err.message)));
  }
}

export const groupDetailStart = () => {
  return {
    type: GROUP_DETAIL_START
  }
}

export const groupDetailSuccess = (data) => {
  return {
    type: GROUP_DETAIL_SUCCESS,
    data
  }
}

export const groupDetailFailed = (error) => {
  return {
    type: GROUP_DETAIL_FAILED,
    error
  }
}

export const groupDetail = (data) => {
  return dispatch => {
    dispatch(groupDetailStart());
    fetch(`${BASE_URL}/group/detail?church=${id}&groupId=${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      },
      
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(groupDetailFailed(resp.message));
        return dispatch(groupDetailSuccess(resp.results));
      })
      .catch(err => dispatch(groupDetailFailed(err.message)));
  }
}

export const groupUpdateStart = () => {
  return {
    type: GROUP_UPDATE_START
  }
}

export const groupUpdateSuccess = (data) => {
  return {
    type: GROUP_UPDATE_SUCCESS,
    data
  }
}

export const groupUpdateFailed = (error) => {
  return {
    type: GROUP_UPDATE_FAILED,
    error
  }
}

export const groupUpdate = (data) => {
  return dispatch => {
    dispatch(groupUpdateStart());
    fetch(`${BASE_URL}/group/update?church=${id}`, {
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
        if (resp.error) return dispatch(groupUpdateFailed(resp.message));
        return dispatch(groupUpdateSuccess(resp.results));
      })
      .then(() => dispatch(groupList()))
      .catch(err => dispatch(groupUpdateFailed(err.message)));
  }
}

export const groupDeleteStart = () => {
  return {
    type: GROUP_DELETE_START
  }
}

export const groupDeleteSuccess = (data) => {
  return {
    type: GROUP_DELETE_SUCCESS,
    data
  }
}

export const groupDeleteFailed = (error) => {
  return {
    type: GROUP_DELETE_FAILED,
    error
  }
}

export const groupDelete = (data) => {
  return dispatch => {
    dispatch(groupDeleteStart());
    fetch(`${BASE_URL}/group/delete?church=${id}&groupId=${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(groupDeleteFailed(resp.message));
        return dispatch(groupDeleteSuccess(resp.results));
      })
      .catch(err => dispatch(groupDeleteFailed(err.message)));
  }
}