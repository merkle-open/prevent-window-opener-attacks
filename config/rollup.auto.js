import { uglify } from 'rollup-plugin-uglify';

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
		plugins: [ uglify() ],
		output: {
			file: 'dist/auto.min.js',
			format: 'iife',
			sourcemap: true,
		},
	},
];