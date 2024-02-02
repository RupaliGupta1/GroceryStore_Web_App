The "GROCERY STORE" application is a Maven Project structured around the Model-View-Controller (MVC) software design pattern, aimed at facilitating online grocery shopping for customers securely and efficiently. It operates as a cashless, restful e-commerce website, ensuring convenient delivery of groceries to customers' doorsteps within a short timeframe.

**Technologies Used:**
- **Frontend:** Angular, Bootstrap
- **Backend:** Spring Boot, Hibernate
- **Database:** MySQL

**Frontend Description:**
The application features different headers tailored for various user roles, including general users/customers and administrators. Each header provides access to specific functionalities such as browsing products, managing carts, viewing orders, and more, ensuring a seamless user experience.

**Backend Description:**
  Controller-> Service-> Repository/Dao-> Database-> Entity/Model
The backend architecture revolves around distinct modules handling roles, users, products, orders, carts, images, and transaction details. Following the Controller-Service-Repository/Dao-Database-Entity/Model architecture, the system efficiently manages data flow and interactions.

**User Role Flow:**
1. Users create accounts, with their details securely stored in the database.
2. Authentication is ensured through a Jwt token upon login, providing access to user-specific dashboards.
3. Users can browse products, view details, add items to their cart, and proceed to checkout.
4. During checkout, users furnish necessary details such as address and phone number.
5. Online payment is facilitated through RazorPay, ensuring secure transactions.
6. Users can track order status and view past orders in the "My Orders" section.

**Admin Role Flow:**
1. An admin account is preconfigured within the system.
2. Admin authentication is managed via Jwt token, granting access to the admin dashboard.
3. Admins have privileges to add products, update product details, and manage orders.
4. Order fulfillment is handled by marking orders as delivered within the system.
5. Admins can also oversee user activity by accessing a list of all registered users.

**Security:**
Spring Security Jwt Token mechanism is employed to enforce authentication and authorization, ensuring secure access to APIs based on user roles (User/Admin).

**Payment:**
Online payments are facilitated through the integration of the RazorPay payment gateway, providing users with a secure and hassle-free transaction experience.

Through these mechanisms, the "GROCERY STORE" application offers a robust and user-friendly platform for online grocery shopping, with enhanced security measures and seamless payment processing capabilities.
                
