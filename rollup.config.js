import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  // If using any exports from a symlinked project, uncomment the following:
  // preserveSymlinks: true,
	input: ['flip-card.js'],
	output: {
		file: 'bundle/flip-card.js',
    format: 'es',
		sourcemap: true,
		compact: true
	},
	plugins: [
		resolve(),
		babel(),
		terser({
			output: {
				comments: 'all'
			}
		})
  ]
};