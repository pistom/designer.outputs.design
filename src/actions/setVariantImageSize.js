function setVariantImageSize(page, device, variant, dimension, value) {
  return {
    type: 'SET_VARIANT_IMAGE_SIZE',
    page, device, variant, dimension, value
  }
}

export default setVariantImageSize;
