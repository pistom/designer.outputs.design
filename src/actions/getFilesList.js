import fetch from 'isomorphic-fetch';

function getFilesList(projectId, imagesType, apiURL) {
  const dataSource = `${apiURL}/getFilesList.php?projectId=${projectId}`;
  const data = new FormData();
  data.append('imagesType', imagesType);
  return {
    type: 'GET_FILES_LIST',
    payload: {
      promise: fetch(dataSource, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
    }
  };
}

export default getFilesList;
