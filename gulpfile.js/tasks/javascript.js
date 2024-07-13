var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    minify = require('gulp-minify'),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    vars = require('../variables'),
    cached = require('gulp-cached');

// compile and concate js
const compileJs = function () {

    const baseAssets = vars.getBaseAssetsPath();
    const out = vars.getDistAssetsPath() + "js/";

    gulp
        .src([
            baseAssets + "js/layout.js",
            baseAssets + "js/app.js"
        ])
        .pipe(cached('js'))
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(minify({ noSource: true,  ext: { min: '.min.js' } }))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(out))

    return gulp
        .src([baseAssets + "js/**/*.js", '!' + baseAssets + "js/app.js", '!' + baseAssets + "js/layout.js"])
        .pipe(cached('js'))
        .pipe(minify({ noSource: true,  ext: { min: '.min.js' } }))
        .pipe(gulp.dest(out))

}

gulp.task(compileJs);