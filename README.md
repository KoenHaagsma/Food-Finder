
# ⚙ Food finder

![Food Finder App](./images/design.png)<br><br>
[⚙ Link to live product](https://koenhaagsma.github.io/Food-Finder/index.html)


## 📂 Assignment
De assignment is build a SPA with vanilla JS (and microlibraries if needed) based on a user story that you chose yourself:
'As a foodie, I want to be able to easily search and view information about a product while shopping, so that I can make a good choice whether it fits my diet. Healthy Food Checker - Open Food Facts API'

## 🧾 Table of contents
-   [About the project](##About-the-project)
      * [Built with](###Built-with)
      * [Features](###Features)
      * [Micro libraries](###Micro-libraries)
-   [Activity Diagram](##Activity-Diagram)
-   [Getting started](##Getting-started)
      * [Installation](##Installation)
-   [Packages/dependecies](##Packages/dependecies)
      * [Packages/dependecies](###Dependecies/Packages)
-   [License](##License)
-   [Contributers and their role](##Contributers)

## 📖 About the project
My project is about a user story that i chose to do: 'As a foodie, I want to be able to easily search and view information about a product while shopping, so that I can make a good choice whether it fits my diet. [Healthy Food Checker - Open Food Facts API](https://world.openfoodfacts.org/files/api-documentation.html)', so i build a web app where it is really fast to look if a product is healthy or not.

My first priority is: How can the user look if a product is healthy as fast as possible.

### 🛠 Built with
The project is built with Vanilla JS, HTML and CSS, there is some help from microlibraries like Quagga.js because my Windows computer doesn't support the native barcode scanner in JS yet.

### 🌟 Features
- Scanning a product, it is possible for the user to scan a product bar code with the application, when the scanning is done and the product is recognised the application will show a detail paga with all info that you would expect from a product detail page.
- Searching for a product code, it is also possible for the user to search on a product bar code, I created this because something the scanner can fail and then there is the possibility to find the product a different way.
- Searching for a product (category), it is possible for the user to search for a product with only the product name, there is a small disclaimer here because the API searches on category, this means that you need to search in plural most times. Check the [MoSCoW](###MoSCoW) for how i would have done it another way if i had time.
- Sort products on popularity, the API doesn't provide a way to sort in the query (I didn't find one), so i built a sorting button myself, when recieving the data, the products in there have a popularity key (Int) so it is pretty easy to sort on that.
- Detail page and last but not least the app has a detail page where users can see if the product is healthy or not, it shows the nutritional grade and most nutritional values per 100gr, also an image of the product is provided.

### 🔁 API
The API used in this product is: [Healthy Food Checker - Open Food Facts API](https://world.openfoodfacts.org/files/api-documentation.html). The API has a lot of data about all foods that you can think off, you can search on different categories, products, barcodes etc.
There is a lot more possible than that I knew until the last week of the project, I see a lot of possibilities that would enhance my application a lot more, I can still do this and I will do, check the [MoSCoW](###MoSCoW) for more information on what I still want to built.

The api provides a decent documentation where you can find how to do fetch queries and some more general information, see screenshot below:

### 📚 Micro libraries
I used one micro library because of not accesible features in the browser on Windows by that i mean the Barcode detector. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API))
So i searched for another option because i really wanted a barcode scanner in my application, i used [Quagga.js](https://serratus.github.io/quaggaJS/), the documentation is easy to read and also the scanner is easy to use. The experience with this library was good and i would people recommend this scanner, but also it's a pity that i could not use the scanner from JS itself. I hope when i start some other project i can use the native scanner.

### 🙌 MoSCoW
**Must have**
- Users must be able to scan a product;
- Users must be able to view the details of a product;
- Users must be able to view useful details of a product on the detail page;
- Users must have an alternative way to search for a product instead of scanning;
- Users must have a fast way to scan/search (for) a product;
- Users must have a way to sort the list of searched products;
- Users must have a way to see if the app is loading.

**Should have**
- Users should have an easy experience with finding a product;
- Users should have another alternative showed if the scanning of a product takes too long;
- Users should have a way to sort on more categories than the app sorts on now;
- Users should not be able to click buttons that do nothing yet;
- Users shuld have a way to see if a button is clickable or not;

**Could have**
- Users could have a way to compare products to eachother;
- Users could have a way to add products to a list;
- Users could have a way to show added products.

**Won't have**
- Users won't have a way to register in the app;
- Users won't have a way to login to the app;
- Users won't have a way to scan with the native Barcode API.

### ✔ Checklist
Checklist for showing what is done and what still can be done.<br>
- [x] Scanning a product
- [x] Show the details of a product
- [x] Alternative way of searching for a product
- [x] Fast way of searching for a product
- [x] Sorting list of searched products
- [x] Detailed loading states
- [x] Easy experience with finding a product
- [x] 404 if hash is not found
- [x] Lazy loading products if last product is reached
- [x] Loading state when needed
- [x] Details on the detail page are useful
- [ ] Alternative way provided if scanning takes to long
- [ ] Buttons not clickable when nog needed
- [x] Sort on popularity
- [ ] Sort on kcal
- [ ] Sort on nutritional grade
- [ ] Compare products
- [ ] Alternative healthier product showed for searched product
- [ ] Add products to a list
- [ ] Show products that are added to the list

## 🎱 Activity Diagram
Activity diagram iteration 1: <br>
![Activity Diagram](./images/activityDiagram.png)<br>

Activity diagram iteration 2: <br>
![Activity Diagram](./images/activityDiagram_2.png)<br>

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
4. Start application with [Live-Server in VSCODE](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
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
