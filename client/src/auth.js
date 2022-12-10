import axios from "axios";

export const loginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START"});
    try {
        const res = await axios.post("/auth/login", user);
        const { token } = res.data;
        localStorage.setItem('token', token);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error});
    }
};

export const updateCall = async (user, dispatch) => {
    dispatch({ type: "UPDATE_START"});
    try {
        console.log(user);
        const res = await axios.get(`/users?username=${user.username}`, {headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }}
            );
        dispatch({type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error});
    }
}
