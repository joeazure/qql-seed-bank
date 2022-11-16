# qql-seed-db-app

This is my little project for rendering QQL images locally. It is based upon (and depends on) the 
qql-headless project released by the QQL project team - https://github.com/qql-art/qql-headless

This repository has a few different things going on (WIP = Work in Progress):

    - `scripts\bulk_render.js` is a node.js command line client for bulk-rendering QQL outputs
        for any given wallet address. You are optionally able to specify target traits you would
        like to render, or completely random.
    - (WIP) Functionality for storing the seeds, traits, etc into a mySQL database. I run a local database 
        so that I can easily search for seeds based on the traits and render data.
    - (WIP) A simple http web API for getting data from the afformentioned database. I use this for an 
        application I am writing.
    

## Installation

```
$ npm install
$ mkdir node_modules/webp-converter/temp
$ mkdir /tmp/qql-outputs
```

## Bulk Renderer

This is probably the reason youare reading this...

Usage:
    ```
    $ # Render 
    $ node scripts/bulk_render.js blah <output dir> "<wallet>" [named traits]
    ```

## Notes
* IN order to save disk space, the renders are saved as compressed "webp" files.  They have a '.webp' extension.  If you wish to save the output as PNG file as well, there is a line to un-comment in the scripts/bulk_render.py file.
* The temp directory in node_modules/webp-converter is just for temp files used by the webp-converter library (Iwill get around to removing this bit at some time)
* 