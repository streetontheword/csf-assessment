-- TODO Task 3


drop database if exists ecommerce;

create database ecommerce; 

use ecommerce;

create table purchaseOrder (
    orderId char(128) not null, 
    name varchar(64) not null, 
    address varchar(256) not null,
    priority boolean default false,
    comments text,
    primary key(orderId)

);

create table cart (

id int auto_increment,  
productId varchar(128), 
name varchar(128), 
quantity int,
price float, 

orderId char(128) not null,


primary key(id),
constraint fk_email foreign key(orderId) references purchaseOrder(orderId)
    
);

