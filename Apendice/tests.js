function map(f, a) { // passamos uma função 'f' e um array 'a'
  const result = new Array(a.length); // o 'new' é a keyword que cria um objeto e todo Array tem um método length que retorna o tamanho
  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]); // populamos o 'result' com o resultado da função 'f' chamada em cada termo do array 'a'
  }
  return result;
}
const numbers = [0, 1, 2, 5, 10]; // esse é nosso array 'a'
const cubedNumbers = map(x => x * x * x, numbers); 
 // colocamos a função direto no parâmetro
console.log(cubedNumbers); // [0, 1, 8, 125, 1000]