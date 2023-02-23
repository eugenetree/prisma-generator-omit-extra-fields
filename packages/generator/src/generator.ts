import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { version } from 'prisma-generator-omit-extra-fields/package.json';

generatorHandler({
	onManifest() {
		return {
			version,
			defaultOutput: '../generated',
			prettyName: 'prisma-generator-omit-extra-fields',
		}
	},
	onGenerate: async (options) => {
		console.log('HELLO WORLD');
	},
})