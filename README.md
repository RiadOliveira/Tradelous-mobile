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
   * [🚀 Getting Started](#getting-started)
      * [Prerequisites](#prerequisites)
      * [Installation & Setup](#setup)
   * [⚙️ Features](#features)
   * [📷 Screenshots](#screenshots)
      * [Authentication](#authentication)
        * [Sign Up](#sign-up)
        * [Sign In](#sign-in)
        * [Password Recovery](#password-recovery)
      * [Dashboard](#dashboard)
        * [Company Management](#company)
          * [Employer Dashboard](#company-employer)
          * [Employee Dashboard](#company-employee)
          * [User Dashboard](#company-user)
        * [User Profile](#profile)
        * [Product Management](#products)
          * [Add Product](#products-creation)
          * [Product Catalog](#products-catalog)
          * [Product Details](#products-details)
        * [Sales Management](#sales)
          * [New Sale](#sales-creation)
          * [Sales History](#sales-history)
          * [Sale Details](#sales-details)
   * [📝 License](#license)
   * [👨‍💻 Author](#author)
   * [🌐 Socials](#socials)
<!--te-->
<br/>

<h2 id="technologies">🛠️ Technologies</h2>
Built with:

* [React Native](https://reactnative.dev/)
* [TypeScript](https://www.typescriptlang.org/) <br/><br/>

<h2 id="getting-started">🚀 Getting Started</h2>

<h3 id="prerequisites">Prerequisites</h3>

Before running the application, ensure the following tools are installed on your system:
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* Mobile development SDK: [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) depending on your target platform.

**Important**: This application requires the backend service to be running. Please refer to the Tradelous Backend repository for installation and setup instructions.

<h3 id="setup">Installation & Setup</h3>

```bash
# Clone the repository
$ git clone https://github.com/RiadOliveira/Tradelous-mobile.git

# Navigate to project directory
$ cd Tradelous-mobile

# Install dependencies
$ npm install

# Configure environment variables
# Rename .env.example to .env and update the API_URL variable
# For emulator: use localhost (default)
# For physical device: use your machine's IP address

# Build and run the application

# Android
$ npm run android

# iOS
$ npm run ios

# Start the development server
$ npm start
```

<h4>Running on Physical Device via Wi-Fi</h4>

1. Install the app on your device via USB
2. Shake the device to open developer menu
3. Go to Settings → Debug server host & port
4. Enter your machine's IP address and port 8081
5. Restart the debug server on your machine

<br/>

<h2 id="features">⚙️ Features</h2>

- **User Management System** - Complete user lifecycle management with role-based access control for administrators and employees.
- **Company Administration** - Full company profile management with registration and configuration capabilities.
- **Employee Management** - Administrative tools for hiring and terminating employees using unique user identification.
- **Product Catalog Management** - Comprehensive product CRUD operations with barcode scanning integration using device camera.
- **Sales Transaction System** - Real-time sales recording with quantity tracking and multiple payment method support (cash/card).
- **Advanced Search & Analytics** - Intelligent search functionality for products by name and sales by flexible date ranges (daily, weekly, monthly periods). <br/><br/>

<h2 id="screenshots">📷 Screenshots</h2>

<h3 id="authentication">Authentication</h3>

- <h4 id="sign-up">Sign Up</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202383-1ad1ae91-5c87-4445-919d-c28bdeb8cf94.jpg" width="300"/>

- <h4 id="sign-in">Sign In</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202397-87111dd7-b8cf-43a4-ac14-a4d9eec57538.jpg" width="300"/>

- <h4 id="password-recovery">Password Recovery</h4>

<img src="https://user-images.githubusercontent.com/69125013/148202427-9f7591b3-229f-4463-b743-d6f2b5e0c9da.jpg" width="300"/> <img src="https://user-images.githubusercontent.com/69125013/148202518-06b569cc-c276-42c4-8c56-58c385737ad8.jpg" width="300"/>

<h3 id="dashboard">Dashboard</h3>

<h4 id="company">Company Management</h4>

- <h5 id="company-employer">Employer Dashboard</h5>

<img src="https://user-images.githubusercontent.com/69125013/148203368-f3102e49-eb07-45b6-b802-3964b7ced11e.jpg" width="300"/>

- <h5 id="company-employee">Employee Dashboard</h5>

<img src="https://user-images.githubusercontent.com/69125013/148203458-9eb154fc-7669-4c51-afde-eb1cf05b0800.jpg" width="300"/>

- <h5 id="company-user">User Dashboard</h5>

<img src="https://user-images.githubusercontent.com/69125013/148203525-4d52c31b-7e72-42a9-a862-5584c30e516e.jpg" width="300"/>

- <h4 id="profile">User Profile</h4>

<img src="https://user-images.githubusercontent.com/69125013/148203626-9cc7ac70-f578-44c5-988f-60615db2ef30.jpg" width="300"/> <img src="https://user-images.githubusercontent.com/69125013/148203692-44ad077c-e71f-48e7-bcd8-44a9125f0da3.jpg" width="300"/>
  
<h4 id="products">Product Management</h4>

- <h5 id="products-creation">Add Product</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204149-6f650fa1-1109-4bec-8d04-5000da68e5bc.jpg" width="300"/> <img src="https://user-images.githubusercontent.com/69125013/148204333-4f845f63-11aa-4170-a357-cdc284866d8b.jpg" width="300"/>

- <h5 id="products-catalog">Product Catalog</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204031-0ec0ce58-cdff-47d3-b60f-2e842ad463dd.jpg" width="300"/>

- <h5 id="products-details">Product Details</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204398-5fe12df4-fbeb-4297-b62e-579e57b42899.jpg" width="300"/>

<h4 id="sales">Sales Management</h4>

- <h5 id="sales-creation">New Sale</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204818-7f18ae66-00ce-462a-9c9e-c7987e3523ef.jpg" width="300"/> <img src="https://user-images.githubusercontent.com/69125013/148204823-ac9f5c76-b814-43ce-85cd-d2691bd7a10e.jpg" width="300"/>

- <h5 id="sales-history">Sales History</h5>

<img src="https://user-images.githubusercontent.com/69125013/148204946-bf03bd5b-8904-4799-86a8-9e1ee747b8d5.jpg" width="300"/> <img src="https://user-images.githubusercontent.com/69125013/148205084-29b0bac3-d946-4bf8-b8e3-3edfce6ae64f.jpg" width="300"/> <img src="https://user-images.githubusercontent.com/69125013/148205001-71853006-9620-43c1-aa01-be9f91d65f4d.jpg" width="300"/>

- <h5 id="sales-details">Sale Details</h5>

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
