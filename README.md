<h1 align="center">Tradelous (Mobile)</h1>

<p align="center">
  A app developed in order to provide an easy way to managment stocks and sales of varied companies. It was made mainly in order to pratice
  my development skills on mobile.
</p>

<h4 align="center"> 
	:convenience_store:&nbsp; Tradelous :heavy_check_mark: Finished &nbsp; :convenience_store: </br>
</h4>

![image](https://img.shields.io/github/license/RiadOliveira/Tradelous-frontend-mobile)

Contents
=================
<!--ts-->
   * [🛠 Technologies](#technologies)
   * [:iphone: Install & Run](#install&run)
      * [Prerequisites](#prerequisites)
      * [Running the app](#running)
   * [:gear: Features](#features)
   * [:camera: Screen Shots](#screenshots)
      * [Authentication](#auth-screens)
        * [SignUp](#sign-up)
        * [SignIn](#sign-in)
        * [Forgot Password](#forgot-password)
        * [Recover Password](#recover-password)
      * [Dashboard](#dashboard-screens)
        * [Company](#company)
        * [Profile](#profile)
        * [Products](#products)
        * [Sales](#sales)
   * [:man: Author](#author)
<!--te-->
</br>

<h2 id="technologies">🛠 Technologies</h2>
Tools used on this project:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/) </br></br>

<h2 id="install&run">:iphone: Install & Run</h2>

<ul>
  <li id="prerequisites"><h3>Prerequisites</h3></li>
  
  Before you start, it will be necessary to install those tools on your machine: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and the SDK of [Android](https://developer.android.com/studio) or [IOS](https://developer.apple.com/xcode/), depending on which enviroment you will run the application. Also, you will need the backend of this app installed and running on your machine, which is explained how to do on this repository: [Tradelous Backend](https://github.com/RiadOliveira/Tradelous-backend).
  
  <li id="running"><h3>Running the app</h3></li>
  
  ```bash
    # Clone this repository
    $ git clone <https://github.com/RiadOliveira/Tradelous-frontend-mobile.git>

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
</ul>

</br>

<h2 id="features">:gear: Features</h2>

- User's register, update and delete. The user can be admin or employee of a company.
- Company's register, update and delete (After user's account has been created).
- [Admin] Can hire (Using their IDs, which the user can access on profile's screen) and fire employees from the company.
- Product's register, update and delete (By an employee or the admin of the company).
  - It's possible to read a barcode from products, using device's camera, and associate this code to the product saved on the app, being possible to use it on products' search afterwards.
- System to register product's sales (on current date), determining product's sold quantity and sale's payment method (money or card).
- Search system to find products (By name) and sales (By date, being possible to choose the type of the search, that can be: day, week and month. Starting on the selected date, example: if the user choose January 10 and type month, will find all sales between January 10 and February 10). </br></br>

<h2 id="screenshots">:camera: Screen Shots</h2>

- <h3 id="auth-screens">Authentication</h3>

  - <h4 id="sign-up">SignUp</h4>
  <img src="https://user-images.githubusercontent.com/69125013/148202383-1ad1ae91-5c87-4445-919d-c28bdeb8cf94.jpg" width="300"/>

  - <h4 id="sign-in">SignIn</h4>
  <img src="https://user-images.githubusercontent.com/69125013/148202397-87111dd7-b8cf-43a4-ac14-a4d9eec57538.jpg" width="300"/>

  - <h4 id="forgot-password">Forgot Password</h4>
  <img src="https://user-images.githubusercontent.com/69125013/148202427-9f7591b3-229f-4463-b743-d6f2b5e0c9da.jpg" width="300"/>
  
  - <h4 id="recover-password">Recover Password</h4>
  <img src="https://user-images.githubusercontent.com/69125013/148202518-06b569cc-c276-42c4-8c56-58c385737ad8.jpg" width="300"/>

- <h3 id="dashboard-screens">Dashboard</h3>

  - <h4 id="company">Company</h4> 
 
    - **Admin view**
    <img src="https://user-images.githubusercontent.com/69125013/148203368-f3102e49-eb07-45b6-b802-3964b7ced11e.jpg" width="300"/>
    
    - **Employee view**
    <img src="https://user-images.githubusercontent.com/69125013/148203458-9eb154fc-7669-4c51-afde-eb1cf05b0800.jpg" width="300"/>

    - **Unemployed view**
    <img src="https://user-images.githubusercontent.com/69125013/148203525-4d52c31b-7e72-42a9-a862-5584c30e516e.jpg" width="300"/>

  - <h4 id="profile">Profile</h4>
  <img src="https://user-images.githubusercontent.com/69125013/148203626-9cc7ac70-f578-44c5-988f-60615db2ef30.jpg" width="300"/>
  <img src="https://user-images.githubusercontent.com/69125013/148203692-44ad077c-e71f-48e7-bcd8-44a9125f0da3.jpg" width="300"/>
  
  - <h4 id="products">Products</h4>

    - **Creation**
    <img src="https://user-images.githubusercontent.com/69125013/148204149-6f650fa1-1109-4bec-8d04-5000da68e5bc.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148204333-4f845f63-11aa-4170-a357-cdc284866d8b.jpg" width="300"/>
    </br></br>

    - **List**
    <img src="https://user-images.githubusercontent.com/69125013/148204031-0ec0ce58-cdff-47d3-b60f-2e842ad463dd.jpg" width="300"/>
    </br></br>
    
    - **Selection**
    <img src="https://user-images.githubusercontent.com/69125013/148204398-5fe12df4-fbeb-4297-b62e-579e57b42899.jpg" width="300"/>

  - <h4 id="sales">Sales</h4>

    - **Creation**
    <img src="https://user-images.githubusercontent.com/69125013/148204818-7f18ae66-00ce-462a-9c9e-c7987e3523ef.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148204823-ac9f5c76-b814-43ce-85cd-d2691bd7a10e.jpg" width="300"/>
    </br></br>

    - **List**
    <img src="https://user-images.githubusercontent.com/69125013/148204946-bf03bd5b-8904-4799-86a8-9e1ee747b8d5.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148205084-29b0bac3-d946-4bf8-b8e3-3edfce6ae64f.jpg" width="300"/>
    <img src="https://user-images.githubusercontent.com/69125013/148205001-71853006-9620-43c1-aa01-be9f91d65f4d.jpg" width="300"/>
    </br></br>

    - **Selection**
    <img src="https://user-images.githubusercontent.com/69125013/148205240-11dcf21e-4fec-4a11-b75d-bcb594c09473.jpg" width="300"/>

</br>

<h2 id="author">:man: Author</h2>

---
<a href="https://github.com/RiadOliveira">
 <img src="https://avatars.githubusercontent.com/u/69125013?v=4;" width="100px;" alt=""/>
 <br/>
 <sub><b>Ríad Oliveira</b></sub>
</a>

</br>Contact:</br>

[![Linkedin Badge](https://img.shields.io/badge/-Ríad&nbsp;Oliveira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/r%C3%ADad-oliveira-8492891b4/)](https://www.linkedin.com/in/r%C3%ADad-oliveira-8492891b4/) 
[![Gmail Badge](https://img.shields.io/badge/-riad.oliveira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:riad.oliveira@gmail.com)](mailto:riad.oliveira@gmail.com)
