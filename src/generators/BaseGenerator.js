import fs from 'fs';
import handlebars from 'handlebars';
import mkdirp from 'mkdirp';
import { sprintf } from 'sprintf-js';
import urlapi from 'url';

var helpers = require('handlebars-helpers')();

export default class {
  templates = {};

  constructor({templateDirectory}) {
    this.templateDirectory = templateDirectory;

    this.registerTemplates('', ['_entrypoint.js']);
  }

  registerTemplates(basePath, paths) {
    for (let path of paths) {
      this.templates[path] = handlebars.compile(fs.readFileSync(`${this.templateDirectory}/${basePath}${path}`).toString());
    }
  }

  createDir(dir, warn = true) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);

      return;
    }

    if (warn) console.log(`The directory "${dir}" already exists`);
  }

  createFileFromPattern(pattern, dir, lc, context) {
    this.createFile(sprintf(pattern, 'foo'), sprintf(`${dir}/${pattern}`, lc), context);
  }

  createFile(template, dest, context = {}, warn = true) {
    if (!fs.existsSync(dest)) {
      fs.writeFileSync(dest, this.templates[template](context));

      return;
    }

    if (warn) console.log(`The file "${dest}" already exists`);
  }

  createEntrypoint(apiEntry, dest) {
    const url = urlapi.parse(apiEntry);
    const {protocol, host, pathname} = url;

    this.createFile('_entrypoint.js', dest, {host: `${protocol}//${host}`, path: pathname}, false);
  }

  getHtmlInputTypeFromField(field) {
    switch (field.format) {
      case 'date-time':
        return {type: 'dateTime'};
      case 'double':
        return {type: 'number', step: '0.1'};
    }
    switch (field.type) {
      case 'number':
        return {type: 'number'};
      case 'boolean':
        return {type: 'checkbox'};
      default:
        return {type: 'text'};
    }
  }

  buildFields(apiFields) {
    let fields = [];
    for (let key of Object.keys(apiFields.properties)) {
      var apiField = apiFields.properties[key];
      let field = this.getHtmlInputTypeFromField(apiField);
      field.required = (apiFields.required.indexOf(key) > -1);
      field.name = key;
      field.description = key.replace(/"/g, "'"); // fix for Form placeholder description

      fields.push(field)
    }

    return fields;
  }
}
