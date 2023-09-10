![Banner](images/Build%20RESTful%20API%20Inventory%20Management.png)

<h5 align="center">Created by Using</h5>
<p align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="80" height="50"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="80" height="50"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="80" height="60"/> </a> </a> </p>

<h5 align="center">Link Project</h5>
<p align="center">
<a href="https://week-11-sanhendrindp-production.up.railway.app/">week-11-sanhendrindp-production.up.railway.app/</a>
</p>

# About

This project I created based on the shop's inventory management app where users can monitor and place orders for goods. In this REST API, there are 2 roles, the admin role and the user role. Basically, they can do the same CRUD functionality, but for the admin role, he can delete the users list registered.

# API Routes in Details

<p align="center">
<img src="images/Detail REST API v1.0.1.png"> 
</p>

1. **POST /users/signup** :
   Users need to input an email and password. But actually, there is a role that needs to be input. By default, if a user does not input a role, then his role just as user. A user can become an admin if he inputs the admin role.

   <p align="center">
    <img src="images/1.PNG"> 
    </p>

2. **POST /users/login** :
   When users login, it will generate a token that will be used to access other routes.

3. **GET /users** :
   Only can be access by admin to show all registered users, so admin can see their ID user that will be used to delete user request.

4. **DELETE /users/:id** :
   Only can be access by admin to delete registered users.

5. **GET /products** and **GET /products/:id** :
   Can be access by anyone, even not registered user.

6. **POST /products** :
   To create a new product by input the name and price product.

   <p align="center">
    <img src="images/2.PNG"> 
    </p>

7. **PATCH /products/:id** :
   To update product by using product ID.

8. **DELETE /products/:id** :
   To delete product by using product ID.

9. **GET /orders** and **GET /orders/:id** :
   Different from GET products which can be access by anyone. To GET orders, users need to login.

10. **POST /orders** :
    To create a new order using product ID. Need to input product ID, and and quantity of products required.

     <p align="center">
     <img src="images/3.PNG"> 
     </p>

11. **DELETE /orders/:id** :
    To delete order by using order ID.

---

<p align="center">Thank you 🙏</p>
