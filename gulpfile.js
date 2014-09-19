// native module
var resolve = require('path').resolve;

// remote module 
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

// resolve the root directly
var root = resolve(__dirname);

//lint task  
gulp.task('jshint',function () {
    gulp.src(resolve(root, 'client/javascripts/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 编译less  
gulp.task('less',function () {
    gulp.src(resolve(root, 'client/less/*.less'))
    .pipe(less())
    .pipe(gulp.dest(resolve(root, 'public/css')));
});  

// 拼接、简化JS文件   
gulp.task('scripts',function () {
    gulp.src([resolve(root, 'client/javascripts/**/module.js'), resolve(root, 'client/javascripts/**/*.js')])
    .pipe(ngAnnotate())
    .pipe(concat('all.js'))
    .pipe(gulp.dest(resolve(root, 'public/javascripts')))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(resolve(root, 'public/javascripts')));
});

// watch
gulp.task('watch', function() {

    // 监视我们JS文件的变化   
    gulp.watch(resolve(root, 'client/javascripts/**/*.js'), ['jshint', 'scripts']);

    // 监视scss文件的变化   
    gulp.watch(resolve(root, 'client/less/*.less'), ['less']);
});


// 默认任务   
gulp.task('default', ['jshint','less','scripts', 'watch']);