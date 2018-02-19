import fetch from 'isomorphic-fetch';

function saveProjectData(keys, projectData) {

  const data = {};
  keys.forEach((item) => {
    data[item] = projectData[item];
  });

  const dataDest = `http://api.outputs.local/saveData.php?projectId=${projectData.projectId}`;
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));

  return {
    type: 'SAVE_PROJECT_DATA',
    saveData: {
      promise: fetch(dataDest, {
        method: 'POST',
        body: formData
      }).then(response => response.json())
    }
  }
}

export default saveProjectData;
