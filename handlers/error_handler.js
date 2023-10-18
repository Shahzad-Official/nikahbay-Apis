class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export  class NotFoundError extends CustomError {
  constructor(message = "Resource not found.") {
    super(message, 404);
  }
}

export  class AuthenticationError extends CustomError {
  constructor(message = "Authentication failed") {
    super(message, 401);
  }
}
export  class BadRequest extends CustomError {
  constructor(message = "Invalid input. Please check your request and try again.") {
    super(message, 400);
  }
}


export default function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    
  } else {
    console.error(err.stack); 
    res.status(500).json({ success:false,message:err.message,error: err });
  }
}
