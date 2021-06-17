const newParagraph = (content: string) => {
  const el = document.createElement('p')
  el.innerHTML = content
  return el
}

const textToHtml = (text: string) => {
  const split = text.split('\n').map((l) => (l === '' ? '\n' : l))
  const html = split.map((l) =>
    l === '\n' ? newParagraph('<br>') : newParagraph(l)
  )
  return html
}

export { textToHtml }
