import VueGenerator from './generators/VueGenerator';

function wrap (cl) {
  return ({templateDirectory}) => new cl({templateDirectory})
}

export default function generators (generator = 'react') {
  switch (generator) {
    case 'vue':
      return wrap(VueGenerator)
  }
}
