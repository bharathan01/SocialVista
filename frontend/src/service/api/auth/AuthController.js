import {ApiEndPoint} from "../../../utils/apiEndPoints/ApiEndPoint";

export async function registerUser(fields) {
    //use the validation logic here
  try {
    const isUserRegisterd = await fetch(ApiEndPoint.AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    return await isUserRegisterd.json();
  } catch (error) {
    console.log(error);
  }
}
