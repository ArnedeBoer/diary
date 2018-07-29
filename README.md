# Diary

This app allows you to create records for each day, and records for relating attributes (defaults: people, locations). The recorded days can be filtered back on dates and their relations. For example: Show me all diary entries after date 01-01-2018 when I've met Bob and when I've visited The Prancing Pony.

## Background

I'm currently enrolled in a coding bootcamp at the New York Code and Design academy which is a 12-week intensive course. This project was created for the final assignment.

## Getting Started

To set up the diary app, follow the instructions below.

### Prerequisites

You need a database. The credentials should be configured in a config.json file at /server/config. Also see the example file.

### Installing

Install the modules

```
$ npm install
```

Run build

```
$ npm run build
```

Start the server

```
$ npm start
```

Optionally fill the database with initial data

```
$ sequelize db:seed:all
```
