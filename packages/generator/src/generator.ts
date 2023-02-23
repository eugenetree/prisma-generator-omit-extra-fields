import path from 'path';
import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { version } from 'prisma-generator-omit-extra-fields/package.json';

import { getExplicitlyTypedHandlersCode } from './helpers/getExplicitlyTypedHandlersCode';
import { getImplicitlyTypedHandlerCode } from './helpers/getImplicitlyTypedHandlerCode';
import { getModelFieldsCode } from './helpers/getModelFieldsCode';
import { writeFileSafely } from './utils/writeFileSafely';

generatorHandler({
	onManifest() {
		return {
			version,
			defaultOutput: '../generated',
			prettyName: 'prisma-generator-omit-extra-fields',
		}
	},
	onGenerate: async (options: GeneratorOptions) => {
		let resultCode = '';

    options.dmmf.datamodel.models.forEach((model) => {
      resultCode += `
          ${getModelFieldsCode({ modelName: model.name, modelFields: model.fields })}

  
          ${getImplicitlyTypedHandlerCode({ modelName: model.name })};\n\n


          ${getExplicitlyTypedHandlersCode({ modelName: model.name, modelFields: model.fields })}

          // - - - - - - - - //
        `
    })

    const writeLocation = path.join(options.generator.output?.value!, `test.ts`)
    await writeFileSafely(writeLocation, resultCode)
	},
})