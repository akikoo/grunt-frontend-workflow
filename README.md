# Backbone/RequireJS Multipage Boilerplate 

## What is it? 

The Backbone/RequireJS Multipage Boilerplate is a modular framework for developing 
websites with Grunt task runner. It supports both **SPA**s (single page applications) 
and more traditional multi-page setups, managing dependencies with **RequireJS** 
(http://requirejs.org/). 

For stylesheets, have a look at One Web Boilerplate (http://akikoo.github.io/one-web-boilerplate/) 
that uses **Sass** preprocessor (http://sass-lang.com/) and **Compass** 
(http://compass-style.org/), with **SMACSS** (Scalable and Modular Architecture 
for CSS, http://smacss.com/) methodology and some **OOCSS** (Object-Oriented CSS, 
http://oocss.org/). 

The goal of this boilerplate is to support modularity and code reuse by organizing 
code into both common and page-specific packages. RequireJS setup is adapted from 
https://github.com/requirejs/example-multipage-shim.

Grunt is used for running specified tasks during development. To simply optimize 
the files without using Grunt, go to the project folder and run:

    node tools/r.js -o tools/build.js

##Environment setup 

You'll need the following tools to get the full advantages of this framework:

###Ruby
On OS X, you'll already have Ruby installed. On Windows, see http://rubyinstaller.org/downloads/. 

###Sass and Compass
For installing Sass, see http://sass-lang.com/tutorial.html. For installing Compass, 
see http://compass-style.org/install/. 

###Node.js
Install Node.js with npm (http://nodejs.org/).

###Grunt
http://gruntjs.com/getting-started

After installing grunt-cli, go to the project folder and install grunt locally. 

    npm install grunt

Now install all the dependencies

    npm install 

That's it. To start developing, simply run 

    grunt

and go to http://localhost:9001/ to view your site. Files are being observed for 
changes using livereload so you don't need to refresh the browser after saving 
changes. To run the optimized build, run 

    grunt dist

For more information about the tasks, see documentation in Gruntfile: 
https://github.com/akikoo/backbone-requirejs-multipage-boilerplate/blob/master/Gruntfile.js