import { sendRequest } from "./modules/requestHandling.js";
import { loadBrands, loadModels, loadYearsFuel } from "./modules/loadData.js";
import {
  getNextSelect,
  resetResponse,
  resetSelect,
  verifyNextSelect,
} from "./modules/utils.js";

const vehicleTypes = ["carros", "motos", "caminhoes"];

// Criando as variáveis a partir dos selects da página
const vehicleTypeInput = document.getElementById("vehicleType");
const brandInput = document.getElementById("brand");
const modelInput = document.getElementById("model");
const yearFuelInput = document.getElementById("yearFuel");

//Botão para pesquisa
const searchButton = document.getElementById("searchButton");

const imageContainer = document.getElementById("imageContainer");
// Container do resultado da pesquisa
const responseContainer = document.getElementById("response");

// Carrega o select de tipo de veículo com as options
const populateVehicleTypeSelect = (selectElement, dataList) => {
  dataList.forEach((data) => {
    let typeOption = document.createElement("option");

    typeOption.value = data;

    if (selectElement.name === "vehicleType")
      if (data === "caminhoes") {
        typeOption.text = "Caminhões";
      } else {
        typeOption.text = `${data.charAt(0).toUpperCase()}${data.slice(1)}`;
      }
    selectElement.add(typeOption);
  });
};

// Carrega as opções de marca após o tipo de veículo
// ser selecionado
const populateBrandOptions = (selectElement, vehicleType) => {
  const brandList = loadBrands(vehicleType);

  brandList.forEach((data) => {
    let typeOption = document.createElement("option");

    typeOption.value = data.codigo;
    typeOption.text = data.nome;

    selectElement.add(typeOption);
  });
};

// Carrega os modelos de veículos após a marca ser
// selecionada
const populateModelOptions = (selectElement, brandId) => {
  const selectedVehicleType = vehicleTypeInput.value;

  const modelList = loadModels(selectedVehicleType, brandId);

  modelList.forEach((data) => {
    let typeOption = document.createElement("option");

    typeOption.value = data.codigo;
    typeOption.text = data.nome;

    selectElement.add(typeOption);
  });
};

// Carrega os anos e tipos de combustível após o modelo
// ser selecionado
const populateYearFuelOptions = (selectElement, modelId) => {
  const selectedVehicleType = vehicleTypeInput.value;
  const selectedBrandId = brandInput.value;

  const yearFuelTypeList = loadYearsFuel(
    selectedVehicleType,
    selectedBrandId,
    modelId
  );

  yearFuelTypeList.forEach((data) => {
    let typeOption = document.createElement("option");

    typeOption.value = data.codigo;
    typeOption.text = data.nome;

    selectElement.add(typeOption);
  });
};

const getModelFipeData = () => {
  try {
    const selectedVehicleType = vehicleTypeInput.value;
    const selectedBrandId = brandInput.value;
    const selectedModelId = modelInput.value;
    const selectedYearFuelId = yearFuelInput.value;

    const endpoint = `/${selectedVehicleType}/marcas/${selectedBrandId}/modelos/${selectedModelId}/anos/${selectedYearFuelId}`;

    const response = sendRequest("GET", endpoint);
    const modelFipeData = JSON.parse(response);

    return modelFipeData;
  } catch (error) {
    console.log(error);
  }
};

// Renderiza o container com os dados do modelo do veículo
const renderResponse = () => {
  const fipeData = getModelFipeData();

  if (responseContainer.classList.contains("hidden")) {
    const brandName = document.getElementById("responseBrand");
    const modelName = document.getElementById("responseModel");
    const referenceMonth = document.getElementById("responseMonth");
    const averagePrice = document.getElementById("responsePrice");

    brandName.append(fipeData.Marca);
    modelName.append(fipeData.Modelo);
    referenceMonth.append(fipeData.MesReferencia);
    averagePrice.append(fipeData.Valor);

    responseContainer.classList.remove("hidden");
    imageContainer.classList.add("hidden");
  }
};

populateVehicleTypeSelect(vehicleTypeInput, vehicleTypes);

vehicleTypeInput.addEventListener("change", (event) => {
  const nextSelect = getNextSelect(event.target);
  verifyNextSelect(nextSelect);

  if (!responseContainer.classList.contains("hidden")) {
    resetResponse(responseContainer, searchButton, imageContainer);

    resetSelect(brandInput);
    resetSelect(modelInput);
    resetSelect(yearFuelInput);
  }

  populateBrandOptions(nextSelect, event.target.value);
});

brandInput.addEventListener("change", (event) => {
  const nextSelect = getNextSelect(event.target);
  verifyNextSelect(nextSelect);

  if (!responseContainer.classList.contains("hidden")) {
    resetResponse(responseContainer, searchButton, imageContainer);

    resetSelect(modelInput);
    resetSelect(yearFuelInput);
  }

  populateModelOptions(nextSelect, event.target.value);
});

modelInput.addEventListener("change", (event) => {
  const nextSelect = getNextSelect(event.target);
  verifyNextSelect(nextSelect);

  if (!responseContainer.classList.contains("hidden")) {
    resetResponse(responseContainer, searchButton, imageContainer);

    resetSelect(yearFuelInput);
  }

  populateYearFuelOptions(nextSelect, event.target.value);
});

yearFuelInput.addEventListener("change", () => {
  if (!responseContainer.classList.contains("hidden")) {
    resetResponse(responseContainer, searchButton, imageContainer);
  }
  searchButton.removeAttribute("disabled");
});

searchButton.addEventListener("click", renderResponse);

// Mobile Menu
const menuButton = document.getElementById("headerMobileMenu");

const menuBttns = document.querySelectorAll("#sidemenu__container > li > a");
const sidemenu = document.getElementById("sidemenu");

const handleMenu = () => {
  console.log(sidemenu);
  sidemenu.classList.toggle("active");
};

const getButtons = () => {
  for (let index = 0; index < menuBttns.length; index++) {
    const button = menuBttns[index];
    button.addEventListener("click", handleMenu);
  }
};

menuButton.addEventListener("click", handleMenu);
getButtons();
