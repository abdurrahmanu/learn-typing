<template>
	<div>		
		<svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 472.615 472.615" style="enable-background:new 0 0 472.615 472.615;" xml:space="preserve">
		<g>
			<g>
				<circle cx="236.308" cy="117.504" r="111.537" :fill="login ? 'green' : (hoverbg || svgFill)"/>
			</g>
		</g>
		<g>
			<g>
				<path  :fill="hoverbg || svgFill" d="M369,246.306c-1.759-1.195-5.297-3.493-5.297-3.493c-28.511,39.583-74.993,65.402-127.395,65.402
					c-52.407,0-98.894-25.825-127.404-65.416c0,0-2.974,1.947-4.451,2.942C41.444,288.182,0,360.187,0,441.87v24.779h472.615V441.87
					C472.615,360.549,431.538,288.822,369,246.306z"/>
			</g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		<g>
		</g>
		</svg>			
	</div>
</template>

<script setup>
const authstore = authStore()
const {login} = storeToRefs(authstore)

const hoverbg = ref('')
const themestore = themeStore()
const { svgFill } = storeToRefs(themestore)
</script>