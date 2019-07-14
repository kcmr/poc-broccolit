import Plugin from 'broccoli-plugin';
import extend from 'deep-extend';
import browserSync from 'browser-sync';

class Server extends Plugin {
  constructor(inputNode, options = {}) {
    super([inputNode], {
      annotation: 'broccoli-browser-sync'
    });

    this.options = options;
  }

  createServer(dir) {
    const server = browserSync.create();
    const options = extend(this.options, { server: dir });

    server.init(options);

    return server;
  }

  build() {
    if (!this.server) {
      this.server = this.createServer(this.inputPaths[0]);
    }

    this.server.reload();
  }
}

export default Server;
