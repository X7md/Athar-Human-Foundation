/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,astro}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-color': {
					  1: '#4E7B70',    // First primary color
					  2: '#FFB7B0',    // Second primary color
					  3: '#F7DC9A'     // Third primary color
				},
				'secondary-color': {
					1: '#FAF6C8',
					2: '#D8EDCE'
				},
				'neutral-color': '#faf8ec'
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				koodak: ['Koodak', 'sans-serif'],
				watad: ['Montserrat', 'Watad', 'sans-serif'],
				almasmak: ['Montserrat', 'Almasmak', 'sans-serif'],
				ibm: ['IBM Plex Sans Arabic', 'serif']
            },
        },
    },
    plugins: [],
}