# Driver App

This application strives to be a desktop enhancement for "gig drivers." That is to say people that work as independent
contractors delivering food - or people. Allowing them to see pertinent information in one dashboard and extract
insights from the information.

#### Table of Content

- [Inspiration](#inspiration)
- [Roadmap](#roadmap)
- [Misc](#misc)

## Inspiration

I've been working doing deliveries as I look for steady work and find myself frustrated with the quality of applications
available to the "contractors" that work for delivery companies. For example, there isn't any trully good way of tracking
milage while working. Sure, there are a few 3rd party paid apps that are aimed at tracking milage, but they have some issues,
including not being free.

Milage aside, there is no way to really aggregate the information you may want from what these companies provide for you. One quick example
is the fact that there isn't any way to get your average dollar amount earned. With this app I hope to provide a
functional dashboard for drivers.

## Roadmap

This is definately a "work in progress" but here are some of the current goals and their status

- [ ] Initial setup
  - [ ] Set up the basic pages
  - [ ] Set up settings page
  - [ ] Set up Routing
- [ ] Authentication
  - [ ] Google Auth
  - [ ] Local Auth(?)
- [ ] Email Parsing
  - [ ] Add ability to fetch email
  - [ ] Parse emails and write them to file
  - [ ] Extract useful information from email
- [ ] Information Display
  - [ ] Add library to display information
  - [ ] Create components for each piece of information
- [ ] Database
  - [ ] Add SQLite
  - [ ] Integrate into application
- [ ] Google Maps
  - [ ] Add ability to pull information from Google maps
  - [ ] Use that information to cross reference with app info
- [ ] Ongoing
  - [ ] Styling

## Misc

I used my own React/Electron based repo to bootstrap this application. More information can be found [here](https://github.com/Kachilero/mulit-use-application)
