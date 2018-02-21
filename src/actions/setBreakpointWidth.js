function setBreakpointWidth(page, device, bWidth) {
  return {
    type: 'SET_BREAKPOINT_WIDTH',
    page,
    device,
    bWidth
  }
}

export default setBreakpointWidth
