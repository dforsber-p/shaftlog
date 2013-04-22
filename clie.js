#!/usr/bin/node
"use strict";

require('streamline').register({
//    fibers: true,
    cache: true,
    verbose: false
});

var program = require('commander');
program
    .version('0.0.1')
    .option('-b, --base <path>', 'treat base as filesystem root')
    .option('-d, --debug', 'enable debugging')
    .option('-f, --config <path>', 'path to configuration file')
    .option('-o, --one-shot', 'run log synchronization in one shot mode')
    .parse(process.argv);

var client = require('./client');

var CONFIG_PATH = '/etc/shaftlog-client-config.yaml';

require('js-yaml')
var config = require(program.config || CONFIG_PATH);
// XXX: validate config

var sc = new client.SyncClient(config);
sc.start();
