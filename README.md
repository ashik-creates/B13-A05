1. There are three ways to declare a variable in JS .var,const and let are three of them.
Before ES6 there was only var to declare variable.But it has some issues.
It is function scoped but not block scoped, if we use it in a if block
it leaks out. It is also hoisted we can use it before initialization
though its value is undefined. After ES6 update we can use 
two more keyword to declare variable one let is one of them . 
Although it is also hoisted but uninitialized which means we can't use it before initialization
if used it will give us a reference error , also we can reassign its value.
it block and function scoped. const is like let except we can't reassign its value 
but if assigned an array or object we can change its value.

2. A spread operator is a method introduced in ES6.
it is very powerful method which used in array or object. 
Commonly use it to clone or copy an array or object.
Naturally if we try to copy an array to another variable it will not be copied.
Because it is pointing in same reference in memory. So if we want to copy we can use spread operator like this,
const arr1 = [1, 2, 3, 4]
const arr2 = [...arr1] 
it will work.It is like spreading the items from a bag to another or 
flooring in a plate.

3. map(), filter(), forEach() are three array looping method of ES6.
If we want to do certain action with an array but not returning anything
we can use forEach() method .Because it will return undefined.
If we want a new array after certain action is done we can use map() method.
It will return a new array. If we want to filter out some element 
or from an array and return a new array we can use filter method.
It will return new array after filtering out the conditions.

4. An arrow function is a modern way of writing a function.
It is shorter than a regular function. Naturally if we want use 
a function we can declare it by function keyword.
But an arrow function can be declare with this => syntax.
most array method use arrow function .Also callback function 
can be arrow function. Also a regular function is hoisted but not arrow function.
We can't use it before initialization.

5. Template literals is a string method. It is introduced in ES6.
Instead of using single quote '' or double quote "" 
we use backticks `` to write it. We can add dynamic value 
using JS in a template literals. Before this we had to use + syntax to add JS variables.
Using backticks we write multiline string with ease.
We can use JS variables inside template literals using this ${} syntax.