import fetch from 'isomorphic-fetch';

function getProjectMessages(projectId, password, apiURL) {
  const dataSource = `${apiURL}/getMessages.php?projectId=${projectId}`;
  const data = new FormData();
  data.append('password', password);
  return {
    type: 'GET_MESSAGES',
    payload: {
      promise: fetch(dataSource, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
    }
  };
}

export default getProjectMessages;
