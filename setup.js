#!/usr/bin/env node
/**
 *    Copyright (C) 2015 Deco Software Inc.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

var path = require('path')
var exec = require('child_process').exec

var web     = path.join(__dirname, './web')
var desktop = path.join(__dirname, './desktop')
var shared  = path.join(__dirname, './shared')

var onExit = function(child) {
  if (child && !child.killed) {
    child.stdout.on('data', function(data) {
      console.log(data);
    });
    child.stderr.on('data', function(data) {
      console.log(data);
    });
    child.on('close', function(code) {
      console.log('closing code: ' + code);
    });
    child.kill() 
  }
}

// Web
var child = exec('npm install', { cwd: web })
process.on('exit', onExit.bind(this, child))

var child = exec('bundle install', { cwd: web })
process.on('exit', onExit.bind(this, child))

// Desktop
var child = exec('npm install', { cwd: desktop })
process.on('exit', onExit.bind(this, child))

var child = exec('npm run copy libs', { cwd: desktop })
process.on('exit', onExit.bind(this, child))

// Shared
var child = exec('npm install', { cwd: shared })
process.on('exit', onExit.bind(this, child))