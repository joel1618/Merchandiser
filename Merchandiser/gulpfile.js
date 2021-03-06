﻿/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    del = require("del"),
    sourcemaps = require("gulp-sourcemaps"),
    merge = require('merge-stream'),
    templateCache = require('gulp-angular-templatecache'),
    sass = require('gulp-sass'),
    cachebust = require('gulp-cache-bust'),
    htmlreplace = require('gulp-html-replace'),
    replace = require('gulp-replace');

var path = {
    components: "./bower_components/",
    app: "./App/",
    pub: {
        js: "./public/assets/js/",
        libs: "./public/assets/libs/",
        css: "./public/assets/css/",
        fonts: "./public/assets/fonts/",
        i18n: "./public/assets/i18n/"
    }
};

gulp.task("vendorJs", function () {
    gulp.src([
            path.components + "jquery/dist/jquery.min.js",
            //path.components + "lodash/dist/lodash.js",
            path.components + "angular/angular.min.js",
            path.components + "angular-route/angular-route.min.js",
            path.components + "angular-animate/angular-animate.min.js",
            path.components + "angular-sanitize/angular-sanitize.min.js",
            path.components + "angular-resource/angular-resource.min.js",
            path.components + "angular-translate/angular-translate.min.js",
            path.components + "moment/min/moment.min.js",
            path.components + "angular-moment/angular-moment.min.js",
            path.components + "angular-ui-router/release/angular-ui-router.min.js",
            path.components + 'toastr/toastr.min.js',
            path.components + "angular-bootstrap/ui-bootstrap.min.js",
            path.components + "angular-bootstrap/ui-bootstrap-tpls.min.js",
            path.components + "breeze-client/build/breeze.debug.js",
            path.components + "breeze-client/build/adapters/breeze.bridge.angular.js",
            path.components + "angular-block-ui/dist/angular-block-ui.min.js",
            path.components + "angular-touch/angular-touch.min.js",
            path.components + "angular-ui-grid/ui-grid.min.js",
            path.components + "csv/lib/csv.js",
            path.components + "pdfmake/build/pdfmake.js",
            path.components + "pdfmake/build/vfs_fonts.js",
            path.components + "ngmap/build/scripts/ng-map.min.js",
            path.components + "bootstrap/dist/js/bootstrap.min.js",
            path.components + "angular-aria/angular-aria.min.js",
            path.components + "angular-messages/angular-messages.min.js",
            path.components + "angular-material/angular-material.js",
            path.components + "ng-focus-if/focusIf.min.js",
            path.components + "angular-jquery/dist/angular-jquery.min.js",
            path.components + "angular-bootstrap-affix/dist/angular-bootstrap-affix.min.js",
            path.components + "ui-grid-draggable-rows/js/draggable-rows.js",
            path.components + "angular-local-storage/dist/angular-local-storage.min.js"
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(path.pub.libs))
    .pipe(rename("vendor.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(path.pub.libs));
});

gulp.task('app', function () {
    return gulp.src([
        path.app + "ApplicationServices/ApplicationServices.js",
        path.app + "ApplicationServices/**/*.js",
        path.app + "DatabaseServices/DatabaseServices.js",
        path.app + "DatabaseServices/**/*.js",
        path.app + "Directives/Directives.js",
        path.app + "Directives/*.js",
        path.app + "ApplicationComponents/App.js",
        path.app + "ApplicationComponents/Main/Controllers/*.js",      
        path.app + "ApplicationComponents/Administrator/Admin/Controllers/*.js",
        path.app + "ApplicationComponents/Administrator/**/**/*.js",
        path.app + "ApplicationComponents/DataEntry/**/**/*.js",
        path.app + "ApplicationComponents/Reporting/Report/ReportController.js",
        path.app + "ApplicationComponents/Reporting/Survey/SurveyReportController.js",
        path.app + "ApplicationComponents/Reporting/SurveyHeader/SurveyHeaderReportController.js",
        path.app + "ApplicationComponents/Reporting/Weekly/WeeklyReportController.js",
        path.app + "ApplicationComponents/Reporting/Location/LocationReportController.js",
        path.app + "ApplicationComponents/Reporting/Modal/**/*.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(gulp.dest(path.pub.js))
    .pipe(rename("app.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.pub.js));
});

gulp.task('app:watch', function () {
    gulp.watch([path.app + '**/*.js', path.app + '**/**/*.js'], ['app']);
});

gulp.task("templates", function () {
    return gulp.src([path.app + "**/*.html", path.app + "**/**/*.html"])
           .pipe(templateCache({
               module: "Main",
               transformUrl: function (url) {
                   return url.replace(/\.tpl\.html$/, '.html');
               }
           }))
           .pipe(gulp.dest(path.pub.js))
           .pipe(rename("templates.min.js"))
           .pipe(uglify())
           .pipe(sourcemaps.write("."))
           .pipe(gulp.dest(path.pub.js));
});

gulp.task('templates:watch', function () {
    gulp.watch([path.app + '**/*.html', path.app + '**/**/*.html'], ['templates']);
});

gulp.task('styles', function () {

    var fonts = gulp.src(
        [
            //path.components + 'mdi/fonts/*',
            path.components + 'font-awesome/fonts/*'
        ])
        .pipe(gulp.dest(path.pub.fonts));

    //var compile = gulp.src(path.app + 'assets/css/*.scss')
    //.pipe(sass().on('error', sass.logError))
    //.pipe(gulp.dest(path.app + 'assets/css'));

    var css = gulp.src([
        //path.components + 'bootstrap/dist/css/bootstrap-theme.css',
        path.components + 'font-awesome/css/font-awesome.css',
        path.components + 'toastr/toastr.css',
        path.components + 'angular-block-ui/dist/angular-block-ui.css',
        path.components + 'angular-ui-grid/ui-grid.min.css',
        //******The ui-grid files mess with angular material for some reason**************
        //path.components + 'angular-ui-grid/ui-grid.ttf',
        //path.components + 'angular-ui-grid/ui-grid.woff',
        //path.components + 'angular-ui-grid/ui-grid.eot',
        //path.components + 'angular-ui-grid/ui-grid.svg',
        //path.components + 'bootstrap/dist/css/bootstrap.min.css',
        path.components + 'angular-bootstrap/ui-bootstrap-csp.css',
        path.components + 'angular-material/angular-material.css',
        //path.app + 'assets/css/docs.css',
        //path.app + 'assets/css/app.css'

    ])
    .pipe(concat('site.css'))
    .pipe(gulp.dest(path.pub.css))
    .pipe(rename("site.min.css"))
    .pipe(uglifycss())
    .pipe(gulp.dest(path.pub.css));

    //return merge(fonts, compile, css);
    return merge(fonts, css);
});

gulp.task('styles:watch', function () {
    gulp.watch(path.app + 'assets/css/*.scss', ['styles']);
});

//Copy ui grid font files into public.  ui-grid css looks for them in its directory.
gulp.task('copy', function () {
    return gulp.src([
        path.components + 'angular-ui-grid/ui-grid.ttf',
        path.components + 'angular-ui-grid/ui-grid.woff',
        path.components + 'angular-ui-grid/ui-grid.eot',
        path.components + 'angular-ui-grid/ui-grid.svg'])
        .pipe(gulp.dest(path.pub.css));
});

gulp.task('cache', function () {
    gulp.src('./Views/Shared/_Layout.cshtml')
      .pipe(replace(/<link name="site" href=".*" rel="stylesheet" \/>/, '<link name="site" href="~/public/assets/css/site.css" rel="stylesheet" />'))
      .pipe(replace(/<script name="app" src=".*">/, '<script name="app" src="~/public/assets/js/app.js">'))
      .pipe(replace(/<script name="vendor" src=".*">/, '<script name="vendor" src="~/public/assets/libs/vendor.js">'))
      .pipe(replace(/<script name="templates" src=".*">/, '<script name="templates" src="~/public/assets/js/templates.js">'))
      .pipe(cachebust({ type: 'timestamp' }))
      .pipe(gulp.dest('./Views/Shared/'));
});