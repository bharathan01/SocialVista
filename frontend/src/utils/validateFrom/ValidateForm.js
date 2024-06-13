export function validateForm(fields) {
    const { username } = fields;
    const error = {};

  if (username === "") {
    error.username = "username is required !"
    return error;
  }
}
