//Напишите программу, которая выводит через console.log все цифры от 1 до
//100, с двумя исключениями. Для чисел, нацело делящихся на 3, она должна
//выводить ‘Fizz’, а для чисел, делящихся на 5 (но не на 3) – ‘Buzz’.
//Когда сумеете – исправьте её так, чтобы она выводила «FizzBuzz» для всех
//чисел, которые делятся и на 3 и на 5

// autor code:

// for (var n = 1; n <= 100; n++) {
//     var output = "";
//     if (n % 3 == 0)
//       output += "Fizz";
//     if (n % 5 == 0)
//       output += "Buzz";
//     console.log(output || n);
//   }

// my code:

Fizz = "Fizz";
Buzz = "Buzz";
for (let i = 1; i <= 100; i++){
    if ((i)%3 == 0 && (i)%5 == 0) {
        console.log(Fizz+Buzz);
    } else if ((i)%3 == 0){
    console.log(Fizz);
    } else if ((i)%5 == 0) {
        console.log(Buzz);
    } else {
        console.log(i);
    }
}

// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19
// Buzz
// Fizz
// 22
// 23
// Fizz
// Buzz
// 26
// Fizz
// 28
// 29
// FizzBuzz
// 31
// 32
// Fizz
// 34
// Buzz
// Fizz
// 37
// 38
// Fizz
// Buzz
// 41
// Fizz
// 43
// 44
// FizzBuzz
// 46
// 47
// Fizz
// 49
// Buzz
// Fizz
// 52
// 53
// Fizz
// Buzz
// 56
// Fizz
// 58
// 59
// FizzBuzz
// 61
// 62
// Fizz
// 64
// Buzz
// Fizz
// 67
// 68
// Fizz
// Buzz
// 71
// Fizz
// 73
// 74
// FizzBuzz
// 76
// 77
// Fizz
// 79
// Buzz
// Fizz
// 82
// 83
// Fizz
// Buzz
// 86
// Fizz
// 88
// 89
// FizzBuzz
// 91
// 92
// Fizz
// 94
// Buzz
// Fizz
// 97
// 98
// Fizz
// Buzz