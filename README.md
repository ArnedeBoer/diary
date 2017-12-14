# Diary

This app allows you to create records for each day, person and location. The people and locations can be referenced in the records of the day, which can be filtered based on date, people and locations. This allows you to for example quickly find the day on which you met X at location Y.

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
