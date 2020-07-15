<p align="center"><a href="https://github.com/marcolinolucas/ecoleta-api" target="_blank" rel="noopener noreferrer"><img width="300" src="https://i.imgur.com/j6ueyfO.png" alt="Ecoleta logo"></a></p>

# ♻️ Ecoleta Server / API

## 🎙 Introduction

The idea of the application is join commerces that do especific recycling for
people who need to deposit some items.\
The application consists in a commerce register on the web, adding your name, photo,
location, contact and what items they recycle.\
In the other side, people can use a mobile app to find the commerces by filtering
the location and items. After that they can contact them using email or whatsapp.

## 🗒 Index

- [Technologies](#technologies)
- [How to start](#howToStart) 
- [Scripts explanation](#scriptsExplanation)
- [Learn with videos](#learnWithVideos)
- [Routes for API REST client](#routesForApiRestClient)
- [Future features](#futureFeatures)
- [Others application repositories](#othersApplicationRepositories)
- [Contact](#contact)
- [License](#license)

## 💻 Technologies <a name="technologies" />

| Name | Description |
|---------|-------------|
| [Node.js]          | JavaScript runtime built |
| [TypeScript]          | JavaScript language which add static type definitions |
| [Knex.js]             | SQL query builder |
| [SQLite3]             | Asynchronous, non-blocking SQLite3 |
| [Express]          | Web application framework |
| [Celebrate]             | Express middleware with joi validation |
| [Multer]                | Middleware for handling multipart/form-data |
| [Cors]                | Enable CORS with various options |
| [Jest]          | JavaScript testing solution |
| [SuperTest]          | HTTP assertions for tests |
| [Cross-env]          | Use environment variables across platforms |
| [Babel]          | JavaScript transcompiler |
| [Eslint]          | Identify and reports patterns |

[Node.js]: https://nodejs.org
[TypeScript]: https://www.typescriptlang.org
[Knex.js]: http://knexjs.org
[SQLite3]: https://github.com/mapbox/node-sqlite3
[Express]: https://github.com/expressjs/express
[Celebrate]: https://github.com/arb/celebrate
[Multer]: https://github.com/expressjs/multer
[Cors]: https://github.com/expressjs/cors
[Jest]: https://github.com/facebook/jest
[SuperTest]: https://github.com/visionmedia/supertest
[Cross-env]: https://github.com/kentcdodds/cross-env
[Babel]: https://babeljs.io/
[Eslint]: https://github.com/eslint/eslint


## 🚀 How to Start <a name="howToStart" />

First you need to [clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) or [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository.

With the code in your machine, you'll open the terminal and will install all dependencies.

``` npm i ```

After that you'll need to create the database and insert initial data.

``` npm run knex:migrate ```\
``` npm run knex:seed ```

The last thing you'll need to do is start the server.

``` npm run dev ```

Now all is working. Congratulations!

## 🔧 Scripts explanation <a name="scriptsExplanation" />

| Script | Description |
|---------|-------------|
| ``` npm run build ```             | Convert and build all application |
| ``` npm run start ```             | Start the server for production |
| ``` npm run dev ```             | Start the server for development |
| ``` npm run knex:migrate ```             | Create and update the database |
| ``` npm run knex:seed ```             | Insert initial data in database |
| ``` npm run lint ```             | Verify patterns and fix code |

## 🎥 Learn with videos <a name="learnWithVideos" />

To check out the videos and download files, I uploaded in my Google Drive, visit [NLW 1](https://drive.google.com/drive/folders/1gBQrXv8wjhn08GkfW4ZjtWkn0nPm-K3c?usp=sharing).

## 🛣️ Routes for API REST client <a name="routesForApiRestClient" />

If you are using [Insomnia](https://insomnia.rest/) or another REST API Client, you can download all routes [here](https://drive.google.com/file/d/1cgdLVAxMSiGwsb7brSMUxvbvlmB7AxOH/view?usp=sharing).

## 💡 Future features <a name="futureFeatures" />

- ~~Make CRUD for Points~~
- ~~Make CRUD for Items~~
- TDD for all files
- ~~Filter in Multer to only accept images~~

## 🗃 Others application repositories <a name="othersApplicationRepositories" />

- [Web](https://github.com/marcolinolucas/ecoleta-web)
- [Mobile](https://github.com/marcolinolucas/ecoleta-mobile)

## 📞 Contact <a name="contact" />

- [GitHub](https://github.com/marcolinolucas)
- [LinkedIn](https://www.linkedin.com/in/lucas-marcolino)

## 📔 License <a name="license" />

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020, Lucas Marcolino.
