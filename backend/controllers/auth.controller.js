const tryCatch = require("../utils/tryCatch");

const userLogin = tryCatch((req, res) => {
    res.status(200).json({ message: "everythig looks good!" });
});
module.exports = { userLogin };
