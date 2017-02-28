#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Configstore = require('configstore');
const figlet = require('figlet');
const chalk = require('chalk');

const mdTerminal = require('./terminal-markdown');

function logEachAnnouncement(announcements) {
    announcements.forEach(announcement => {
        console.log('');
        const announcementPath = path.relative(process.cwd(), path.join('announcements', announcement));
        mdTerminal(fs.readFileSync(announcementPath).toString());
    });
}

function logAnnouncements(announcements) {
    if (announcements.length == 0) {
        return;
    }
    const singular = announcements.length === 1;
    figlet((singular ? 'Announcement' : 'Announcements'), {font: 'big'}, (err, data) => {
        console.log(chalk.blue(data));
        mdTerminal(`_There ${(singular ? 'has' : 'have')} been ${newAnnouncements.length} new ${(singular ? 'announcement' : 'announcements')} since you last installed ${pkg.name}_`);
        logEachAnnouncement(announcements);
    });
}

const announcementsFolder = path.relative(process.cwd(), 'announcements');
const pkg = require(path.join(process.cwd(), './package.json'));
const announcements = fs.readdirSync(announcementsFolder);


const conf = new Configstore(`${pkg.name}-psa`, {
    firstRun: true,
    seenAnnouncements: [],
});

let newAnnouncements = [];

announcements.forEach((announcement) => {
    if (conf.get('seenAnnouncements').indexOf(announcement) === -1) {
        newAnnouncements.push(announcement);
    }
});

conf.set('seenAnnouncements', announcements);

if (conf.get('firstRun')) {
    conf.set('firstRun', false);
    return;
}

logAnnouncements(newAnnouncements);
