// prevent notification
process.env.DISABLE_NOTIFIER = true;

var gulp        = require('gulp');
var elixir      = require('laravel-elixir');
var requireDir  = require( 'require-dir' );
// var browserify  = require('laravel-elixir-browserify');

// Require all tasks.
requireDir( './resources/gulp', { recurse: true } );

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    // browserify.init();
    elixir.config.sourcemaps = true;
    elixir.config.assetsPath = "resources";
    elixir.config.js.folder = "react";
    elixir.config.js.outputFolder = 'dist';
    elixir.config.js.browserify.options.paths = [__dirname + '/node_modules', __dirname + '/resources/react'];
    elixir.config.js.browserify.transformers = [{
        name: 'babelify',
        options: {
            presets: ['es2015','react'],
        }
    }];
 
    mix.browserify("app.js");


    // 2nd paramter, define watcher path
    // mix.task('babel', 'resources/**/*.jsx');
    mix.sass('app.scss');
});
