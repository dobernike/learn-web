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
