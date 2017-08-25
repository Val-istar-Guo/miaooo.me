import errorMessage from '../contants/error-message';
import * as ERROR from '../contants/error-code';


export default function CodeError(code, message = errorMessage[code]) {
  Error.captureStackTrace(this, this.constructor);

  this.code = code;
  this.message = message;
}

CodeError.prototype.name = 'CodeError';
