
# ⚙ Food finder

![Food Finder App](./images/design.png)<br><br>
[Link to live product](https://koenhaagsma.github.io/Food-Finder/index.html)


## 📂 Assignment
De assignment is build a SPA with vanilla JS (and microlibraries if needed) based on a user story that you chose yourself:
'As a foodie, I want to be able to easily search and view information about a product while shopping, so that I can make a good choice whether it fits my diet. Healthy Food Checker - Open Food Facts API'

## 🧾 Table of contents
-   [About the project](## 📖 About the project)
      * [Built with](### 🛠 Built with)
      * [Features](### 🌟 Features)
-   [Activity Diagram](## 🎱 Activity Diagram)
-   [Getting started](## 🔍 Getting started)
      * [Installation](## 🔨 Installation)
-   [Packages/dependecies](## 🧰 Packages/dependecies)
      * [Packages/dependecies](### 🧱 Dependecies/Packages)
-   [License](## 🔖 License)
-   [Contributers and their role](## 👪 Contributers)

## 📖 About the project
My project is about a user story that i chose to do: 'As a foodie, I want to be able to easily search and view information about a product while shopping, so that I can make a good choice whether it fits my diet. Healthy Food Checker - Open Food Facts API', so i build a web app where it is really fast to look if a product is healthy or not.

My first priority is: How can the user look if a product is healthy as fast as possible.

### 🛠 Built with
The project is built with Vanilla JS, HTML and CSS, there is some help from microlibraries like Quagga.js because my Windows computer doesn't support the native barcode scanner in JS yet.

### 🌟 Features
- Scanning a product, it is possible for the user to scan a product bar code with the application, when the scanning is done and the product is recognised the application will show a detail paga with all info that you would expect from a product detail page.
- Searching for a product code, it is also possible for the user to search on a product bar code, I created this because something the scanner can fail and then there is the possibility to find the product a different way.
- Searching for a product (category), it is possible for the user to search for a product with only the product name, there is a small disclaimer here because the API searches on category, this means that you need to search in plural most times.
- Sort products on popularity, the API doesn't provide a way to sort in the query (I didn't find one), so i built a sorting button myself, when recieving the data, the products in there have a popularity key (Int) so it is pretty easy to sort on that.
- Detail page and last but not least the app has a detail page where users can see if the product is healthy or not, it shows the nutritional grade and most nutritional values per 100gr, also an image of the product is provided.

## 🎱 Activity Diagram
Activity diagram: <br>
![Activity Diagram](./images/activityDiagram.png)

## 🔍 Getting started
*Before you can start you need to follow the installation*

## 🔨 Installation
1. Open the terminal, or use the terminal in your IDE

2. Clone the repository
```
git clone https://github.com/KoenHaagsma/Food-Finder.git
```
3. Go to the cloned repository
```
cd ../../Food-Finder
```
4. Start application with Live-Server in VSCODE
```
Right bottom: 'Go live'
```

## 🧰 Packages/dependecies

### 🧱 Dependecies/Packages
- [Quagga.js](https://serratus.github.io/quaggaJS/)

## 📑 Sources
- [Quagga.js](https://serratus.github.io/quaggaJS/)
- [Hash router](https://github.com/rishavs/vanillajs-spa)

## 🔖 License
[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)]()

## 👪 Contributers and their role
*Insert contributers and their role*
