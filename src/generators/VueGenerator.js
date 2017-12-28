import chalk from 'chalk';
import BaseGenerator from './BaseGenerator';

export default class extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates(`vue/`, [
      // modules
      'store/modules/foo/index.js',
      'store/modules/foo/create.js',
      'store/modules/foo/delete.js',
      'store/modules/foo/list.js',
      'store/modules/foo/update.js',
      'store/modules/foo/show.js',
      'store/modules/foo/mutation-types.js',

      // components
      'components/foo/Create.vue',
      'components/foo/Form.vue',
      'components/foo/List.vue',
      'components/foo/Update.vue',
      'components/foo/Show.vue',

      // routes
      'routes/foo.js',

      // error
      'error/SubmissionError.js',

      // utils
      'utils/fetch.js',
    ]);
  }

  help(name, resource) {
    const titleLc = name.toLowerCase();

    console.log('Code for the "%s" resource type has been generated!', name);
    console.log('Paste the following definitions in your application configuration:');
    console.log(chalk.green(`
//import routes
import ${titleLc}Routes from './routes/${titleLc}';

// Add routes to VueRouter
const router = new VueRouter({
  // ...
  routes: [
      ...${titleLc}Routes,
  ]
});

// Add the modules in the store
import ${titleLc} from './store/modules/${titleLc}/';

export const store = new Vuex.Store({
  // ...
  modules: {
    ${titleLc}
  }
});
`));
  }

  generate(entrypoint, name, resource, dir) {
    const lc = name.toLowerCase();
    const titleUcFirst = name.charAt(0).toUpperCase() + name.slice(1);

    const context = {
      title: name,
      name: name,
      plural: lc + 's',
      lc,
      uc: name.toUpperCase(),
      fields: this.buildFields(resource),
      formFields: this.buildFields(resource),
      titleUcFirst
    };

    // Create directories
    // These directories may already exist
    for (let dir of [`${dir}/config`, `${dir}/error`, `${dir}/routes`, `${dir}/utils`]) {
      this.createDir(dir, false);
    }

    for (let dir of [`${dir}/store/modules/${lc}`, `${dir}/components/${lc}`]) {
      this.createDir(dir);
    }

    for (let pattern of [
      // modules
      'store/modules/%s/index.js',
      'store/modules/%s/create.js',
      'store/modules/%s/delete.js',
      'store/modules/%s/list.js',
      'store/modules/%s/update.js',
      'store/modules/%s/show.js',
      'store/modules/%s/mutation-types.js',

      // components
      'components/%s/Create.vue',
      'components/%s/Form.vue',
      'components/%s/List.vue',
      'components/%s/Update.vue',
      'components/%s/Show.vue',

      // routes
      'routes/%s.js',
    ]) {
      this.createFileFromPattern(pattern, dir, lc, context);
    }

    // error
    this.createFile('error/SubmissionError.js', `${dir}/error/SubmissionError.js`, context, false);

    this.createEntrypoint(entrypoint.replace('/'+lc+'s', ''), `${dir}/config/_entrypoint.js`);
    this.createFile('utils/fetch.js', `${dir}/utils/fetch.js`, {}, false);
  }
}
