<script lang="ts">
</script>

<div class="body_indicator">
	<section class="sect_loader">
		<span class="loader_indciator loader-circles" />
	</section>
</div>

<style>
	.body_indicator {
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		font-size: 40px;
		color: #fff;
		text-align: center;
	}

	.sect_loader {
		background-color: #16a085;
		height: 200px;
		line-height: 200px;
		background-color: #ffffff;
	}

	.loader_indciator {
		width: 50px;
		height: 50px;
		display: inline-block;
		vertical-align: middle;
		position: relative;
	}

	/* Loaders */

	.loader-circles {
		border-radius: 50px;
		border: 3px solid transparent;
		border-top-color: #25333b;
		-webkit-animation: spin 1s linear infinite;
		-moz-animation: spin 1s linear infinite;
		animation: spin 1s linear infinite;
	}
	.loader-circles:before,
	.loader-circles:after {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		bottom: 5px;
		right: 5px;
		border-radius: 50px;
		border: 3px solid transparent;
		border-top-color: #25333b;
		opacity: 0.8;
		-webkit-animation: spin 10s linear infinite;
		-moz-animation: spin 10s linear infinite;
		animation: spin 10s linear infinite;
	}
	.loader-circles:before {
		top: 12px;
		left: 12px;
		bottom: 12px;
		right: 12px;
		opacity: 0.5;
		-webkit-animation: spin 5s linear infinite;
		-moz-animation: spin 5s linear infinite;
		animation: spin 5s linear infinite;
	}

	@-webkit-keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-moz-keyframes spin {
		from {
			-moz-transform: rotate(0deg);
		}

		to {
			-moz-transform: rotate(360deg);
		}
	}
	@keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spinreverse {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(-360deg);
		}
	}
	@-moz-keyframes spinreverse {
		from {
			-moz-transform: rotate(0deg);
		}

		to {
			-moz-transform: rotate(-360deg);
		}
	}
	@keyframes spinreverse {
		from {
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(-360deg);
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-o-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}
</style>
