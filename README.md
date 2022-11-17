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

## MySQL Database

If you wish to try storing seeds, traits, etc into a database as you render outputs, the schema create script
is located in the file: database/qql_seed-db.sql file. It assumes a database named "qql". 

Database connection parameters used by the database models are located in "config/config.json".

## Bulk Renderer

This is probably the reason youare reading this...

Usage:

```
$ node scripts/bulk_render.js -h

$ # Render 5 outputs into <dir> using wallet <address>
$ node scripts/bulk_render.js --output <dir> --wallet <address> 5

# Render 5 outputs into /Volumes/G-RAID1/qql-outputs/render12 with traits from ./traits/qql_109.json
#   storing seeds into the database tagged with host StudioUltra
$ node ./scripts/bulk_render.js --output /Volumes/G-RAID1/qql-outputs/render12 --wallet 0xED884d09749a358B31B384876C086c4bd8890287 --traits qql_109 --render_host StudioUltra --use_db true 5
```

### Palette Override

One fun feature I added is the ability to "override" the paleete specified in the supplied traits json file.  To use this:
```
$ node ./scripts/bulk_render.js --output /Volumes/G-RAID1/qql-outputs/render12 --wallet 0xED884d09749a358B31B384876C086c4bd8890287 --traits qql_93 --palette_override Seattle 5
```

The value is the name of a valid QQL palette or the work "random" - which will randomize the palette for each seed.

## Notes
* IN order to save disk space, the renders are saved as compressed "webp" files.  They have a '.webp' extension.  If you wish to save the output as PNG file as well, there is a line to un-comment in the scripts/bulk_render.py file.
* The temp directory in node_modules/webp-converter is just for temp files used by the webp-converter library (Iwill get around to removing this bit at some time)
* The output filenames stored in the DB are for the PNG files that are not actually stored by default. Append '.webp' to that filename for the version stored by default.

### Thank You
* Tyler Hobbs and Dandelion Wist for QQL and qql-headless
* https://github.com/Codonyat for the idea to use json files for trait settings
