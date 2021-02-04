import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/auto.js',
			format: 'iife'
		},
	},
	{
		input: 'src/index.js',
		plugins: [ terser() ],
		output: {
			file: 'dist/auto.min.js',
			format: 'iife',
			sourcemap: true,
		},
	},
];
