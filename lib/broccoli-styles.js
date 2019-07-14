import Filter from 'broccoli-persistent-filter';
import extend from 'deep-extend';
import { parse } from 'path';

class BroccoliStyleExport extends Filter {
  constructor(inputNodes, options) {
    super(inputNodes, {
      annotation: 'BroccoliStyleExport'
    });

    const defaults = {
      extensions: ['css'],
      targetExtension: 'css.js'
    };

    this.options = extend(defaults, options);
  }

  getDestFilePath(relativePath) {
    const { ext } = parse(relativePath);
    const { extensions, targetExtension } = this.options;
    const fileExtension = ext.slice(1);

    if (extensions.includes(fileExtension)) {
      return relativePath.replace(fileExtension, targetExtension);
    }

    return null;
  }

  processString(content) {
    const template = 'export default `{{styles}}`';

    return template.replace(/{{styles}}/g, content);
  }
}

export default BroccoliStyleExport;
