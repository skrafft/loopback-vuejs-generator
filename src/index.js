#!/usr/bin/env node

import 'isomorphic-fetch';
import program from 'commander';
import fetchSwagger from './fetchSwagger.js';
import {version} from '../package.json';
import generators from './generators';

program
  .version(version)
  .description('Generate a CRUD application built with Vue from a loopback API')
  .usage('entrypoint outputDirectory')
  .option('-r, --resource [resourceName]', 'Generate CRUD for the given resource')
  .option('-g, --generator [generator]', 'The generator to use, one of "react", "react-native", "vue", "admin-on-rest"', 'vue')
  .option('-t, --template-directory [templateDirectory]', 'The templates directory base to use. Final directory will be ${templateDirectory}/${generator}', `${__dirname}/../templates/`)
  .parse(process.argv);

if (2 !== program.args.length && (!process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT || !process.env.API_PLATFORM_CLIENT_GENERATOR_OUTPUT)) {
  program.help();
}

const entrypoint = program.args[0] || process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT;
const outputDirectory = program.args[1] || process.env.API_PLATFORM_CLIENT_GENERATOR_OUTPUT;

const generator = generators(program.generator)({
  templateDirectory: program.templateDirectory
});
const resourceToGenerate = program.resource ? program.resource.toLowerCase() : null;

fetchSwagger(entrypoint).then(ret => {
  Object.keys(ret.body.definitions).forEach(function (key) {
    let resource = ret.body.definitions['$new_' + key];
    const nameLc = key.toLowerCase();

    if (null === resourceToGenerate || nameLc === resourceToGenerate) {
      generator.generate(entrypoint.replace('/explorer/swagger.json', ret.body.basePath + '/' + key + 's'), key, resource, outputDirectory);
      generator.help(key, resource)
    }
  });
}).catch((e) => {
  console.log(e);
});
