import shajs from 'sha.js';

function setProjectPassword(password) {

  return {
    type: 'SET_PROJECT_PASSWORD',
    projectPassword: shajs('sha256').update(password).digest('hex')
  }
}

export default setProjectPassword;
