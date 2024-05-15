


const tryCatch = (Controller) => async (req, res, next) => {
  try {
    await Controller(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = tryCatch