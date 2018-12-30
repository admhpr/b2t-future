// Gulp.js configuration
var // modules
    gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require("gulp-concat"),
    deporder = require("gulp-deporder"),
    uglify = require("gulp-uglify"),
    scss = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    assets = require("postcss-assets"),
    autoprefixer = require("autoprefixer"),
    mqpacker = require("css-mqpacker"),
    cssnano = require("cssnano"),
    babel = require("gulp-babel");
var pipeline = require('readable-stream').pipeline;

// development mode?
devBuild = false;
// folders
folder = {
    src: "src/",
    build: "assets/"
};

// image processing
gulp.task("img", function () {
    var out = folder.build + "img/";
    return gulp
        .src(folder.src + "img/**/*")
        .pipe(newer(out))
        .pipe(
            imagemin({
                optimizationLevel: 5
            })
        )
        .pipe(gulp.dest(out));
});

// JavaScript processing //change vars to reflect folders
gulp.task("js", function () {
    return pipeline(gulp.src(folder.src + 'js/*.js'),
        sourcemaps.init(),
        concat('index.min.js'),
        sourcemaps.write(),
        babel({
            presets: ['@babel/preset-env']
        }),
        uglify(),
        gulp.dest(folder.build + 'js/'));
});

// CSS processing // Sass
gulp.task("css", gulp.series('img',
    function () {
        var postCssOpts = [
            assets({
                loadPaths: ["img/"]
            }),
            autoprefixer({
                browsers: ["last 2 versions", "> 2%"]
            }),
            mqpacker
        ];

        if (!devBuild) {
            postCssOpts.push(cssnano);
        }

        return gulp
            .src(folder.src + "scss/*")
            .pipe(
                scss({
                    outputStyle: "nested",
                    includePaths: [folder.src + "/scss/partials/**"],
                    imagePath: "img/",
                    precision: 3,
                    errLogToConsole: true
                })
            )
            .pipe(concat("styles.css"))
            .pipe(postcss(postCssOpts))
            .pipe(gulp.dest(folder.build + "css/"));
    }));

// run all tasks
gulp.task("run", gulp.series("css", "js"));

// watch for changes
gulp.task("watch", function () {
    // image changes
    gulp.watch(folder.src + "img/**/*", gulp.series("img"));

    // javascript changes
    gulp.watch(folder.src + "js/**/*", gulp.series("js"));

    // css changes
    gulp.watch(folder.src + "scss/**/*", gulp.series("css"));
});

// default task
gulp.task("default", gulp.series("run", "watch"));