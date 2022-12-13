# Objective Green

## 1.1 Purpose of the System
**_O-Green_** is the project chosen in the subject [[Web Application Design]]. It is a web application whose objective is making a community of users who can create and participate in events all around the world including th epossibility to be online. These events are green events related to ecologism, such as cleaning of places, vegeterian cooking sessions, handcrafting,  or bigger festivals such music festivals who support ecologic projects or charity events. A clear example of a big festival like those is the british Glastonbury Festival which this year was sponsored by greenpeace.

This software is used by guests, users, administrators and APIs. Guests will have the opportunity to register in the web application allowing them to become users. And participate in diferent events, plus checking announcements inside those beforehand mentioned events. 

### 1.1 Possibilities of users
_Guests_ users can do the following things:
	- View the events that already exist
	- View the comment zone of each post
	- Search for an event
	- Register in the web application

_Registered_ users can do these actions:
	- Log in the web application
	- Log out from the platform
	- Create an event
	- Search for an event
	- Delete its own event
	- Create an announcement inside their event
	- Upload media from participating in an event so it's shown in their profile page
	- Comment events and announcements
	- Like an Event and React to an announcement
	- Manage their profile

_Administrator_ users can:
	- Create general alerts
	- Modify a registered user
	- Modify Events from anybody
	- Create starred events
	- Delete Events fro anybody
	- Modify other users
	- Delete other users
	- Search for events
	- Create an announcement inside events
	- Comment events and announcements
	- Like an Event and React to an announcement
	- Manage their profile
## 1.3 System Architecture
**Front End** will be done using React.js
**Back End** will be programmed using Node.js with a database of MongoDB

| Api Method                       | Purpose                                        | Route                              | Response | Errors      |
| -------------------------------- | ---------------------------------------------- | ---------------------------------- | -------- | ----------- |
| Register (POST)                  | register a user                                | /auth/regiser                      | 201      | 500         |
| Login (POST)                     | login a user                                   | /auth/login                        | 200      | 500,404,403 |
| Create announcement (POST)       | Create an announcement                         | /announcements/                    | 201      | 500         |
| Update annpuncement (PATCH)      | Update the data of an announcement             | /announcements/:id                 | 200      | 500,403,404 |
| Delete announcement (DELETE)     | Delete an announcement                         | /announcements/:id                 | 200      | 500,403,404 |
| Like/Dislike announcement(PATCH) | Like or dislike an announcement                | /announcements/:id/like            | 200      | 500,404     |
| Create Event (POST)              | Create an event                                | /events/                           | 201      | 500         |
| Update Event (PATCH)             | Update the data of an event                    | /events/:id                        | 201      | 500,403,404 |
| Delete Event (DELETE)            | Delete an event                                | /events/:id                        | 200      | 500,403,404 |
| Participate in event (PATCH)     | Participate in the event                       | /events/:id/participate            | 200      | 500,404     |
| Organize event (PATCH)           | Add as organizer of the event                  | /events/:id/organize               | 200      | 500,404,403 |
| Get Event by Id  (GET)           | Get an event                                   | /events/byId/:id                   | 200      | 500,404     |
| Get Event timeline  (GET)        | Get events timeline given a user and followers | /events/timeline/                  | 200      | 500,404     |
| Get all Events   (GET)           | Get all events                                 | /events/all/                       | 200      | 500,404     |
| Get Events of a user (GET)       | Get the events of a user                       | /events/user                       | 200      | 500,404     |
| Post a post (POST)               | Create a Post                                  | /posts/                            | 201      | 500,404     |
| Update post (PATCH)              | Update a Post                                  | /posts/:id                         | 200      | 500,403,404 |
| Delete  a post(DELETE)           | Delete a Post                                  | /posts/:id                         | 200      | 500,403,404 |
| Like a Post(PATCH)               | Like a Post                                    | /posts/:id/like                    | 200      | 500.403,404 |
| Comment (POST)                   | Comment a post                                 | /posts/:id/comment                 | 200      | 500,404     |
| Update COmment (PATCH)           | Update a comment                               | /posts/:id/comment/:commentId/     | 200      | 500,403,404 |
| Delete Comment (DELETE)          | Delete a comment                               | /posts/:id/comment/:commentId/     | 200      | 500,403,404 |
| Like a comment (PATCH)           | Like a comment                                 | /posts/:id/comment/:commentId/like | 200      | 500,404     |
| Get a post (GET)                 | Get a specific post                            | /posts/:id                         | 200      | 500,404     |
| Get timeline posts (GET)         | Get the posts timeline of a user               | /posts/timeline/:userId            | 200      | 500,404     |
| Get Event's posts  (GET)         | Get the posts related to an event              | /posts/events/:eventId             | 200      | 500,404     |
