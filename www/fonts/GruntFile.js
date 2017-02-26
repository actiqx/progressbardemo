'use strict';

var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {
        // Load grunt tasks automatically
        require('load-grunt-tasks')(grunt);

        // Time how long tasks take. Can help when optimizing build times
        require('time-grunt')(grunt);

 // Define the configuration for all the tasks
grunt.initConfig({
 pkg: grunt.file.readJSON('package.json'),
// Project settings
actiqx: {
// configurable paths
app: 'app',
scripts: 'scripts',
styles: 'styles',
images: 'images',
test: 'test',
dist: 'www'
},

// Environment Variables for Angular App
// This creates an Angular Module that can be injected via ENV
// Add any desired constants to the ENV objects below.
// https://github.com/diegonetto/generator-ionic/blob/master/docs/FAQ.md#how-do-i-add-constants
ngconstant: {
options: {
 space: '  ',
 wrap: '"use strict";\n\n {%= __ngModule %}',
 name: 'config',
 dest: '<%= actiqx.app %>/<%= actiqx.scripts %>/configuration.js'
},
development: {
 constants: {
   ENV: {
     name: 'development',
     apiEndpoint: 'http://dev.yoursite.com:10000/'
   }
 }
},
production: {
 constants: {
   ENV: {
     name: 'production',
     apiEndpoint: 'http://api.yoursite.com/'
   }
 }
}
},

// Watches files for changes and runs tasks based on the changed files
watch: {
 
 html: {
   files: ['<%= actiqx.app %>/**/*.html'],
   tasks: ['newer:copy:app']
 },
 js: {
   files: ['<%= actiqx.app %>/<%= actiqx.scripts %>/**/*.js'],
   tasks: ['newer:copy:app', 'newer:jshint:all']
 },
 styles: {
   files: ['<%= actiqx.app %>/<%= actiqx.styles %>/**/*.css'],
   tasks: ['newer:copy:styles', 'autoprefixer', 'newer:copy:tmp']
 },
 gruntfile: {
   files: ['Gruntfile.js'],
   tasks: ['ngconstant:development', 'newer:copy:app']
 }
},

// The actual grunt server settings
connect: {
   server: {
      options: {
        port: 9001,
        hostname: '0.0.0.0',
        open: true,
        base: '<%= actiqx.dist %>'
      }
   },
options: {
 port: 9000,
 // Change this to '0.0.0.0' to access the server from outside.
 hostname: 'localhost'
},
dist: {
 options: {
   base: '<%= actiqx.dist %>'
 }
},
coverage: {
 options: {
   port: 9002,
   open: true,
   base: ['coverage']
 }
}
},

// Make sure code styles are up to par and there are no obvious mistakes
jshint: {
options: {
 jshintrc: '.jshintrc',
 reporter: require('jshint-stylish')
},
all: [
 'Gruntfile.js',
 '<%= actiqx.app %>/<%= actiqx.scripts %>/**/*.js'
],
test: {
 options: {
   jshintrc: 'test/.jshintrc'
 },
 src: ['test/unit/**/*.js']
}
},

// Empties folders to start fresh
clean: {
dist: {
 files: [{
   dot: true,
   src: [
     '.temp',
     '<%= actiqx.dist %>/*',
     '!<%= actiqx.dist %>/.git*'
   ]
 }]
},
server: '.temp'
},

autoprefixer: {
options: {
 browsers: ['last 1 version']
},
dist: {
 files: [{
   expand: true,
   cwd: '.temp/<%= actiqx.styles %>/',
   src: '{,*/}*.css',
   dest: '.temp/<%= actiqx.styles %>/'
 }]
}
},

// Automatically inject Bower components into the app
wiredep: {
app: {
 src: ['<%= actiqx.app %>/index.html'],
 ignorePath:  /\.\.\//
}
},
angularFileLoader: {
    options: {
      scripts: ['app/js/**/*.js']
    },
    your_target: {
      src: ['index.html']
    },
},



// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
useminPrepare: {
html: '<%= actiqx.app %>/index.html',
options: {
 dest: '<%= actiqx.dist %>',
 staging: '.temp',
 flow: {
   html: {
     steps: {
       js: ['concat', 'uglifyjs'],
       css: ['cssmin']
     },
     post: {}
   }
 }
}
},

// Performs rewrites based on the useminPrepare configuration
usemin: {
html: ['<%= actiqx.dist %>/**/*.html'],
css: ['<%= actiqx.dist %>/<%= actiqx.styles %>/**/*.css'],
options: {
 assetsDirs: ['<%= actiqx.dist %>']
}
},

// The following *-min tasks produce minified files in the dist folder
cssmin: {
options: {
 //root: '<%= actiqx.app %>',
 noRebase: true
}
},
htmlmin: {
dist: {
 options: {
   collapseWhitespace: true,
   collapseBooleanAttributes: true,
   removeCommentsFromCDATA: true,
   removeOptionalTags: true
 },
 files: [{
   expand: true,
   cwd: '<%= actiqx.dist %>',
   src: ['*.html', 'templates/**/*.html'],
   dest: '<%= actiqx.dist %>'
 }]
}
},

// Copies remaining files to places other tasks can use
copy: {
dist: {
 files: [{
   expand: true,
   dot: true,
   cwd: '<%= actiqx.app %>',
   dest: '<%= actiqx.dist %>',
   src: [
     '<%= actiqx.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
     '*.html',
     'templates/**/*.html',
     'fonts/*'
   ]
 }, {
   expand: true,
   cwd: '.temp/<%= actiqx.images %>',
   dest: '<%= actiqx.dist %>/<%= actiqx.images %>',
   src: ['generated/*']
 }]
},
styles: {
 expand: true,
 cwd: '<%= actiqx.app %>/<%= actiqx.styles %>',
 dest: '.temp/<%= actiqx.styles %>/',
 src: '{,*/}*.css'
},
fonts: {
 expand: true,
 dest: '<%= actiqx.app %>/fonts/',
 src: '*'
},
vendor: {
 expand: true,
 cwd: '<%= actiqx.app %>/vendor',
 dest: '.temp/<%= actiqx.styles %>/',
 src: '{,*/}*.css'
},
app: {
 expand: true,
 cwd: '<%= actiqx.app %>',
 dest: '<%= actiqx.dist %>/',
 src: [
   '**/*',
   '!**/*.(scss,sass,css)',
 ]
},
tmp: {
 expand: true,
 cwd: '.temp',
 dest: '<%= actiqx.dist %>/',
 src: '**/*'
}
},

concurrent: {
ionic: {
 tasks: [],
 options: {
   logConcurrentOutput: true
 }
},
server: [
 'copy:styles',
 'copy:vendor',
 'copy:fonts'
],
test: [
 'copy:styles',
 'copy:vendor',
 'copy:fonts'
],
dist: [
 'copy:styles',
 'copy:vendor',
 'copy:fonts'
]
},

// By default, your `index.html`'s <!-- Usemin block --> will take care of
// minification. These next options are pre-configured if you do not wish
// to use the Usemin blocks.
// cssmin: {
//   dist: {
//     files: {
//       '<%= actiqx.dist %>/<%= actiqx.styles %>/main.css': [
//         '.temp/<%= actiqx.styles %>/**/*.css',
//         '<%= actiqx.app %>/<%= actiqx.styles %>/**/*.css'
//       ]
//     }
//   }
// },
// uglify: {
//   dist: {
//     files: {
//       '<%= actiqx.dist %>/<%= actiqx.scripts %>/scripts.js': [
//         '<%= actiqx.dist %>/<%= actiqx.scripts %>/scripts.js'
//       ]
//     }
//   }
// },
// concat: {
//   dist: {}
// },

// Test settings
// These will override any config options in karma.conf.js if you create it.
karma: {
options: {
 basePath: '',
 frameworks: ['mocha', 'chai'],
 files: [
   '<%= actiqx.app %>/<%= actiqx.scripts %>/**/*.js',
   '<%= actiqx.test %>/mock/**/*.js',
   '<%= actiqx.test %>/spec/**/*.js'
 ],
 autoWatch: false,
 reporters: ['dots', 'coverage'],
 port: 8080,
 singleRun: false,
 preprocessors: {
   // Update this if you change the actiqx config path
   '<%= actiqx.app %>/<%= actiqx.scripts %>/**/*.js': ['coverage']
 },
 coverageReporter: {
   reporters: [
     { type: 'html', dir: 'coverage/' },
     { type: 'text-summary' }
   ]
 }
},
unit: {
 // Change this to 'Chrome', 'Firefox', etc. Note that you will need
 // to install a karma launcher plugin for browsers other than Chrome.
 browsers: ['PhantomJS'],
 background: true
},
continuous: {
 browsers: ['PhantomJS'],
 singleRun: true
}
},

// ngAnnotate tries to make the code safe for minification automatically by
// using the Angular long form for dependency injection.
ngAnnotate: {
dist: {
 files: [{
   expand: true,
   cwd: '.temp/concat/<%= actiqx.scripts %>',
   src: '*.js',
   dest: '.temp/concat/<%= actiqx.scripts %>'
 }]
}
}

});


// Since Apache Ripple serves assets directly out of their respective platform
// directories, we watch all registered files and then copy all un-built assets
// over to <%= actiqx.dist %>/. Last step is running cordova prepare so we can refresh the ripple
// browser tab to see the changes. Technically ripple runs `cordova prepare` on browser
// refreshes, but at this time you would need to re-run the emulator to see changes.
grunt.registerTask('ripple', ['wiredep', 'newer:copy:app', 'ripple-emulator']);
grunt.registerTask('ripple-emulator', function () {
grunt.config.set('watch', {
all: {
 files: _.flatten(_.pluck(grunt.config.get('watch'), 'files')),
 tasks: ['newer:copy:app', 'prepare']
}
});

var cmd = path.resolve('./node_modules/ripple-emulator/bin', 'ripple');
var child = spawn(cmd, ['emulate']);
child.stdout.on('data', function (data) {
grunt.log.writeln(data);
});
child.stderr.on('data', function (data) {
grunt.log.error(data);
});
process.on('exit', function (code) {
child.kill('SIGINT');
process.exit(code);
});

return grunt.task.run(['watch']);
});

// Dynamically configure `karma` target of `watch` task so that
// we don't have to run the karma test server as part of `grunt serve`
grunt.registerTask('watch:karma', function () {
var karma = {
files: ['<%= actiqx.app %>/<%= actiqx.scripts %>/**/*.js', '<%= actiqx.test %>/spec/**/*.js'],
tasks: ['newer:jshint:test', 'karma:unit:run']
};
grunt.config.set('watch', karma);
return grunt.task.run(['watch']);
});



grunt.registerTask('test', [
'wiredep',
'clean',
'concurrent:test',
'autoprefixer',
'karma:unit:start',
'watch:karma'
]);

grunt.registerTask('serve', function (target) {
if (target === 'compress') {
return grunt.task.run(['compress']);
}


grunt.task.run(['wiredep', 'init','connect:server', 'watch']);
});

grunt.registerTask('run', function() {
return grunt.task.run(['init', 'watch']);
});
grunt.registerTask('build', function() {
return grunt.task.run(['init']);
});

grunt.registerTask('init', [

'clean',
'ngconstant:development',
'wiredep',
'concurrent:server',
'autoprefixer',
'newer:copy:app',
'newer:copy:tmp'
]);


grunt.registerTask('compress', [
'clean',
'ngconstant:production',
'wiredep',
'useminPrepare',
'concurrent:dist',
'autoprefixer',
'concat',
'ngAnnotate',
'copy:dist',
'cssmin',
'uglify',
'usemin',
'htmlmin'
]);

grunt.registerTask('coverage',
['karma:continuous',
'connect:coverage:keepalive'
]);

grunt.registerTask('default', [
'wiredep',
'newer:jshint',
'karma:continuous',
'compress'
]);


        };
