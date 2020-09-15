<script>
  import { urls } from './stores.js';
  
  let maxFields = 3;
  let fields = [
    { id: 1, value: 'https://www.wykop.pl/ajax2/wpis/upvoters/52056255/' }
  ];
  $: canAdd = (fields.length >= maxFields);
  $: urls.update(val => fields);

  /**
   * Add new field
   */
  function add() {
    if (canAdd) {
      return;
    }
    fields = fields.concat({id: fields.length + 1, value: ''});
  }

  /**
   * Remove selected field
   * 
   * @param {object} field
   */
  function remove(field) {
    fields = fields.filter(element => field !== element);
  }
</script>

{#each fields as field, i}
  <label>
    <input type="url" name="url[]" placeholder="https://" bind:value={field.value}>
    <button on:click={remove(field)} disabled={!i}>Usuń</button>
  </label>
{/each}

<button on:click={add} disabled={canAdd}>Dodaj warunek</button>