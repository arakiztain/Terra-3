const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message || "Validation error",
    });
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Unexpected error occurred in the server" });
};

export default errorHandler;
