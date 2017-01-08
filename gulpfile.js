var gulp           = require('gulp');
var sass           = require('gulp-sass');
var autoprefixer   = require('gulp-autoprefixer');
var browserSync    = require('browser-sync').create();
var eslint         = require('gulp-eslint');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var filter         = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var sourcemaps         = require('gulp-sourcemaps');

gulp.task('browser-sync', function() {
});

gulp.task('default', ['styles', 'lint', 'copy-html', 'scripts'], function() {
    console.log('Hello, Gulp!');

    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['lint', 'scripts-watch']);
    gulp.watch('./src/index.html', ['copy-html']);
    gulp.watch('dist/index.html').on('change', browserSync.reload);

    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
});

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['src/**/*.js','!node_modules/**', '!bower_components/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('copy-html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {

    var jsFiles = ['src/js/**/*.js'];

    return gulp.src(mainBowerFiles().concat(jsFiles))
        .pipe(filter(['**/*.js']))
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-watch', ['scripts'], function(done) {
    browserSync.reload();
    done();
});
