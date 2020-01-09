Students: Tseng Chia Fu - s3634996, Phu Vinh Luu - s3686970
Course: Cloud Computing - COSC 2638 
Subject: Assignment 2 - Building a scalable application.
Lecturer: Dr. Nguyen Ngoc Thanh
Date: 5th December 2019

Frontend URL: vietnamsachvaxanh.com

--------------------------
Descriptions of implemented functional requirements using ReactJS and NodeJS:
    - User is able to sign up for an account, or sign up and log in using Facebook.

    - After the user has sign in, they will be introduced to the home page where the function create location is available.

    - The home page displays all the registered location as well as a list of registered location, where users can select the location 
    to view that location detail page. For location owners, they will see 2 additional button for delete and edit.  

    - Detail Page: This page contains basic info like location owner info, a marker on the map to indicate location
    and list of members as well a join clean up button. Users will also be able to download the list of members in a CSV file.
    
    - In detail page, only the location owner is able to access an Input, which is used to input data after clean ups.

    - Using an admin account:
        username: vncleangreen@gmail.com
        password: Test1234!
    The admin is able to run report, and see what is the results of input from every location.

    - The user is able to communicate with the admin using the contact support button down in footer, where the 
    user sends a request, they will be replied with an email from vncleangreen to comfirm that their message is being processed.
--------------------------
Functional requirements: 
Ability for Clean Up Location Owners to 
- create accounts [x]
- set up Clean Up Locations [x]
- Download lists of people who join their clean-ups [x]
- input data after the clean ups (i.e. how much was collected). [x]

Ability for Volunteers to 
- view registered clean up locations on a map [x]
- click on locations register themselves to a location [x]

Ability for Vietnam Sach Va Xanh to 
- run reports on the outcomes of the different cleanup locations (# of volunteers, Amount of waste collected... other data.).  [x]

--------------------------
Apart from the basic requirements of the application, we have exeperiencing the followings to complete the assignment:
    - We use MERN Stack to build both front-end and backend of the application.
    - For the database services, we use MongoDB Atlas, that deploys our Database to AWS. 
    - We deploy the application via AWS Beanstalk with Nodejs environment
    - We bought a domain vietnamsachvaxanh.com on Route53.
    - We integrate SSL to our domain in AWS Beanstalk Load balancer configuration via AWS Certificate Manager (AWS ACM)
    - We have implemented the communication channel between admin (site owners) and users via Contact support. The text will be sent as an email to our email.
    - We have successfully implemented Facebook Login via Facebook Login API.
    - We have tried to implemented Caching with Redis. But we can only be able to demonstrate at local development environment only. In addition, we have successfuly implemented caching at front-end to offline viewing and slightly improve the loading speed of the homepage.

Contribution: 
Both of us have hands involved in both front-end and back-end development, however works are split like the following for management:
Tseng Chia Fu is responsible for front-end development with Reactjs and Google Map API.
Phu Vinh Luu is responsible for backend-development and AWS Deployment technologies.