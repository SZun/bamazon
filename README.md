# Bamazon 

**To access the repo git clone to a folder of your choosing**

Create the database and table schema by running the **bamazonSEES.sql** file in your MySQL workbench or any other IDE of your choosing.

*cd* into the *bamazon* directory and run **npm i**

Once the packages are installed open your command line and run **node bamazonCustomer**

You will be shown the contents of the entire products table.

Then you will be presented with the inquirer prompt.

Enter one of the *item_id's* you see in the products table.

Then enter an ammount you wish to purchase.

If there is sufficient quantity you will be given a price for the products.

If there is insufficient quantiy you will be given a message reading "*Insifficient Quanity*"

Next, back in your CLI run **node bamazonManager**.

You will be presented with 4 options thorugh the inqiuirer prompt.

The first will again **show you the entire contents of the products table**.

The second will **show you products with a low inventory**.

The third will allow you to enter an *item_id* and then allow you to **add more inventory to the product**.

And the final option will prompt you to enter all fields necessary to **add a new product to the database**.

