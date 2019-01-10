// need to add verification token and facebook page token to heroku via 'config'
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'your_token') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i]
		sender = event.sender.id
		if (event.message && event.message.text) {
            text = event.message.text
            //if text received was Schedule
			if (text === 'Monday' || text === 'monday' || text === 'Mon' || text === 'mon') {
				sendMondayCourses(sender)
				continue
            } else if (text === 'Tuesday' || text === 'tuesday' || text === 'Tue' || text === 'tue'){
                sendTuesdayCourses(sender)
                continue
            } else if (text === 'Wednesday' || text === 'wednesday' || text === 'Wed' || text === 'wed'){
                sendWedCourses(sender)
                continue
            } else if (text === 'Thursday' || text === 'thursday' || text === 'Thu' || text === 'thu'){
                sendThuCourses(sender)
                continue
            } else if (text === 'Friday' || text === 'friday' || text === 'Fri' || text === 'fri'){
                sendFriCourses(sender)
                continue
            } else if (text === '221'){
                send221Info(sender)
                continue
            } else if (text === '231'){
                send231Info(sender)
                continue
            } else if (text === '243'){
                send243Info(sender)
                continue
            } else if (text === '216'){
                send216Info(sender)
                continue
            } else if (text === '297'){
                send297Info(sender)
                continue
            }
            //if sent a random text
			sendTextMessage(sender, "Hi, what day is today?")
        }
        //if user pressed the postback button
		if (event.postback) {
            handlePostback(sender, event.postback)
            //text = JSON.stringify(event.postback)
			//sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
			continue
		}
	}
	res.sendStatus(200)
})

var token = "Token generated for your Facebook page"

function sendTextMessage(sender, text) {
	messageData = {
		text:text
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

/* Functions to reply user */
function sendMondayCourses(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Monday",
					"subtitle": "first half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "postback",
                        "title": "9:00 - 10:00 am",
                        "payload": "mon 9 to 10",
					}, {
						"type": "postback",
						"title": "11:00 - 12:00 am",
						"payload": "mon 11 to 12",
					}],
				}, {
					"title": "Monday",
					"subtitle": "second half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "1:00 - 4:00 pm",
						"payload": "mon 1 to 4",
					}, {
                        "type": "postback",
                        "title": "4:00 - 6:00 pm",
                        "payload": "mon 4 to 6",
                    }],
				}]
			}
		}
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		} else {
            console.log('message sent!')
        }
	})
}

function sendTuesdayCourses(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Tuesday",
					"subtitle": "first half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "postback",
                        "title": "9:00 - 12:00 am",
                        "payload": "tue 9 to 12",
					}, {
						"type": "postback",
						"title": "1:00 - 2:00 pm",
						"payload": "tue 1 to 2",
					}, {
                        "type": "postback",
						"title": "2:00 - 3:00 pm",
						"payload": "tue 2 to 3",
                    }],
				}, {
					"title": "Tuesday",
					"subtitle": "second half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "3:00 - 4:00 pm",
						"payload": "tue 3 to 4",
					}, {
                        "type": "postback",
                        "title": "4:00 - 6:00 pm",
                        "payload": "tue 4 to 6",
                    }],
				}]
			}
		}
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		} else {
            console.log('message sent!')
        }
	})
}

function sendWedCourses(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Wednesday",
					"subtitle": "first half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "postback",
                        "title": "11:00 - 12:00 am",
                        "payload": "wed 11 to 12",
					}, {
						"type": "postback",
						"title": "1:00 - 3:00 pm",
						"payload": "wed 1 to 3",
					}],
				}, {
					"title": "Wednesday",
					"subtitle": "second half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "3:00 - 5:00 pm",
						"payload": "wed 3 to 5",
					}],
				}]
			}
		}
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		} else {
            console.log('message sent!')
        }
	})
}

function sendThuCourses(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Thursday",
					"subtitle": "first half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "postback",
                        "title": "9:00 - 11:00 am",
                        "payload": "thu 9 to 11",
					}, {
						"type": "postback",
						"title": "11:00 - 12:00 pm",
						"payload": "thu 11 to 12",
					}, {
                        "type": "postback",
						"title": "1:00 - 2:00 pm",
						"payload": "thu 1 to 2",
                    }],
				}, {
					"title": "Thursday",
					"subtitle": "second half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "2:00 - 3:00 pm",
						"payload": "thu 2 to 3",
					}, {
                        "type": "postback",
                        "title": "3:00 - 4:00 pm",
                        "payload": "thu 3 to 4",
                    }, {
						"type": "postback",
						"title": "4:00 - 6:00 pm",
						"payload": "thu 4 to 6",
					}],
				}]
			}
		}
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		} else {
            console.log('message sent!')
        }
	})
}

function sendFriCourses(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Friday",
					"subtitle": "first half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "postback",
                        "title": "9:00 - 11:00 am",
                        "payload": "fri 9 to 11",
					}, {
						"type": "postback",
						"title": "11:00 - 12:00 pm",
						"payload": "fri 11 to 12",
					}],
				}, {
					"title": "Friday",
					"subtitle": "second half: ",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "1:00 - 2:00 pm",
						"payload": "fri 1 to 2",
					}, {
                        "type": "postback",
                        "title": "2:00 - 3:00 pm",
                        "payload": "fri 2 to 3",
                    }, {
						"type": "postback",
						"title": "3:00 - 4:00 pm",
						"payload": "fri 3 to 4",
					}],
				}]
			}
		}
	}
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		} else {
            console.log('message sent!')
        }
	})
}

//functions to send course info
function send216Info(sender){
    messageData = {"text": "Lec03 at SF1101: Tue, Thu, Fri 2-3 pm\nTut05 at SF3201: Fri 9-11 am\nLab05 at SF1013: Wed 3-5 pm"}
    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
function send221Info(sender){
    messageData = {"text": "Lec03 at MC254: Mon, Wed, Fri 11-12 am\nTut05 at BA1180: Wed 1-3 pm\nLab05 at GB251/SF2102: Thu 4-6 pm"}
    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
function send231Info(sender){
    messageData = {"text": "Lec03 at MC252: Tue, Thu, Fri 1-2 pm\nTut06 at BA1180: Wed 1-3 pm\nLab05 at GB341: Tue 9-12 am"}
    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
function send243Info(sender){
    messageData = {"text": "Lec03 at SF1105: Tue, Thu, Fri 3-4 pm\nLab05 at BA31x5: Mon 1-4 pm"}
    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
function send297Info(sender){
    messageData = {"text": "Lab06 at SF2204/2102 GB251/243: Thu 9-11 am"}
    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}
//function to handle postback for days
function handlePostback(sender, received_postback){
    console.log('ok')
    let response;
    let payload = received_postback.payload;

    switch (payload) {
        case "mon 9 to 10": response = {"text": "Lec: 297 Communication & Design\nWhere: MY 150"};
                            break;
        case "mon 11 to 12": response = {"text": "Lec03: 221 Elec & Mag\nWhere: MC 254\nProf: Sean Hum"};
                            break;
        case "mon 1 to 4": response = {"text": "Lab05: 243 Computer Org\nProf: \nWhere: BA 31xx"};
                            break;
        case "mon 4 to 6": response = {"text": "Tut06: 297 Communication & Design\nWhere: BA 1220"};
                            break;
        case "tue 9 to 12": response = {"text": "Biweekly\nLab05: 231 Electronics\nWhere: GB 341"};
                            break;
        case "tue 1 to 2": response = {"text": "Lec03: 231 Electronics\nWhere: MC 252\nProf: Belinda Wang"};
                            break;
        case "tue 2 to 3": response = {"text": "Lec03: 216 Signals & Systems\nWhere: SF 1101\nProf: "};
                            break;
        case "tue 3 to 4": response = {"text": "Lec03: 243 Computer org\nWhere: SF 1105\nProf: "};
                            break;
        case "tue 4 to 6": response = {"text": "Tut06: 231 Electronics\nWhere: BA 1180"};
                            break;
        case "wed 11 to 12": response = {"text": "Lec03: 221 Elec & Mag\nWhere: MC 254\nProf: Sean Hum"};
                            break;
        case "wed 1 to 3": response = {"text": "Tut05: 221 Elec & Mag\nWhere: BA 1180\n"};
                            break; 
        case "wed 3 to 5": response = {"text": "Biweekly\nLab05: 216 Signals & Systems\nWhere: SF 1013\n"};
                            break; 
        case "thu 9 to 11": response = {"text": "Lab06: 297 Communication & Design\nWhere: \n"};
                            break;                            
        case "thu 11 to 12": response = {"text": "Lec: 297 \nWhere: MY 150\n"};
                            break; 
        case "thu 1 to 2": response = {"text": "Lec03: 231 Electronics\nWhere: MC 252\nProf: Belinda Wang"};
                            break; 
        case "thu 2 to 3": response = {"text": "Lec03: 216 Signals & Systems\nWhere: SF 1101\nProf:"};
                            break;
        case "thu 3 to 4": response = {"text": "Lec03: 243 Computer org\nWhere: SF 1105\nProf: "};
                            break;
        case "thu 4 to 6": response = {"text": "Biweekly\nLab05: 221 Elec & Mag\nWhere: SF 2102/GB251\n"};
                            break;
        case "fri 9 to 11": response = {"text": "Tut05: 216 Signals & Systems\nWhere: SF 3201\n"}
                            break;
        case "fri 11 to 12": response = {"text": "Lec03: 221 Elec & Mag\nWhere: MC 254\nProf: Sean Hum"};
                            break;
                            case "thu 1 to 2": response = {"text": "Lec03: 231 Electronics\nWhere: MC 252\nProf: Belinda Wang"};
                            break; 
        case "fri 1 to 2": response = {"text": "Lec03: 231 Electronics\nWhere: MC 252\nProf: Belinda Wang"};
                            break; 
        case "fri 2 to 3": response = {"text": "Lec03: 216 Signals & Systems\nWhere: SF 1101\nProf:"};
                            break;
        case "fri 3 to 4": response = {"text": "Lec03: 243 Computer org\nWhere: SF 1105\nProf: "};
                            break;                    
        default: response = {"text": "N/A"};
    }

    request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: response,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		} else {
            console.log('message sent!')
        }
	})
}
// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})