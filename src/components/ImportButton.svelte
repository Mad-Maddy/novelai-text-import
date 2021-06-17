<style>
  .text-import-button-container {
    margin-top: 1rem;
  }
</style>

<script lang="ts">
  export let containerClassList: string[] = []
  export let btnClassList: string[] = []
</script>

<div class={[...containerClassList, 'text-import-button-container'].join(' ')}>
  <button on:click class={btnClassList.join(' ')}>Import Text</button>
  <div style="align-self: center;">Import text with line breaks</div>
</div>
