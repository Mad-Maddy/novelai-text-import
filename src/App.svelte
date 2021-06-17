<style>
</style>

<script lang="ts">
  import ImportButton from './components/ImportButton.svelte'
  import TextBox from './components/TextBox.svelte'
  import { textToHtml } from './utils/text-to-html'
  import { waitForKeyElements } from './utils/wait-for-key-element'

  let textBox: TextBox
  let importBtn: ImportButton

  const injectText = (text: string) => {
    const proseMirror = document.querySelector('.ProseMirror')
    const elements = textToHtml(text)
    for (let el of elements) {
      proseMirror.appendChild(el)
    }
  }

  const addImportBtn = (anchorEl) => {
    const containerClasses: string[] = Array.from(
      anchorEl.closest('div').classList.values()
    )
    const btnClasses: string[] = Array.from(
      anchorEl.closest('div').querySelector('button').classList.values()
    )
    const target = anchorEl.closest('div').parentElement

    importBtn = new ImportButton({
      target,
      props: {
        containerClassList: containerClasses,
        btnClassList: btnClasses,
      },
    })

    importBtn.$on('click', (event) => {
      textBox.show()
    })
  }

  const addTextBox = (target) => {
    const background = getComputedStyle(target).background
    textBox = new TextBox({
      target,
      props: {
        background,
      },
    })

    textBox.$on('import', (event) => {
      injectText(event.detail)
      textBox.hide()
    })
  }

  waitForKeyElements('input[type="file"]', (element) => {
    addImportBtn(element)

    const appMain = document.querySelector('#root').firstChild
    addTextBox(appMain)
    return false
  })

  waitForKeyElements('input[type="range"]', (e) => {
    const element = document.querySelector('input[type="file"]')

    if (importBtn) {
      importBtn.$destroy()
    }

    addImportBtn(element)
    return false
  })
</script>
