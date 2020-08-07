# Leeds-TechNews

### Available Scripts

Create development and test databases locally:
`npm run setup-dbs`

Create a new migration file:
`npm run migrate-make <filename>`

Run all migrations:
`npm run migrate-latest`

Rollback all migrations:
`npm run migrate-rollback`

Run tests:
`npm test`

Rollback, migrate -> latest, then start inserting data into the database:
`npm run seed`

Run the server with nodemon, for hot reload:
`npm run dev`

Run the server with node:
`npm start`