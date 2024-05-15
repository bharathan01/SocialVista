


const tryCatch = (Controller) => async (error, req, res, next) => {
  try {
    await Controller(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = tryCatch