Students: Tseng Chia Fu - s3634996, Phu Vinh Luu - s3686970, Chau Phuoc Tuong - s3634247, Doan The Dang Khoa - s3517738
Course: Cloud Computing - COSC 2638 
Subject: Assignment 3 - Build a fullstack application
Lecturer: Dr. Nguyen Ngoc Thanh
Date: 9th January 2020

URL: vietnamsachvaxanh.com

Admin account:
        username: vncleangreen@gmail.com
        password: Test1234!


--------------------------
Functional requirements 
Apart from the functionality from assignment 2, we have implemented the following functionalities for assignment 3:

Page includes
- Toggle between map view and list view
- Overview of site when clicked on the location on map.
- "See more" button will lead to the detail page of that location.
- Have two of the biggest sponsor logo on both side of the map.

Ability for Clean Up Location Owners to 
- Create an account
- Have more details for previous assignment, adding Organisation info such as: decription, previous photo, agenda, date and time (date picker)
and Internal or External option for volunteers.
. Managing the clean up site:
- See list of volunteers
- Able to send volunteers notices through emails ( For each and for all)
- Edit Information of clean up site
- Can see volunteers’ total of equipment requirements
- Send amount of tools needed ( T-shirt, ToolKit, Full Set ) to vietnam Sach Va Xanh. (Number of tool kit, T-shirt and Full set)
. Fill in result of clean up event:
- Number of participants, weight of trash collected (kg), Number of every pieces of trash (Organic, Recycable, non-recycable) and add photos of event

- The join location will be close after the submission of result.

Additional requirement:
- Location owner is only able to create one location at one time.


Ability for Volunteers to 
- Join a clean up site with or without an account.
- Able to filter the location by area, name and time.
- [Non-logged in] The no account user will be able to join the clean up site after filling information. (Name, Email, Phone Number)
- [Login Only] Can request location owner for equipment

A resource page which includes tips and experiences, guideline documents, watch a guideline video.

Additional Requirement:
Ability for Vietnam Sach Va Xanh to 
- The admin account now has a button to change the status of a location to paid or not paid for requested equipment.
--------------------------
Apart from the basic requirements of the application, we have experiencing the followings to complete the assignment:
    A2:
    - We use MERN Stack to build both front-end and backend of the application.
    - For the database services, we use MongoDB Atlas, that deploys our Database to AWS. 
    - We deploy the application via AWS Beanstalk with Nodejs environment
    - We bought a domain vietnamsachvaxanh.com on Route53.
    - We integrate SSL to our domain in AWS Beanstalk Load balancer configuration via AWS Certificate Manager (AWS ACM)
    - We have implemented the communication channel between admin (site owners) and users via Contact support. The text will be sent as an email to our email.
    - We have successfully implemented Facebook Login via Facebook Login API.
    - We have tried to implemented Caching with Redis. But we can only be able to demonstrate at local development environment only. In addition, we have successfuly implemented caching at front-end to offline viewing and slightly improve the loading speed of the homepage.
    A3:
	- We rebuild the AWS Beanstalk environment from Nodejs to Docker
	- We wrote Dockerfile to build docker image for our directory, test run at locally and push to Docker Hub. We pull the images and run in the beanstalk Docker environment.
	- We use Lambda for 3 use cases: fetch location list, fetch location details and join location function.
	- We use S3 for photo uploading storage.

Contribution: 
4 of us have hands involved in both front-end and back-end development, however works are split like the following for management:
Tseng Chia Fu and Chau Phuoc Tuong are responsible for front-end development with Frontend.
Phu Vinh Luu and Doan The Dang Khoa are responsible for backend-development and DevOps(Docker, Lambda, Beanstalk etc.).

Guideline to start the project locally:
npm install - to install independencies
npm run dev - to start client and server
