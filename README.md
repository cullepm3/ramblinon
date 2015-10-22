ramblinon
=========

Old sample project for 2012 NCAA Tourney

Deployed here: https://intense-river-9838.herokuapp.com/

DB Setup
  The seeds stuff doesn't work.
  db/private/ramblinon_development.dump

http://stackoverflow.com/questions/4581727/convert-sqlite-sql-dump-file-to-postgresql
https://devcenter.heroku.com/articles/heroku-postgres-import-export
heroku pg:backups restore 'http://ramblinonpromotions.com/ramblinon_development.dump' DATABASE_URL

Heroku
git push heroku master
heroku open
heroku run rake db:migrate