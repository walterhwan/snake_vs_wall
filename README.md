# README

<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->

# Project Proposal

## Snake VS Wall - An vertical scrolling game

This game is simple. Your goal is to eat stuff, getting bigger, breaking through touch walls, and survive!

# Functionality & MVP

In Snake VS Wall, player will be able to:

- [ ] Start/Pause/Restart the game
- [ ] Move snake using keyboard (`A D` or `← →`)
- [ ] Eat `food` that grows the snake
- [ ] Encounter `wall`s that decrease the length of snake
- [ ] End the game when length is 0

# Wireframes

The game is run under a single page app with a simulation canvas on the left and instructions on the right.

![wireframes](https://i.imgur.com/ZUMHVsA.png)

The snake can only go up relative to other objects. But its absolution position stay in the same vertically. User can move the snake in x-axis.

# Architecture and Technologies

+ Vanilla Javascript
+ HTML5 Canvas


# Implementation Timeline

#### Over the weekend

+ learn how canvas works
+ make overall mechanics of vertical scrolling work

#### Day 1

+ make snake, divider, food, wall objects
+ make start/pause/restart button

#### Day 2

+ snake can eat food and grow
+ snake cannot move through divider

#### Day 3

+ snake will decrease in length when hitting a wall
+ game over when length is 0

#### Day 4

+ make a fun gameplay experience

<!-- pick color here -->
<!-- http://paletton.com/ -->
