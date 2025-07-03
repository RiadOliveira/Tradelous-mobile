<h1 align="center">Tradelous Mobile</h1>

<p align="center">
  Tradelous is an application developed as a personal project. It provides a practical platform designed to facilitate the control of products and sales for various businesses.
</p>

![image](https://github.com/user-attachments/assets/fee7010f-18a8-4eba-8913-9a414f717130)
![image](https://img.shields.io/github/license/RiadOliveira/Tradelous-frontend-mobile)

<br/>

Contents
=================
<!--ts-->
   * [🛠️ Technologies](#technologies)
   * [📱 Install & Run](#install-run)
      * [Prerequisites](#prerequisites)
      * [Running the app](#running)
   * [⚙️ Features](#features)
   * [📷 Screenshots](#screenshots)
      * [Authentication](#auth-screens)
        * [SignUp](#sign-up)
        * [SignIn](#sign-in)
        * [Forgot Password](#forgot-password)
        * [Recover Password](#recover-password)
      * [Dashboard](#dashboard-screens)
        * [Company](#company)
          * [Employer View](#company-employer)
          * [Employee View](#company-employee)
          * [Unemployed View](#company-unemployed)
        * [Profile](#profile)
        * [Products](#products)
          * [Creation](#products-creation)
          * [Listing](#products-listing)
          * [Selection](#products-selection)
        * [Sales](#sales)
          * [Creation](#sales-creation)
          * [Listing](#sales-listing)
          * [Selection](#sales-selection)
   * [📝 License](#license)
   * [👨‍💻 Author](#author)
   * [🌐 Socials](#socials)
<!--te-->
<br/>

<h2 id="technologies">🛠️ Technologies</h2>
Tools used on this project:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/) <br/><br/>

<h2 id="install-run">📱 Install & Run</h2>

<h3 id="prerequisites">Prerequisites</h3>

  Before you start, it will be necessary to install those tools on your machine: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and the SDK of [Android](https://developer.android.com/studio) or [IOS](https://developer.apple.com/xcode/), depending on which enviroment you will run the application. Also, you will need the backend of this app installed and running on your machine, which is explained how to do on this repository: [Tradelous Backend](https://github.com/RiadOliveira/Tradelous-backend).

<h3 id="running">Running the app</h3>

```bash
# Clone this repository
$ git clone https://github.com/RiadOliveira/Tradelous-mobile.git

# Access project's folder
$ cd Tradelous-mobile

# Install the dependecies
$ npm install
or
$ yarn

# Fill enviroment variables
  # In first place, remove the .example part of .env.example file, there's only one variable, which is 
  # API (Backend) URL, if you will run the app on a device's emulator, you can let .env unchanged, using 
  # localhost as URL, but, if you will run on your mobile device, it's necessary to change that variable 
  # to the URL where server is running. 

# Generate app's build
  # If you have an emulator, simply run one of the commands below, if haven't, connect your device to 
  # your machine using a USB cable, and then run:

  # Android
  $ npm run android
  or
  $ yarn android

  # IOS
  $ npm run ios
  or
  $ yarn ios

# Run the app (With backend running on background)
$ npm start
or
$ yarn start

# Extra step (Running on mobile device and using wi-fi)
  # You can use the app with your device connected to your machine using USB, but there's also a way to use 
  # it through wifi, doing this: after install the app on your device, shake it to appear the dev's options, 
  # and then go to settings, there you will need to set the debug server host and port (Put the IP of your 
  # machine and the PORT 8081), and then, just need to restart the debug server on your machine that the 
  # device's app will detect and update.
```

<br/>

<h2 id="features">⚙️ Features</h2>

- User's register, update and delete. The user can be admin or employee of a company.
- Company's register, update and delete (After user's account has been created).
- [Admin] Can hire (Using their IDs, which the user can access on profile's screen) and fire employees from the company.
- Product's register, update and delete (By an employee or the admin of the company).
  - It's possible to read a barcode from products, using device's camera, and associate this code to the product saved on the app, being possible to use it on products' search afterwards.
- System to register product's sales (on current date), determining product's sold quantity and sale's payment method (money or card).
- Search system to find products (By name) and sales (By date, being possible to choose the type of the search, that can be: day, week and month. Starting on the selected date, example: if the user choose January 10 and type month, will find all sales between January 10 and February 10). <br/><br/>

<h2 id="screenshots">📷 Screenshots</h2>

<h3 id="auth-screens">Authentication</h3>

- <h4 id="sign-up">SignUp</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202383-1ad1ae91-5c87-4445-919d-c28bdeb8cf94.jpg" width="300"/>

- <h4 id="sign-in">SignIn</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202397-87111dd7-b8cf-43a4-ac14-a4d9eec57538.jpg" width="300"/>

- <h4 id="forgot-password">Forgot Password</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202427-9f7591b3-229f-4463-b743-d6f2b5e0c9da.jpg" width="300"/>
  
- <h4 id="recover-password">Recover Password</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202518-06b569cc-c276-42c4-8c56-58c385737ad8.jpg" width="300"/>

<h3 id="dashboard-screens">Dashboard</h3>

<h4 id="company">Company</h4>

- <h5 id="company-employer">Employer View</h5>

<img src="https://user-images.githubusercontent.com/69125013/148203368-f3102e49-eb07-45b6-b802-3964b7ced11e.jpg" width="300"/>

- <h5 id="company-employee">Employee View</h5>

<img src="https://user-images.githubusercontent.com/69125013/148203458-9eb154fc-7669-4c51-afde-eb1cf05b0800.jpg" width="300"/>

- <h5 id="company-unemployed">Unemployed View</h5>

<img src="https://user-images.githubusercontent.com/69125013/148203525-4d52c31b-7e72-42a9-a862-5584c30e516e.jpg" width="300"/>

- <h4 id="profile">Profile</h4>

    <img src="https://user-images.githubusercontent.com/69125013/148203626-9cc7ac70-f578-44c5-988f-60615db2ef30.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148203692-44ad077c-e71f-48e7-bcd8-44a9125f0da3.jpg" width="300"/>
  
<h4 id="products">Products</h4>

- <h5 id="products-creation">Creation</h5>

    <img src="https://user-images.githubusercontent.com/69125013/148204149-6f650fa1-1109-4bec-8d04-5000da68e5bc.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148204333-4f845f63-11aa-4170-a357-cdc284866d8b.jpg" width="300"/>

- <h5 id="products-listing">Listing</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204031-0ec0ce58-cdff-47d3-b60f-2e842ad463dd.jpg" width="300"/>

- <h5 id="products-selection">Selection</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204398-5fe12df4-fbeb-4297-b62e-579e57b42899.jpg" width="300"/>

<h4 id="sales">Sales</h4>

- <h5 id="sales-creation">Creation</h5>

    <img src="https://user-images.githubusercontent.com/69125013/148204818-7f18ae66-00ce-462a-9c9e-c7987e3523ef.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148204823-ac9f5c76-b814-43ce-85cd-d2691bd7a10e.jpg" width="300"/>

- <h5 id="sales-listing">Listing</h5>

    <img src="https://user-images.githubusercontent.com/69125013/148204946-bf03bd5b-8904-4799-86a8-9e1ee747b8d5.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148205084-29b0bac3-d946-4bf8-b8e3-3edfce6ae64f.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148205001-71853006-9620-43c1-aa01-be9f91d65f4d.jpg" width="300"/>

- <h5 id="sales-selection">Selection</h5>

<img src="https://user-images.githubusercontent.com/69125013/148205240-11dcf21e-4fec-4a11-b75d-bcb594c09473.jpg" width="300"/>

<h2 id="license">📝 License</h2>
This project is MIT Licensed. See <a href="https://github.com/RiadOliveira/Tradelous-mobile/blob/main/LICENSE">LICENSE</a> file for more details.

<br/>

<h2 id="author">👨‍💻 Author</h2>

<kbd>
  <a href="https://github.com/RiadOliveira">
    <img src="https://avatars.githubusercontent.com/u/69125013?v=4" width="100" alt="Ríad Oliveira"/>
    <br/><br/>
    <p align="center"><b>Ríad Oliveira</b></p>
  </a>
</kbd>

## 🌐 Socials

<div id="socials">
  <a href = "mailto:riad.oliveira@hotmail.com"><img class="badge" src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" target="_blank"/></a>
  <a href = "mailto:riad.oliveira@gmail.com"><img class="badge" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"/></a>
  <a href="https://www.linkedin.com/in/ríad-oliveira" target="_blank"><img class="badge" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/></a>
</div>
