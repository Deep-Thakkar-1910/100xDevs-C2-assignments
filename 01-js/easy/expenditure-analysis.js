/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  if(transactions.length<=0)return []; // if transactions array is empty
  const categoryWiseTransactions = []; 
  const priceMap = new Map();

  for (const transaction of transactions) { //Set total amount spent for each unique transaction
        const category  = transaction.category; 
        const price  = transaction.price;
        priceMap.set(category, (priceMap.get(category)||0)+price);
  }

  for(const [category, price] of [...priceMap.entries()]){ //destructuring categories and prices we get from entries of maps
    const obj  = {
      category: category,
      totalSpent: price
    }; // making an object for each category with category name and totalSpent price.

    categoryWiseTransactions.push(obj); //pushing it into the final array and returning it.
  }
  return categoryWiseTransactions;
}
module.exports = calculateTotalSpentByCategory;
