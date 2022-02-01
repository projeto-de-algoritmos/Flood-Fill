export const waitRenderSquare = (secs) => {
  return new Promise(resolve => {
    setTimeout(resolve, secs * 1000)
  })
}