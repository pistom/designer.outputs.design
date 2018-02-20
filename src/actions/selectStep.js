function selectStep(step, page=false) {
  return {
    type: 'SELECT_STEP',
    step,
    page
  }
}

export default selectStep;
