/* Напишите цикл, который за 7 вызовов console.log выводит такой треугольник:
#
##
###
####
#####
######
#######
*/

//autor code:

for (var line = "#"; line.length < 8; line += "#")
    console.log(line);

// my code: 

let x = "#";
for (let i = 1; i < 8; i++)
    console.log(x.repeat(i));


// #
// ##
// ###
// ####
// #####
// ######
// #######