const path          = require('path'),
      gulp          = require('gulp'),
      $             = require('gulp-load-plugins')(),
      merge         = require('merge2'),
      del           = require('del'),
      browserSync   = require('browser-sync');


// package.json as JS object
const pkg = require(path.join(__dirname, 'package.json'));

const banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

gulp.task('clean', function(done) {
    return del(['dist'], done);
});

gulp.task('build', ['clean'], function() {
    const taskConfigCjs = $.typescript.createProject('tsconfig.json', {
        target: 'ES5',
        module: 'commonjs',
        moduleResolution: 'node',
        declaration: true,
        removeComments: false,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        typescript: require('typescript')
    });

    const tsResult = gulp.src(['src/**/*.ts', 'typings/main.d.ts', '!src/app-demo/**'])
        .pipe($.sourcemaps.init())
        .pipe($.typescript(taskConfigCjs));

    return merge([
        tsResult.dts
            .pipe($.header(banner, { pkg: pkg } ))
            .pipe(gulp.dest('dist/')),

        tsResult.js
            .pipe($.uglify())
            .pipe($.header(banner, { pkg: pkg } ))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('dist/'))
    ]);
});

gulp.task('build:examples', function() {
    const taskConfigCjs = $.typescript.createProject('tsconfig.json', {
        module: 'system',
        moduleResolution: 'node',
        typescript: require('typescript')
    });

    return merge([
        // Compile TypeScript
        gulp.src(['src/**/*.ts', 'typings/main.d.ts'])
            .pipe($.sourcemaps.init())
            .pipe($.typescript(taskConfigCjs))
            .js
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('dist/')),

        // Copy assets....
        gulp.src(['src/app-demo/**', '!src/app-demo/**/*.ts'])
            .pipe(gulp.dest('dist/app-demo'))
    ]);
});



gulp.task('start', ['clean', 'build:examples'], function() {
    browserSync({
        port: 8080,
        startPath: '/',
        server: {
            baseDir: 'dist/app-demo',
            routes: {
                '/': 'dist/',
                '/node_modules': 'node_modules'
            }
        }
    });

    return gulp.watch(['src/**'], ['build:examples']);
});