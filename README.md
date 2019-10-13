# Keep-Repl-Online
It keeps your repl in repl.it online forever
# Api
/ (POST) - Send a post request to the homepage with the url in Json format. Example : {"Url":"https://repl.co"} (CASE SENSTIVE)\n
RESPONSES:\n
error - There was an error\n
notrepl - The link you provided is not a repl.co link\n
ERR_ALREADY_ON_SYSTEM - The url is already on the database\n
success - The url has been added\n

