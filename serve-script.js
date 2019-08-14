const { LiveReloadCompiler } = require('@nestjs/ng-universal');

const compiler = new LiveReloadCompiler({
    projectName: 'platform-prototype-universal'

});
compiler.run();