const express 		= require('express'),
	   app = express(),
	    morgan 		= require('morgan'),
	    path      	= require('path'),
	    bodyParser = require('body-parser');
	    // Router = require('./controllers/****'); // ADD WHEN DONE
var contentController = require('./controllers/content.js')
var db = require('./db/config.js');
var slackAPI = require('./controllers/slackapi.js');
var slackButton = require('./controllers/slackButton.js');


// CONFIG (USE) ============================
app.use( morgan('dev') );
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use('/',express.static('client/build'));
} else {
   app.use('/', express.static(path.join(__dirname, 'public')));
}

// LISTEN (SET) =============================
app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), function(){
	console.log('API Server started: http://localhost:' + app.get('port') + '/');
})

// ROUTING (GET) =============================
app.get('/api/content', contentController.get);
app.post('/api/addcontent', contentController.post);
app.post('/api/slack', slackAPI.post);
app.get('/slack', slackButton);
// Connect controller for endpoint
//app.use('/api/tasks', taskRouter)

app.get('*', (req, res) => {
	res.sendfile('./client/public/index.html');
})
