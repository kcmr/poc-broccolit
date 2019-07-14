import funnel from 'broccoli-funnel';
import mergeTrees from 'broccoli-merge-trees';
import BroccoliStyleImporter from './lib/broccoli-styles';
import Rollup from 'broccoli-rollup';
import rollupConfig from './lib/rollup-config';
import BrowserSync from 'broccoli-bs';
import { main } from './package';

const styleScripts = new BroccoliStyleImporter('src');
const scriptsFunnel = funnel(styleScripts, {
  exclude: ['**/*.css']
});
const bundle = new Rollup(scriptsFunnel, rollupConfig(main));
const demo = funnel('.', {
  files: ['index.html']
});
const devBuild = mergeTrees([demo, bundle]);
const server = () =>
  new BrowserSync(devBuild, {
    bs: {
      open: false,
      notify: false
    }
  });

export default ({ env }) => {
  if (Boolean(env.match('build'))) {
    return scriptsFunnel;
  }

  return mergeTrees([devBuild, server()]);
};
