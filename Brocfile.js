import funnel from 'broccoli-funnel';
import mergeTrees from 'broccoli-merge-trees';
import BroccoliStyleImporter from './lib/broccoli-styles';
import Rollup from 'broccoli-rollup';
import rollupConfig from './lib/rollup-config';
import Server from './lib/broccoli-server';
import Autoprefixer from 'broccoli-autoprefixer';
import { main } from './package';

const styles = funnel('src', {
  include: ['**/*.css']
});
const scripts = funnel('src', {
  exclude: ['**/*.css']
});
const demo = funnel('.', {
  files: ['index.html']
});

const prefixedStyles = new Autoprefixer(styles);
const styleScripts = new BroccoliStyleImporter(prefixedStyles);
const componentTree = mergeTrees([styleScripts, scripts]);
const bundle = new Rollup(componentTree, rollupConfig(main));
const devBuild = mergeTrees([demo, bundle]);

const server = new Server(devBuild, {
  open: false,
  notify: false,
  ui: false
});

export default ({ env }) => {
  if (Boolean(env.match('build'))) {
    return componentTree;
  }

  return mergeTrees([devBuild, server]);
};
