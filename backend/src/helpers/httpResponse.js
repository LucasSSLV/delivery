export const ok = (body) => {
  return {
    success: true,
    statusCode: 200,
    body: body,
  };
};

export const userNotExist = () => {
  return {
    success: false,
    statusCode: 400,
    body: "user already deleted or does not exist",
  };
};

export const dadosIncompletos = () => {
  return {
    success: false,
    statusCode: 400,
    body: "Dados incompletos, confira os campos e tente novamente",
  };
};

export const notFound = () => {
  return {
    success: false,
    statusCode: 400,
    body: "Not found",
  };
};

export const serverError = (error) => {
  return {
    success: false,
    statusCode: 400,
    body: error,
  };
};

export const plateNotExist = () => {
  return {
    success: false,
    statusCode: 400,
    body: "plate already deleted or does not exist",
  };
};
export const plateAlreadyExist = () => {
  return {
    success: false,
    statusCode: 400,
    body: "plate already exist",
  };
};
export const plateCreated = () => {
  return {
    success: true,
    statusCode: 201,
    body: "plate created",
  };
};

export default {
  ok,
  notFound,
  serverError,
  userNotExist,
  dadosIncompletos,
  plateNotExist,
  plateAlreadyExist,
  plateCreated,
};
