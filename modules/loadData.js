import { sendRequest } from "./requestHandling.js";

const loadBrands = (vehicleType) => {
  try {
    const brandResponse = sendRequest("GET", `/${vehicleType}/marcas`);

    const brandList = JSON.parse(brandResponse);

    return brandList;
  } catch (error) {
    console.log(error);
  }
};

const loadModels = (vehicleType, brandId) => {
  try {
    const modelResponse = sendRequest(
      "GET",
      `/${vehicleType}/marcas/${brandId}/modelos`
    );

    const modelList = JSON.parse(modelResponse).modelos;

    return modelList;
  } catch (error) {
    console.log(error);
  }
};

const loadYearsFuel = (vehicleType, brandId, modelId) => {
  try {
    const yearsFuelResponse = sendRequest(
      "GET",
      `/${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos`
    );

    const yearsFuelTypeList = JSON.parse(yearsFuelResponse);

    return yearsFuelTypeList;
  } catch (error) {
    console.log(error);
  }
};

export { loadBrands, loadModels, loadYearsFuel};
