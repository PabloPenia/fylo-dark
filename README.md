# Fylo Dark Landing Page

![Fylo Dark desktop preview](https://raw.githubusercontent.com/PabloPenia/fylo-dark/master/src/design/desktop-preview.jpg)

Simple landing page for **Web Storage Service** . Made with Pugjs and Dart-Sass.
Design and images from (Frontend Mentor)[https://www.frontendmentor.io/challenges/fylo-dark-theme-landing-page-5ca5f2d21e82137ec91a50fd]

**(DEMO)[https://pablopenia.github.io/fylo-dark/]**

## Build

**Clone** `git clone https://github.com/PabloPenia/fylo-dark.git`
**Install dependencies** Requires (nodejs)[https://nodejs.org]) and (npm)[https://npmjs.com]
Run: `npm ci`
**Build** run `npm build` (builds to /dist/index.html)

### More Tasks / Scripts

`gulp` and `npm start` - Build everything and start watching changes.
`gulp themeBuilder` - Build styles
`gulp pageBuilder` - Build html
`gulp watcher` - Watch changes
`gulp copyyAssets` - Copy/update images from './src/images' to './dist/assets/images'

### Dependencies

- gulp 5
- gulp-plumber
- gulp-postcss
- gulp-pug,
- gulp-rename
- gulp-sass
- gulp-sourcemaps
- @babel/core
- @babel/preset-env
- @babel/register
- autoprefixer
- cssnano
- postcss-normalize
- sass
