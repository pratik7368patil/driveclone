const apiData = {
  id: 100,
  name: "Home",
  folderList: [
    {
      id: 7532,
      name: "First Folder",
      folderList: [
        {
          id: 7532974,
          name: "First in First Folder",
          folderList: [],
          fileList: [
            {
              id: 75321010,
              name: "firstFile F F",
              path: "",
            },
          ],
        },
      ],
      fileList: [
        {
          id: 753210,
          name: "firstFile F",
          path: "",
        },
        {
          id: 753220,
          name: "secondFile F",
          path: "",
        },
      ],
    },
    {
      id: 9887,
      name: "Second Folder",
      folderList: [],
      fileList: [
        {
          id: 988710,
          name: "firstFile S",
          path: "",
        },
        {
          id: 988720,
          name: "secondFile S",
          path: "",
        },
      ],
    },
    {
      id: 8664,
      name: "Third Folder",
      folderList: [],
      fileList: [
        {
          id: 866410,
          name: "firstFile T",
          path: "",
        },
      ],
    },
  ],

  fileList: [
    {
      id: 8769,
      name: "firstFile",
      path: "",
    },
    {
      id: 8369,
      name: "secondFile",
      path: "",
    },
    {
      id: 8799,
      name: "thirdFile",
      path: "",
    },
  ],
};

// url : /7532
// url : /7532/7532974
// url : /7532
const filterGetData = function (alteredData, match, x) {
  for (let i = 0; i < alteredData.folderList.length; i++) {
    if (alteredData.folderList[i].id === +match) {
      return alteredData.folderList[i];
    }
  }
  return null;
};

const getData = function (url) {
  let returnedData = { ...apiData };
  if (url === "/") {
    return returnedData;
  }
  let getNestedIds = url.split("/").filter((item) => item);
  for (let i = 0; i < getNestedIds.length; i++) {
    returnedData = filterGetData(returnedData, getNestedIds[i]);
    if (returnedData === null) {
      return null;
    }
  }

  return returnedData;
};

const addNewFolder = function (data, url) {
  let returnedData = { ...apiData };
  if (url === "/") {
    returnedData.folderList.push({ ...data });
  }
  let getNestedIds = url.split("/").filter((item) => item);
  for (let i = 0; i < getNestedIds.length; i++) {
    returnedData = filterGetData(returnedData, getNestedIds[i]);
  }
  returnedData.folderList = [...returnedData.folderList, { ...data }];
};

export { apiData, getData, addNewFolder };
