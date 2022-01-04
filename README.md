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
   * [:computer: Install & Run](#install&run)
      * [Prerequisites](#prerequisites)
      * [Running the app](#running)
   * [:gear: Features](#features)
   * [:camera: Screen Shots](#screenshots)
      * [Authentication](#auth-screens)
      * [Dashboard](#dashboard-screens)
   * [:man: Author](#author)
<!--te-->
</br>

<h2 id="technologies">🛠 Technologies</h2>
Tools used on this project:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/) </br></br>

<h2 id="install&run">:computer: Install & Run</h2>

<ul>
  <li id="prerequisites"><h3>Prerequisites</h3></li>
  
  Before you start, it will be necessary to install those tools on your machine: [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/). Also, you will need the backend of this app installed and running on your machine, which is explained how to do on this repository: [Tradelous Backend](https://github.com/RiadOliveira/Tradelous-backend)
  
  <li id="running"><h3>Running the app</h3></li>
  
  ```bash
    # Clone this repository
    $ git clone <https://github.com/RiadOliveira/Tradelous-frontend-mobile.git>

    # Install the dependecies
    $ npm install
    or
    $ yarn

    # Run the app (With backend running on background)
    $ npm start
    or
    $ yarn start
  ```
</ul>

</br>

<h2 id="features">:gear: Features</h2>

- [Admin] Can hire (Using their IDs, which the user can access on profile's screen) and fire employees of/from the company.
- User's register which can be admin or employee of a company.
- Company's register (When a user creates an account as admin or when he already has an account, but isn't associated to any company).
- Product's register, update and delete (By an employee or the admin of the company).
  - It's possible to read a barcode from products, using device's camera, and associate this code to the product saved on the app, being possible to use it on products' search afterwards.
- Sale's system to register product's sales, determining product's quantity and saving it on the current date.
- Search system to find products (By name) and sales (By date, being possible to choose the type of the search, that can be: day, week and month. Starting on the selected date, example: if the user choose January 10 and type month, will find all sales between January 10 and February 10). </br></br>

<h2 id="screenshots">:camera: Screen Shots</h2>

- <h3 id="auth-screens">Authentication</h3>

  - #### Landing screen
  ![image]()

  - #### SignUp
  ![image]()

  - #### Register Company (On account creation)
  ![image]()

  - #### SignIn
  ![image]()

  - #### Forgot Password
  ![image]()

- <h3 id="dashboard-screens">Dashboard</h3>

  - #### Company 
    - **Admin view**
    ![image]()
    - **Employee view**
    ![image]()
    - **Unemployed view**
    ![image]()

  - #### Profile
  ![image]()

  - #### Products
  ![image]()

  - #### Sales
  ![image]()
  
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
