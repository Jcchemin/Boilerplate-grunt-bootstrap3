module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

jshint: {
    options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
            jQuery: true,
            $: true
        },
    },
    all: ['Gruntfile.js', 'js/*.js']
},
concat: {   
    dist: {
        src: [
            'assets/js/libs/*.js',
            'assets/js/libs/bootstrap/*.js',
            'assets/js/global.js'
        ],
        dest: 'assets/js/production.js'
    },
    shiv: {
        src: ['assets/js/shiv/*.js'],
        dest: 'assets/js/shiv.js'
    }
},
uglify: {
    build: {
        src: 'assets/js/production.js',
        dest: 'dist/assets/js/production.min.js'
    },
    shiv: {
        src: 'assets/js/shiv.js',
        dest: 'dist/assets/js/shiv.min.js'
    }
},
imagemin: {
    dynamic: {
        files: [{
            expand: true,
            cwd: 'assets/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/assets/images/'
        }]
    }
},
less: {
  development: {
    options: {
        cleancss: true,
        yuicompress: true
    },
    files: {
        'dist/assets/css/bootstrap.css': 'assets/css/bootstrap.less',
    }
  }
},
copy: {
  fonts: {
    src: 'assets/fonts/*',
    dest: 'dist/assets/',
  },
},
watch: {
    options: {
        livereload: true,
        files: ['dist/**/*']
    },
    minify: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        },
    },
    images: {
        files: ['assets/images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
            spawn: false,
        },
    },
    jshint: {
        files: ['Gruntfile.js', 'assets/js/*.js'],
        tasks: ['jshint']
    },
    less: {
        files: ['assets/css/*.less'],
        tasks: ['less']
    },
}

});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-copy');

// on watch events configure jshint:all to only run on changed file
grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
});


grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'imagemin', 'less', 'copy', 'watch']);

};
