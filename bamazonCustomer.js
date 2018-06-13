require('dotenv').config();
const mysql = require('mysql');
const keys = require('./keys')
const inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.PASSCODE,
    database: "bamazon"
  });

const read = () => {
    connection.query("SELECT * FROM products",function(err,res){
    if(err) throw err;
    console.log(res);
    });
};

const prompt = () => {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the item ID?",
        name: "prod_id"
    },
    {
        type: "input",
        message: "How much would you like to buy?",
        name: "prod_quant"
    }
    ]).then(function(response){
        const id = response.prod_id;
        const quantity = response.prod_quant;
        purchase(id,quantity);
    });
};

const purchase = (id,quantity) => {
    connection.query("SELECT * FROM products WHERE item_id = ?",[id],function(err,res){
        if(err) throw err;
        if(res[0].stock_quantity < quantity){
            console.log(`Insufficient Quantity`);
            connection.query("SELECT * FROM products WHERE item_id = ?",[id],function(err,res){
                if(err) throw err;
                console.log(`\n`);
                console.log(res);
                console.log(`\nInsufficient Quantity\n`);
                connection.end();
                });
        }
        else{
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[quantity,id],function(err,res){
            if (err) throw err;
            connection.query("SELECT * FROM products WHERE item_id = ?",[id],function(err,res){
                if(err) throw err;
                console.log(`\n`);
                console.log(res);
                console.log(`\nYour Total Price is $${Math.floor(res[0].price * quantity)}\n`);
                connection.end();
                });
            });
        }
    });
}

const script = () => {
    read();
    prompt();
};

script();