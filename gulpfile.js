var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gulpSequence = require('gulp-sequence'),    //序列
	autoprefixer = require('gulp-autoprefixer'),	//前缀的后处理程序
	connect = require('gulp-connect');

//sass
gulp.task('sass', function () {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))

    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload())
});

//定义html任务
gulp.task('html', function () {
	return gulp.src('./index.html')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('./assets/scss/*.scss',['sass']);
	gulp.watch('./*.html',['html']);
})

//定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('product',gulpSequence('sass','html'));

gulp.task('default',['product', 'watch', 'connect'], function() {
    console.log('ok');
});