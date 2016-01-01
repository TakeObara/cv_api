var gulp        = require('gulp');
var elixir      = require('laravel-elixir');
var requireDir  = require( 'require-dir' );

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
    // 2nd paramter, define watcher path
    mix.task('babel', 'resources/**/*.jsx');
    mix.sass('app.scss');
});
