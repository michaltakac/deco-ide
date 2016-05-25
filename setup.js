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
var setupProcess = require('child_process')

var web     = path.join(__dirname, './web')
var desktop = path.join(__dirname, './desktop')
var shared  = path.join(__dirname, './shared')

// Web
setupProcess.spawn('npm', ['install'], { cwd: web, stdio: 'inherit' })
  .on('exit', function (error) {
    if(!error){
      console.log('> /web > node_modules install completed.');
    }
  })

setupProcess.spawn('bundle', ['install'], { cwd: web, stdio: 'inherit' })
  .on('exit', function (error) {
    if(!error){
      console.log('Web bundle created successfully!');
    }
  })

// Desktop
setupProcess.spawn('npm', ['install'], { cwd: desktop, stdio: 'inherit' })
  .on('exit', function (error) {
    if(!error){
      console.log('> /desktop > node_modules install completed.');
    }
  })

setupProcess.spawn('npm', ['run', 'copy-libs'], { cwd: desktop, stdio: 'inherit' })
  .on('exit', function (error) {
    if(!error){
      console.log('Desktop bundle created successfully!');
    }
  })

// Shared
setupProcess.spawn('npm', ['install'], { cwd: shared, stdio: 'inherit' })
  .on('exit', function (error) {
    if(!error){
      console.log('Shared bundle created successfully!');
    }
  })