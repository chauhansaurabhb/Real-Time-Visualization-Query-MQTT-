var http = require('http');
var fs = require('fs');
var port = 8686;
var i=0;
var j=0;
var currentmiliseconds;

var mqtt=require('mqtt');
var client=mqtt.connect('mqtt://test.mosquitto.org:1883');

client.subscribe('tempMeasurement');
client.on('message',function(topic,payload){
	if(topic.toString()=="tempMeasurement"){
	var data =payload.toString('utf8',7);
	var temp=JSON.parse(data);
	
	//Connection to mysql
	var mysql=require('mysql');	
	var connection=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'root',
		database:'feedback',
		port:3306	
	});	
	var query=connection.query(			
		"INSERT INTO date (tempvalue, unitofMeasurement, timestamp) VALUES(?,?,?)", 
    [temp.tempValue, temp.unitOfMeasurement,new Date().getTime()], 
			function(err,result,fields){
				if(err) throw err;
				console.log("Data Inserted into Database");
				connection.end();
				//getData(res,temp);
				//connection.end();
			});
	}  
	});



// 404 response
function send404Response(response){
	response.writeHead(404,{"Content-Type": "text/plain" });
	response.write("Error 404: Page not found");
	response.end();
}

// handle the user request..

http.createServer(function(req, res) {
	console.log('New incoming client request for ' + req.url);
	
	res.writeHeader(200, {'Content-Type' : 'application/json'});	
	 
	switch (req.url) {
	
	case '/temperatureData':
		var mysql=require('mysql');
		
		currentmiliseconds=((new Date().getTime())-1000000);
		
		var connection=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'root',
			database:'feedback',
			port:3306	
		});
		
		var query=connection.query(			
			
				'SELECT *  FROM date WHERE TIMESTAMP > '+currentmiliseconds,function(err,result,fields){
					if(err) throw err;
					//console.log(result);
					var temp=result[i].tempvalue;
					console.log('Temperature:', result[i].tempvalue );
					res.write('{"value" :' +temp + '}');
					i++;
				    res.end();
					connection.end();
					//getData(res,temp);
					//connection.end();
				});
			break;
			
	case '/temperature':	
		res.writeHead(200, 'text/html');	
		var fileStream = fs.createReadStream('index.html');
		fileStream.pipe(res);
		break;	
	default:
	      send404Response(res);		
	}
}).listen(port);



/*function getData(res,temp){
	var mysql=require('mysql');
	var connection=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'root',
		database:'feedback',
		port:3306	
	});
	
	var query=connection.query(
			'SELECT * FROM DEMO3',function(err,result,fields){
				if(err) throw err;
				console.log('Light:', result[j].value );
				res.write('{"value" :' +temp + ',"value1":' + result[j].value + '}');
				j++;
				res.end();
				connection.end();
				
			});
	
}*/
console.log('Server listening on http://localhost:' + port);