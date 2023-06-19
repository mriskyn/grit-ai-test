# Grit Library API

### Requirements
- Nodejs 18.16
- Mysql 8.0.33
- Postman (for API testing)

### Pre-requesited
- Install `sequelize-cli` globally
```bash
$ npm install -g sequelize-cli
```
- Create `.env` and fill the values
```bash
$ cp .env.example .env
```
- Create DB
```bash
$ sequelize db:create
```
- Seed DB
```bash
$ sequelize db:seed:all
```

Note: 
- after seeding, you can access admin credential with following data:
```json
{
  "email": "admin@mail.com",
  "password": "Admin123"
}
```
- No need to migrate because we use `sequelize.sync()` to auto migrate when connecting to db

### Getting started
- Run the program
```bash
$ node index.js
```

### API Documentation
- Postman API Collection [click here](https://github.com/mriskyn/grit-ai-test/blob/master/docs/Grit_Library_Collection.postman_collection.json)
- Postman Environment [click here](https://github.com/mriskyn/grit-ai-test/blob/master/docs/Grit_Environment.postman_environment.json)

Note: make sure to set token after login to access Library and Transaction endpoints

### References
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/)
- [Mysql](https://www.mysql.com/)
- [Stackoverflow](https://stackoverflow.com/)