function setVariantFileName(page, device, variant, fileName) {
  return {
    type: 'SET_VARIANT_FILENAME',
    page, device, variant, fileName
  }
}

export default setVariantFileName;
