# GRIZZ Beer Co. 🍻

This is the official source code repository for the GRIZZ Beer Co. website.

## 📄 Overview

This repository hosts the responsive, single-page website for GRIZZ, a craft beer company dedicated to untamed flavors and unforgettable brews. The site showcases our brand story, product lineup, and provides a point of contact for our community.

## 🛠️ Technology Stack

Our website is built with a modern, performance-oriented tech stack:

-   **Framework:** [Ionic](https://ionicframework.com/)
-   **UI Library:** [React.js](https://reactjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** CSS Modules

## 🚀 Setup Guide

To run this project locally for development or contributions, follow these steps:

## Section 1: Core Tools (One-Time Setup)

You only need to do this part once.

Step 1: Install Node.js and npm

The entire project is built on Node.js.

    Check if you have it: Open your terminal or Command Prompt and run node -v and npm -v. If you see version numbers, you're all set.

    If you don't: Download and install the LTS version from the official Node.js website. This will install both node and npm.

Step 2: Install the Ionic CLI

The Ionic CLI is the main tool we use to create, run, and build the app.

    In your terminal, run this command to install it globally:
    Bash

    npm install -g @ionic/cli

## Section 2: Project Setup (Getting the Code)

This is how you'll get the project itself.

Step 3: Clone the Project from GitHub

Instead of creating a new project, you will clone the existing one from your team's repository.

    Navigate to your main development folder (e.g., D:\github\repository\).

    Run the git clone command. (Replace the URL with your actual repository link).
    Bash

git clone https://github.com/your-username/grizz-project.git

This creates the grizz-project folder. Move into it:
Bash

    cd grizz-project

Step 4: Install All Project Dependencies

This command reads the package.json file in the project and downloads all the required libraries (like React and Ionic) into a node_modules folder.

    From inside the grizz-project folder, run:
    Bash

    npm install

Step 5: Verify Custom Fonts

We added custom fonts for our UI. This step is just to make sure they're in place (they should be after you clone).

    Open the project in your code editor.

    Check the file public/index.html.

    Inside the <head> section, make sure you see the links for "Bebas Neue" and "Montserrat". If they are there, you're good.

Step 6: Run the App!

You're all set. Run the development server to see the app in your browser.

    From the grizz-project folder, run:
    Bash

    ionic serve

This will open the app in your browser at http://localhost:8100.

## Section 3: Optional - Running on Android

Follow these steps if you want to run the app as a native Android application.

    Install Android Studio: Download and install it from the official Android developer website.

    Add the Android Platform: In your terminal, from the grizz-project folder, run:
    Bash

    ionic capacitor add android

Sync Your Web Code: Before running, you must build your web code and copy it to the Android project.
Bash

    ionic capacitor sync android

Open in Android Studio:
Bash

    ionic capacitor open android

In Android Studio, create a new virtual device (emulator) using the Device Manager and then press the Run (▶) button to deploy the app to it.

---
