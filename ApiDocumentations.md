## Api Documentations

This documentation provides detailed information on how to interact with our API to access various resources and functionalities within our application. This guide will help you integrate with our API seamlessly.
	
-----------------------------------------------------------------------------

		The Api uses the following Schema for post and get request. 

		Parameter	Type		Description

		movie		string		Required movie name
		slot		string		Required time slot
		seats		number		Required seats

		For POST REQUEST it Returns the newly created booking in JSON format	
		as well as for get Request but the last booking only.		
	

------------------------------------------------------------------------------


1st API =>   	POST Booking

	It is POST REQUEST.		
	This POST Api is for Creating a New Movie Booking with the use of Schema.
	
	Endpoint     : 	http://localhost:8080/api/booking  
	Method       : 	POST
	Content-Type :  application/json
	Description  :	This endpoint allows you to create a new movie booking.
	Request body :
				{ 
				 "movie": "Tenet", 
		 		 "slot": "03:00 PM",
		  		 "seats": 
				 	{ "A1": 0, "A2": 0, "A3": 4, "A4": 0, "D1": 0, "D2": 0 }
				}
	
		After hitting the post Request you will get the following response

		Status : 200OK,
		Response : 
		{
    		"booking": "Booking Successfull",
   		    "bookingDetails":
                	{
					"_id": "65153eb65c005b4518695ee3",
					"movie": "Tenet",
					"slot": "03:00 PM",
					"seats": {
								"A1": 0,
								"A2": 0,
								"A3": 4,
								"A4": 0,
								"D1": 0,
								"D2": 0
							}
   		         	 }
		}	
		
In Case if you try to hit request without giving the movie,slot and seats  
it will give you a response with an error 

		Status   : 400 Bad Request,
		Response : {
   					 "ERROR": "Slot Required" 
					}
'Same for movie name and seats if its empty' 
	{
   		 "ERROR": "Movies Name Required" 
	},
	{
   		 "ERROR":  "Seat Required"
	}


In Other Cases if not able to book it will throw errors depend on the conditions:
	
		Status 	 : 400 Bad Request,
		Response :  {
   		 			"ERROR": error (whatever error will come it shows here)
					},
		....................................
		Status   : 422 unprocessable entity,
      	Response : {
					booking: "Sorry Booking Not Completed / Internal Error",
            		error: err (whatever error will come it shows here)
				   }		

..............................................................................


2nd API =>  Get Last Booking

	It is GET REQUEST.		
	This GET Api is for getting the very last booking details.
			
	Endpoint     : 	http://localhost:8080/api/booking  
	Method       : 	GET
	Description  :	This endpoint allows you to get the details of the last booking made.

	After hitting the GET request you will get the following response.

	Status : 200OK,
	Response body:
			{
    		 "movie": "Tenet",
   			 "seats": {
						"A1": 0,
						"A2": 0,
						"A3": 4,
						"A4": 0,
						"D1": 0,
						"D2": 0
    				  },
   			 "slot": "03:00 PM"
			}

  	If there is no movies in our database it will send a response
		Status : 404,
   		Response : {
        	  	  	message: "no previous booking found." 
			       };


	In Case if any problem occur in getting the data 
	it will give you a response with an error 
	
		Status : 500,
    	Response : {
        	  	    error (whatever error happen it shows here)
			       };



Api Links/Endpoints
-------------------

For Frontend :-<br>
	On  local System = http://localhost:3000
	<br>
	Live Link  	=  https://jbookmyshow.netlify.app/

For Backend :- <br>
	POST Request =  http://localhost:8080/api/booking  
	GET Request =  http://localhost:8080/api/booking  
	Live Link = https://bookmyshow-8li1.onrender.com/Api/booking



		