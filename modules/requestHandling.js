const baseURL = "https://parallelum.com.br/fipe/api/v1";

export const sendRequest = (method, endpoint) => {
  try {
    let request = new XMLHttpRequest();
    request.open(method, `${baseURL}${endpoint}`, false);
    request.send();

    return request.responseText;
  } catch (error) {
    console.log(error)
  }
};
