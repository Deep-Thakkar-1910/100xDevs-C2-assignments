/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str=str.toLowerCase(); // converting to lower case to avoid problems with case-sensitivity.
  
  const cleanedString = str.replace(/\W/gi,""); // removing whitespaces and special characters to clean the string.
  
  let start  = 0 , end = cleanedString.length-1;
  
  while (start<=end) { // Two pointer approach.
    if(cleanedString[start] === cleanedString[end]){
      start++;
      end--;
    }else{ 
      return false; // if character is mismatching that means it's not a palindrome and it will return false immediately
    }
  }
  return true; // if whole loop executed that means it's a palindrome as all characters matched each other in reverse order and it will return true.
}

module.exports = isPalindrome;
