Student Name: Nguyen Hoang Chuong
Student ID: s3651318
Course: Cloud Computing - COSC 2638
Lecturer: Dr. Nguyen Ngoc Thanh

Front-end URL: phuchuong.com
Bach-end URL: hoangchuong2598.com

I have finished all requirement using ReactJS and NodeJS:
    - User can sign up for an account
    - Admin CRUD
    - User learn
    - Use Amazon Beanstalk to run backend
    - Use Amazon RDS to store data
    - Integrate SSL to website for both backend and frontend
    - Send emails to users to encourage them to use the system everyday
    - Memcached
    - Uses Speech Engine to allow users to record their voice and compare with the standard voice 

The list below describes the services I used
    - Amazon Cognito: User management, including login, logout and signup
    - RDS Database: Admin CRUD and Memcached
    - Beanstalk: Used to deploy Backend
    - S3: Used to deploy front-end and to store word pronunciations (mp3 files)
    - Cloudfront: Used to integrate SSL certificate
    - SES: Used to send email to user everyday
    - Amazon Polly: Used To make a sample pronunciations (text-to-speech)
    - Web Speech API(not Amazon service): Record User voice and convert to text (speech-to-text). This service only supports Google Chrome browser
    Other services: Route 53, Amazon Certificate Management

Admin Account: chuong123	Password: vippro123
User Account: test1		Password: vippro123
