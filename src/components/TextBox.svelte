<style>
  .hidden {
    display: none !important;
  }

  .text-container {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    max-height: 80%;
    width: 40rem;
    height: 60rem;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    display: flex;
    flex-direction: column;
  }

  .btn-bar {
    display: flex;
    flex-direction: row-reverse;
    flex-shrink: 0;
    padding: 0.8rem 0.5rem 0.5rem 0.5rem;
  }

  button {
    margin-left: 0.5rem;
  }

  textarea {
    flex-grow: 1;
  }

  h4 {
    flex-shrink: 0;
    padding-left: 0.5rem;
    font-size: 1.2rem;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let visible: boolean = false
  export let background: string = 'white'

  export const show = () => {
    visible = true
  }

  export const hide = () => {
    textArea.value = ''
    visible = false
  }

  const dispatch = createEventDispatcher()

  let textArea: HTMLTextAreaElement

  const handleImport = () => {
    console.log('handle import')
    dispatch('import', textArea.value)
  }

  const handleCancel = () => {
    hide()
  }
</script>

<div
  class:hidden={!visible}
  class="text-container"
  style="background: {background}"
>
  <h4>Paste your text</h4>
  <textarea bind:this={textArea} />
  <div class="btn-bar">
    <button on:click={handleImport}>Import</button>
    <button on:click={handleCancel}>Cancel</button>
  </div>
</div>
