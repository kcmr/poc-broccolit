import Plugin from 'broccoli-plugin';
import extend from 'deep-extend';
import liveServer from 'live-server';

class Server extends Plugin {
  constructor(inputNode, options = {}) {
    super([inputNode], {
      annotation: 'broccoli-live-server'
    });

    const defaults = {
      open: false,
      ignore: /.*\.map/
    };

    this.options = extend(defaults, options);
  }

  createServer(dir) {
    this.options.root = dir;
    this.server = liveServer.start(this.options);
  }

  build() {
    if (this.server) {
      return;
    }

    this.createServer(this.inputPaths[0]);
  }
}

export default Server;
