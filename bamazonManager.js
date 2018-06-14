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
    connection.end();
    });
};

const readNew = (id) => {
    connection.query("SELECT * FROM products WHERE item_id = ?",[id],function(err,res){
    if(err) throw err;
    console.log(res);
    connection.end();
    });
};

const lowInventory = () => {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5",function(err,res){
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}

const addInventory = () => {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the item ID?",
        name: "prod_id"
    },
    {
        type: "input",
        message: "How much inventory would you like to add?",
        name: "prod_quant"
    }
    ]).then(function(response,id,quantity){
         id = response.prod_id;
         quantity = response.prod_quant;
        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",[quantity,id],function(err,res){
        if (err) throw err;
        connection.query("SELECT * FROM products WHERE item_id = ?",[id],function(err,res){
            if(err) throw err;
            console.log(`\n`);
            console.log(res);
            console.log(`\n`);
            connection.end();
            });
        });
    });
}

const addNewProduct = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product?",
            name: "prod_id"
        },
        {
            type: "input",
            message: "What is the name of the product?",
            name: "prod_name"
        },
        {
            type: "input",
            message: "What department is this product in?",
            name: "prod_department"
        },
        {
            type: "input",
            message: "What is the per unit price of this product?",
            name: "prod_price"
        },
        {
            type: "input",
            message: "How much of this product is in stock?",
            name: "prod_quant"
        }
    ]).then(function(res,id,name,department,price,quant){
        id = res.prod_id;
        department = res.prod_department;
        name = res.prod_name;
        price = res.prod_price;
        quant = res.prod_quant;
        connection.query("INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)" + 
        "VALUES (?,?,?,?,?)",
        [id,name,department,price,quant])
        readNew(id)
    })  
}

const prompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "manager",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }
    ]).then(function(res){
        switch(res.manager){
            case "View Products for Sale":
                read();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct()
                break;
            default:
                console.log('Invalid Response');
                break;
        }
    })
}

const script = () => {
    prompt();
}

script();