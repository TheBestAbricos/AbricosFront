<script lang="ts">
	export let checked = false;
</script>

<input {checked} on:change type="checkbox" id="switch" />
<label for="switch">Toggle</label>

<style>
	input[type='checkbox'] {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	label {
		cursor: pointer;
		text-indent: -9999px;
		width: 50px;
		height: 25px;
		background: grey;
		display: block;
		border-radius: 25px;
		position: relative;
	}

	label:after {
		content: '';
		position: absolute;
		top: 1.25px;
		left: 1.25px;
		width: 22.5px;
		height: 22.5px;
		background: #fff;
		border-radius: 90px;
		transition: 0.3s;
	}

	input:checked + label {
		background: #cfa7e7;
	}

	input:checked + label:after {
		left: calc(100% - 1.25px);
		transform: translateX(-100%);
	}

	label:active:after {
		width: 32.5px;
	}
</style>
