function savePageName(oldName, newName, projectData) {
  if (oldName) {
    return {
      type: 'EDIT_PAGE_NAME',
      oldName, newName
    }
  } else {

    const page = {devices: {}};
    Object.keys(projectData.devices).forEach(device => {
      page.devices[device] = {
        designs: {
          A: {
            fileName: undefined,
            iWidth: undefined,
            iHeight: undefined,
            density: 1
          },
          B: {
            fileName: undefined,
            iWidth: undefined,
            iHeight: undefined,
            density: 1
          }
        }
      }
    });

    return {
      type: 'ADD_NEW_PAGE',
      name: newName,
      emptyPage: page
    }
  }

}

export default savePageName;
