<script>
	import { urls } from './stores.js';
	import Fields from './Fields.svelte';

	const appName = 'O, Wołacz!';
	let upVoters = [];

	/**
	 * Generate up voters array on button click
	 */
	function generate() {
		upVoters = getUpVoters($urls);
	}

	/**
	 * Fetch up voters from URLs
	 * 
	 * @param {array} urls
	 * @return {array}
	 */
	async function getUpVoters(urls) {
		const res = await fetch(`${urls[0].value}`);
		const text = await res.text();

		if (res.ok) {
			const json = JSON.parse(text.replace('for(;;);', ''));
			return generateUsernames(json.operations[0].html);
		} else {
			throw new Error(text);
		}
	}

	/**
	 * Generate usernames based on string with HTML
	 * 
	 * @param {string} string
	 * @return {array}
	 */
	function generateUsernames(string) {
		const html = stringToHtml(string);
		const result = [];

		for (let a of html.querySelectorAll('a')) {
			result.push(`@${a.innerText}`);
		}

		return result;
	}

	/**
	 * Parse string to HTML Object
	 *
	 * @param {string} string
	 * @return {Document}
	 */
	function stringToHtml(string) {
		const parser = new DOMParser();
		return parser.parseFromString(string, 'text/html');
	}
</script>

<h1>{appName}</h1>
<Fields/>

<br>
<button on:click={generate}>Generuj</button>

{#await upVoters}
	<p>...waiting</p>
{:then upVoters}
	{#each upVoters as user}
		<p>{user}</p>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}