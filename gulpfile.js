var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),
		imagemin   	  = require('gulp-imagemin'),
		cache         = require('gulp-cache'),
		del           = require('del');
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});


gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap/bootstrap.bundle.min.js',	
		'app/libs/smartmenus/jquery.smartmenus.min.js',  // nav menue
		'app/libs/smartmenus/jquery.smartmenus.bootstrap-4.min.js',  //nav menue bootstrap addon
		'app/libs/owlcarousel/owl.carousel.min.js',   //big slider and carousel
		'app/libs/circliful/jquery.circliful.min.js',   //donuts
		'app/libs/rangeslider/ion.rangeSlider.min.js'   //range slider
		])
	.pipe(concat('libs.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

 gulp.task('clean', function(){
	return del.sync('dist');
}); 

gulp.task('watch', function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('watch', 'styles', 'scripts', 'browser-sync'));

//////build
gulp.task('construct', function(){
	let buildJS = gulp.src(['app/js/libs.min.js', 'app/js/common.js'])
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
	
	let buildCSS = gulp.src(['app/css/main.min.css'])
	.pipe(gulp.dest('dist/css'));
	
	let buildFonts =  gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	
	let buildImg = gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({interlaced: true})))
	.pipe(gulp.dest('dist/img')); 
	
	let buildHtml =  gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));	
	return 1;
	
});

gulp.task('build', gulp.parallel('clean', 'construct'));
