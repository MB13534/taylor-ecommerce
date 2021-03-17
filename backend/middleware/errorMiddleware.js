//if the route was not found, respond with a 404 not found
const notFound = (req, res, next) => {
  //we have access to the original route/url
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//overwriting the default error handler
const errorHandler = (err, req, res, next) => {
  //you always want to look at the status code, sometimes it can be 200 but still have an error
  //make all 200 codes to 500 which means server error, otherwise set error to status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  //we always want to send json back, instead of default html
  res.json({
    message: err.message,
    //have stack traced if we are in development, not production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
