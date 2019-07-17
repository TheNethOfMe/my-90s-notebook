// stores or overwrites the user property of my90sNotebook local storage data
export const storeData = (prop, data) => {
  let existingNotebookData = JSON.parse(
    localStorage.getItem("my90sNotebookData")
  );
  if (!existingNotebookData) {
    existingNotebookData = {
      [prop]: data
    };
  } else {
    existingNotebookData = {
      ...existingNotebookData,
      [prop]: data
    };
  }
  localStorage.setItem(
    "my90sNotebookData",
    JSON.stringify(existingNotebookData)
  );
};

// retrieves data from local storage, or returns null if it doesn't exist
export const getData = prop => {
  let existingNotebookData = JSON.parse(
    localStorage.getItem("my90sNotebookData")
  );
  if (!existingNotebookData || !existingNotebookData.hasOwnProperty(prop)) {
    return null;
  } else {
    return existingNotebookData[prop];
  }
};

// updates the theme property in the user property in local storage
export const updateThemeInStore = theme => {
  let existingNotebookData = JSON.parse(
    localStorage.getItem("my90sNotebookData")
  );
  existingNotebookData.user.theme = theme;
  localStorage.setItem(
    "my90sNotebookData",
    JSON.stringify(existingNotebookData)
  );
};

// clears entire local storage my90sNotebookData object
export const clearData = () => {
  localStorage.removeItem("my90sNotebookData");
};
