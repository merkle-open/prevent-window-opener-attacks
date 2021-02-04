import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/lib.js',
		output: {
			file: 'dist/lib.js',
			format: 'umd',
			name: 'preventWindowOpenAttacks',
		},
	},
	{
		input: 'src/lib.js',
		plugins: [ terser() ],
		output: {
			file: 'dist/lib.min.js',
			format: 'umd',
			name: 'preventWindowOpenAttacks',
			sourcemap: true,
		},
	},
];
