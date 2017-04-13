const gulp             = require("gulp");
const concat           = require("gulp-concat");
const plumber          = require("gulp-plumber");
const postcss          = require("gulp-postcss");
const rename           = require("gulp-rename");
const sass             = require("gulp-sass");
const babel            = require("gulp-babel");
const uglify           = require("gulp-uglify");
const autoprefixer     = require("autoprefixer");
const cssnano          = require("cssnano");
const postcssCalc      = require("postcss-calc");
const livereload       = require("gulp-livereload");


////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////
const wwwDev = "./";

// Watchable directories/files      ////////////////////////////////////////////
const watching   = {
    default: {
        scss: [
            "./scss/*.scss",
            "./scss/**/*.scss",
        ],
        js: [
            "./.internal/*.js",
            "./.internal/**/*.js",
        ]
    }
};

// Source file(s)       ////////////////////////////////////////////////////////
const source    = {
    default: {
        scss: [
            "./scss/index.scss"
        ],
        js: [
            "./.internal/helper.js",
            "./.internal/events.js",
        ]
    },
};


// Destination directory        ////////////////////////////////////////////////
const destination    = {
    default: {
        css:     wwwDev,
        js:      wwwDev
    }
};



////////////////////////////////////////////////////////////////////////////////
// Variables
////////////////////////////////////////////////////////////////////////////////

let app = "";
let cssName = "";
let jsName = "";

gulp.task("var:default",() => {
    app     = "default";
    cssName = "example";
    jsName  = "html-ratio-component";
});



////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////

gulp.task("scss->css", () => {
    const processors = [
        autoprefixer({browsers: ["last 3 versions"]})
    ];
    return gulp.src(source[app].scss)
        .pipe(plumber())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(processors))
        .pipe(rename(`${cssName}.css`))
        .pipe(gulp.dest(destination[app].css))
        .pipe(livereload())
});

gulp.task("watch:scss", () => {
    livereload.listen();
    gulp.watch(watching[app].scss,["scss->css"]);
});

gulp.task("minify:scss", () => {
    const processors = [
        autoprefixer({browsers: ["last 20 versions"]}),
        postcssCalc(),
        cssnano()
    ];


    return gulp.src(source[app].scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(processors))
        .pipe(concat(`${cssName}.min.css`))
        .pipe(gulp.dest(destination[app].css))
});


////////////////////////////////////////////////////////////////////////////////
// Javascript
////////////////////////////////////////////////////////////////////////////////

gulp.task("minify:js",() => {
    return gulp.src(source[app].js)
            .pipe(concat(`${jsName}.min.js`))
            .pipe(babel({
                presets: ["es2015"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest(destination[app].js))
});

gulp.task("move:js",() => {
    return gulp.src(source[app].js)
            .pipe(concat(`${jsName}.js`))
            .pipe(babel({
                presets: ["es2015"]
            }))
            .pipe(gulp.dest(destination[app].js))
});

gulp.task("watch:js",() => {
    gulp.watch(watching[app].js,["move:js"]);
});



////////////////////////////////////////////////////////////////////////////////
// Task Wrappers
////////////////////////////////////////////////////////////////////////////////

gulp.task("dev+css",    ["scss->css","watch:scss"                               ]);
gulp.task("dev+js",     ["move:js" , "watch:js"                                 ]);

gulp.task("build+css",    ["scss->css", "minify:scss"                           ]);
gulp.task("build+js",     ["move:js", "minify:js"                               ]);



////////////////////////////////////////////////////////////////////////////////
// Callable Tasks
////////////////////////////////////////////////////////////////////////////////

gulp.task("default", [  "var:default",
    "dev+js",
    "dev+css"
]);
gulp.task("build", [  "var:default",
    "build+js",
    "build+css"
]);