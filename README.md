# Keep-Repl-Online
It keeps your repl in repl.it online forever
# Api
/ (POST) - Send a post request to the homepage with the url in Json format. Example : {"Url":"https://repl.co"} (CASE SENSTIVE)
RESPONSES:
error - There was an error
notrepl - The link you provided is not a repl.co link
ERR_ALREADY_ON_SYSTEM - The url is already on the database
success - The url has been added

