import { failure, start, success } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const authApiCall = async (dispatch, user, type) => {
  dispatch(start());
  try {
    const res = await publicRequest.post(`/auth/${type}`, user);
    dispatch(success(res.data));
  } catch (err) {
    dispatch(failure());
  }
};
