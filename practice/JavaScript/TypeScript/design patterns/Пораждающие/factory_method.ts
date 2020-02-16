// Фабричный метод
/**
 * Класс Создатель объявляет фабричный метод, который должен возвращать объект
 * класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого
 * метода.
 */
abstract class Creator {
  /**
   * Обратите внимание, что Создатель может также обеспечить реализацию
   * фабричного метода по умолчанию.
   */
  public abstract factoryMethod(): Product;

  /**
   * Также заметьте, что, несмотря на название, основная обязанность Создателя
   * не заключается в создании продуктов. Обычно он содержит некоторую базовую
   * бизнес-логику, которая основана на объектах Продуктов, возвращаемых
   * фабричным методом. Подклассы могут косвенно изменять эту бизнес-логику,
   * переопределяя фабричный метод и возвращая из него другой тип продукта.
   */
  public someOperation(): string {
    // Вызываем фабричный метод, чтобы получить объект-продукт.
    const product = this.factoryMethod();
    // Далее, работаем с этим продуктом.
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/**
 * Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
 * тип результирующего продукта.
 */
class ConcreteProduct1 implements Product {
  public operation(): string {
    return "{Result of the ConcreteProduct1}";
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return "{Result of the ConcreteProduct2}";
  }
}

/**
 * Клиентский код работает с экземпляром конкретного создателя, хотя и через его
 * базовый интерфейс. Пока клиент продолжает работать с создателем через базовый
 * интерфейс, вы можете передать ему любой подкласс создателя.
 */
function clientCode(creator: Creator) {
  // ...
  console.log(
    "Client: I'm not aware of the creator's class, but it still works."
  );
  console.log(creator.someOperation());
  // ...
}

/**
 * Приложение выбирает тип создателя в зависимости от конфигурации или среды.
 */
console.log("App: Launched with the ConcreteCreator1.");
clientCode(new ConcreteCreator1());
console.log("");

console.log("App: Launched with the ConcreteCreator2.");
clientCode(new ConcreteCreator2());
