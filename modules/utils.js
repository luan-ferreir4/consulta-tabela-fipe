const getNextSelect = (targetSelectElement) => {
  const currentLabel = targetSelectElement.parentElement;
  let nextElement = currentLabel.nextSibling;
  let nextSelect;

  while (nextElement) {
    if (nextElement.nodeName === "LABEL") {
      nextSelect = nextElement.lastElementChild;
      break;
    }
    nextElement = nextElement.nextSibling;
  }
  return nextSelect;
};

// Reseta as opções no select após mudar um valor anterior
const resetSelect = (selectElement) => {
  const defaultOption = document.createElement("option");
  defaultOption.append("Selecione");
  defaultOption.setAttribute("selected", "");
  defaultOption.setAttribute("disabled", "");
  defaultOption.setAttribute("hidden", "");

  selectElement.innerHTML = "";

  selectElement.append(defaultOption);
};

const verifyNextSelect = (nextSelectElement) => {
  if (nextSelectElement.childElementCount > 1) {
    console.log(nextSelectElement.childElementCount);
    resetSelect(nextSelectElement);
  }
};

const resetResponse = (responseContainer, searchButton, image) => {
  searchButton.setAttribute("disabled", "");
  responseContainer.classList.add("hidden");
  image.classList.remove("hidden")

  for (let index = 0; index < responseContainer.childElementCount; index++) {
    const node = responseContainer.children[index];

    if (!node.classList.contains("fixed")) {
      node.innerHTML = "";
    }
  }
};

export { getNextSelect, resetSelect, resetResponse, verifyNextSelect };
