import { src, dest, watch, series, parallel } from 'gulp'
import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cssnano from 'cssnano'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import postcssNormalize from 'postcss-normalize'
import pug from 'gulp-pug'
import { init, write } from 'gulp-sourcemaps'
import rename from 'gulp-rename'
const sass = gulpSass(dartSass)

const paths = {
	assets: {
		src: './src/images/**/*',
		dest: './dist/assets/images/',
	},
	svg: './src/svg/**/*.svg',
	theme: {
		src: './src/theme/**/*.{scss,sass}',
		dest: './dist/assets/',
	},
	template: {
		src: './src/template/!(_)*.pug',
		dest: './dist/',
		watch: './src/template/**/*.pug',
	},
	dist: './dist/',
}
const startServer = () =>
	browserSync.init({
		server: {
			baseDir: `${paths.dist}`,
		},
	})
function pageBuilder() {
	return src(paths.template.src)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(dest(paths.template.dest))
		.pipe(browserSync.reload({ stream: true }))
}

const copyAssets = () => src(paths.assets.src).pipe(dest(paths.assets.dest))

function themeBuilder() {
	const plugins = [postcssNormalize(), autoprefixer(), cssnano()]
	return src(paths.theme.src)
		.pipe(init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(rename({ suffix: '.min' }))
		.pipe(write('.'))
		.pipe(dest(paths.theme.dest))
		.pipe(browserSync.reload({ stream: true }))
}

const watchSvg = () => watch(paths.svg, pageBuilder)
const watchAssets = () =>
	watch(paths.assets.src, series(copyAssets, pageBuilder))
const watchStyles = () => watch(paths.theme.src, themeBuilder)
const watchViews = () => watch(paths.template.watch, pageBuilder)

const watchTask = parallel(
	startServer,
	watchSvg,
	watchAssets,
	watchStyles,
	watchViews
)
const buildTask = parallel(copyAssets, pageBuilder, themeBuilder)

exports.build = buildTask
exports.default = series(buildTask, watchTask)
