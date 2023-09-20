# Event Management App

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Docker](#docker)
- [Usage](#usage)
- [License](#license)

## Overview

This is a simple event management application built with Next.js, Tailwind CSS, Node.js, and PostgreSQL. The application allows users to create and manage events.

## Features

- Create new events with title, description and date.
- View a list of all events.
- Filter events.
- Real-time updates with Socket.io.

## Tech Stack

- Next.js
- Tailwind CSS
- Node.js
- PostgreSQL
- Socket.io

## Installation

To set up the development environment, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/gabortari93/EventManagment.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd event-managment
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

After running these commands, you should now be able to access the application at `http://localhost:3000`.

## Docker

I use Docker to containerize the application. To build and run the Docker container, follow these steps:

1. **Build the Docker image**

   ```bash
   docker-compose build
   ```

2. **Run the Docker container**

   ```bash
   docker-compose up
   ```

You should now be able to access the application at `http://localhost:3000`.

## Usage

To create a new event:

1. Navigate to `http://localhost:3000/` and click on the "Show Event Form" button.
2. Fill out the form fields and click "Save Event."

To view the list of events:

1. Navigate to `http://localhost:3000/` and click on the "Show Event List" button.
2. Here you can view, update, or delete events.

## License

Distributed under the MIT License. See `LICENSE` for more information.
