const { LiveReloadCompiler } = require('@nestjs/ng-universal');

const compiler = new LiveReloadCompiler({
    projectName: 'teanjs-universal',
});
compiler.run();