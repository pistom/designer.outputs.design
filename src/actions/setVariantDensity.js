function setVariantDensity(page, device, variant, density) {
  return {
    type: 'SET_VARIANT_DENSITY',
    page, device, variant, density
  }
}

export default setVariantDensity;
