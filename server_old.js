#!/usr/local/bin/node

/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */

"use strict";

// ОПИСАНИЕ СКРИПТА

var CONF  = require('/r_m/nodejs/config.js').settings();
var fs    = require('fs');
var asc   = require(CONF.my_modules + 'asc.js');
var wf    = require(CONF.my_modules + 'wf.js');
var db    = require(CONF.my_modules + 'usedb.js');
var time  = require(CONF.my_modules + 'time.js');
var color = require(CONF.my_modules + 'color.js');
var head  = require(CONF.my_modules + 'head.js');
var err_trace = require(CONF.my_modules + 'err_trace.js');
var log = console.log;

// var Articles = require (CONF.oft_modules + 'Articles.js');


var fs     = require('fs');
var http   = require('http');

var fileTypes = {
  html : { folder: '', type: 'text/html'},
  // css  : { folder: '/stc', type: 'text/css'},
  js   : { folder: '', type: 'application/javascript'},
  // jpeg : { folder: '/stc', type: 'image/jpeg'},
  // png  : { folder: '/stc', type: 'image/png'},
};

var handler = function(req, res) {
  if (req.method !== 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end();
  } else {
    log(req.method, req.url);
    var pathname  = '',
        reStatEnd = /\.([a-z-]{2,4})$/,
        R         = req.url.match(reStatEnd);

    var is_React = /\/react\//.test(req.url),
        m_React  = req.url.match(reStatEnd);
    log(is_React);
    if (is_React && m_React[1]) {
      pathname = '/Start/ReactJS/'+req.url;
      give_static(pathname, 'application/javascript', req, res);
    } else if (R && R[1] && fileTypes[R[1]]) {
      pathname = __dirname + fileTypes[R[1]].folder + req.url;
      give_static(pathname, fileTypes[R[1]].type, req, res);
    } else {
      not_found(res);
    }
  }
};
require('http').createServer(handler).listen(3000);


function give_static (pathname, type, req, res) {
  if (/\.\.\//.test(req.url)) {
    not_found(res);
  } else {
    fs.stat(pathname, function(err, stats) {
      if (err) {
        not_found(res);
      } else if (stats.isFile()) {
        log('type = ', type);
        res.setHeader('Content-Type', type || 'text/plain');
        res.statusCode = 200;

        var file = fs.createReadStream(pathname);
        file.on('open', function() { file.pipe(res); });
        file.on('error', function(err) { file.pipe(err); });
      } else {
        not_found(res);
      }
    });
  }
}


function not_found (res) {
  res.writeHead(404);
  res.write('NOT FOUND!\n');
  res.end();
}
