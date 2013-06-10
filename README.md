# Grunt Front-End Workflow/Boilerplate

## What is it? 

The Grunt Front-End Workflow/Boilerplate started as Backbone/RequireJS Multipage 
Boilerplate. Since its initial release, it has evolved into a structured, modular 
and test-driven front-end development & build workflow with Grunt task runner. 
It suggests certain tools and methodologies and includes some boilerplate code. 
See the related blog post: http://www.akikoo.org/log/2013/05/26/front-end-workflow-with-grunt/.

It supports both **SPA**s (single page applications) and more traditional multi-page 
setups, managing dependencies with **RequireJS** (http://requirejs.org/). 

For stylesheets, have a look at One Web Boilerplate (http://akikoo.github.io/one-web-boilerplate/) 
that uses **Sass** preprocessor (http://sass-lang.com/) and **Compass** 
(http://compass-style.org/), with **SMACSS** (Scalable and Modular Architecture 
for CSS, http://smacss.com/) and some **OOCSS** (Object-Oriented CSS, 
http://oocss.org/). You can just drop the whole /webroot/assets/scss directory from 
One Web Boilerplate into /www directory in Grunt Front-End Workflow and it will work.

The goal of this workflow is to support modularity and code reuse by organizing 
code into both common and page-specific packages. RequireJS setup is adapted from 
https://github.com/requirejs/example-multipage-shim.

Grunt is used for running specified tasks during development. It's also used for 
creating builds.

###Currently the following common tasks are included: 

* Compile modular html patterns (you can use variables and pass in data too), 
* Compile AMD based modules using RequireJS, 
* Watch/compile Sass/Compass modules into CSS, 
* Watch/lint CSS/JS code, 
* Optimize images, 
* Generate sharp vector icons to all devices, 
* Generate dynamic build headers 
* Generate YUIdoc documentation, and
* Run unit tests in different browsers.

##Environment setup 

You'll need the following tools to get the full advantages of this workflow:

###Ruby
On OS X, you'll already have Ruby installed. On Windows, see http://rubyinstaller.org/downloads/. 

###Sass and Compass

Make sure you have Ruby installed before this step.

Install Sass: http://sass-lang.com/tutorial.html.

Install Compass: http://compass-style.org/install/.

###Node.js
Install Node.js with npm (package manager for Node): http://nodejs.org/.

###Bower

Install Bower front-end package manager (http://bower.io/).

    npm install -g bower

Bower currently has some issues on Windows so you might want to skip the next step.
Packages that Bower installs are already included in this repository. 

However if Bower works in your environment you'll probably want to manage your 
front-end library packages with it. To do so (after installing bower globally), 
go to the project folder and install/update packages using the dependencies 
listed in the current directory's bower.json.

    bower install

###Grunt
See http://gruntjs.com/getting-started.

    npm uninstall -g grunt
    npm install -g grunt-cli

After installing grunt-cli (Grunt's command line interface) globally, go to the 
project folder and install grunt locally.

    npm install grunt

Now install all the dependencies (listed in package.json)

    npm install 

That's it. 

##Development

To start developing, go to the project folder in your terminal and run

    grunt 

Then go to http://localhost:9001/ to view your site. You can also access your 
local site from another device on the same LAN by using your IP address instead 
of `localhost`, for example http://10.0.0.32:9001/. Files are being observed 
for changes using livereload so you don't need to refresh the page manually. 
Stylesheets are generated from Sass files, and CSS and JavaScript files are linted.

##Build

To trigger the optimized build, go to the project folder and run 

    grunt dist 

This will run all the tasks again and copy the optimized files to `webroot-built` 
directory, ready for deployment. You also get YUIDoc documentation generated from 
your JavaScript files so remember to always comment your code ;).

For details about all the tasks and processes, see documentation in Gruntfile: 
https://github.com/akikoo/grunt-frontend-workflow/blob/master/Gruntfile.js, and 
other files.

Be sure to exclude `.sass-cache`, `node_modules` and `webroot-built` directories from version control.

I hope this framework is as useful to you as it is for me. Have fun! 