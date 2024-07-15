import { API } from "../../../config/apiClient.js/apiClient";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

const { USER_PRO } = ApiEndPoint;

export const getSuggection = async () => {
    try {
      const responce = await API.get(USER_PRO.USER_SUGGECTION);
      return responce.data;
    } catch (errors) {
      if (errors.response) {
        const error = errors?.response?.data;
        return error;
      } else {
        console.log("error maessege :", errors.message);
      }
    }
  };