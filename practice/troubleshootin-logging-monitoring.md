## Debugging

### Отладка JS на примере Chrome DevTools

[https://www.youtube.com/watch?v=kBHUEFYawTk](https://www.youtube.com/watch?v=kBHUEFYawTk)

Console.log

console.log(window) - медленный и бессмысленный console.log({a:1,b:2}) лучше

console.log игнорирует ваши геттеры

console.(log|warn|trace|...) - много разных методов и удобный сайдбар для их фильтрации

Асинхронный стек

вызов + stepInto

CPU profiler

помогает найти медленные части вашего приложения (сэмплирование)

Allocation sampling (вкладка memory)

Показывает, какая часть вашего приложения выделяет большую часть памяти

Allocation instrumentation (вкладка memory)

позволяет изолировать утечки памяти

eager evaluation (вывод результата сразу при вводе в консоле)

проверять regexp и новые фичи

step-into + workers

---

## Logging process

### Logging Errors in Client-Side Applications

[Logging Errors in Client-Side Applications - SitePoint](https://www.sitepoint.com/logging-errors-client-side-apps/)

console

    console.log()
    console.info()
    console.warn()
    console.error()

Enhancing the console

Logdown

[caiogondim/logdown.js](https://github.com/caiogondim/logdown.js)

    var uiLogger = new Logdown({prefix: 'MyApp:UI'});
    var networkServiceLogger = new Logdown({prefix: 'MyApp:Network'})

    Logdown.disable('MyApp:UI');
    Logdown.enable('MyApp:Network');
    Logdown.disable('MyApp:*'); // wildcards are supported, too

    var logger = new Logdown();
    logger.log('Page changed');
    logger.warn('XYZ has been deprecated in favour of 123');
    logger.info('Informational message here');
    logger.error('Server API not available!');

    var logger = new Logdown({markdown: true}); // Technically "markdown: true" isn't required; it's enabled by default
    logger.warn('_XYZ_ has been *deprecated* in favour of _123_');

console.message

[astoilkov/console.message](https://github.com/astoilkov/console.message)

Other Things to Consider

Capturing global errors

    window.onerror = function(message, file, line) {
      console.log('An error occured at line ' + line + ' of ' + file + ': ' + message);
    };

Stack traces

TraceKit

[csnover/TraceKit](https://github.com/csnover/TraceKit)

    TraceKit.report.subscribe(function yourLogger(errorReport) {
      //send via ajax to server, or use console.error in development
      //to get you started see: https://gist.github.com/4491219
    });

    try {
      /*
       * your application code here
       *
       */
      throw new Error('oops');
    } catch (e) {
      TraceKit.report(e); //error with stack trace gets normalized and sent to subscriber
    }

stacktrace.js

[StackTrace.JS](http://www.stacktracejs.com/)

    function log(data, level) {
      $.post(
        'https://your-app.com/api/logger',
        {
          context     :   navigator.userAgent,
          level       :   level || 'error',
          data         :   data,
          stack_trace :    printStackTrace()
        }
      );
    }

Logging Client-Side Errors to the Server

    function log(data, level) {
      $.post(
        'https://your-app.com/api/logger',
        {
          context   :   navigator.userAgent,
          level     :   level || 'error',
          data       :   data
        }
      );
    }

    try {
      // some function
    } catch (e) {
      log({
        error : e.message
      });
    }

    log('Informational message here', 'info');

Winston

[winstonjs/winston](https://github.com/winstonjs/winston)

    /**
     * Load the dependencies
     */
    var express = require( 'express' );
    var bodyParser = require('body-parser');
    var winston = require( 'winston' );

    /**
     * Create the Express app
     */
    var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * Instantiate the logger
     */
    var logger = new ( winston.Logger )({
      transports: [
        new ( winston.transports.Console )(
          {
            level: 'error'
          }
        ),
        new ( winston.transports.DailyRotateFile )(
          {
            filename: 'logs/client.log',
            datePattern: '.yyyy-MM-dd'
          }
        )
      ]
    });

    app.post ('/api/logger', function( req, res, next ) {

      logger.log(
        req.body.level || 'error',
        'Client: ' + req.body.data
      );

      return res.send( 'OK' );

    });

    var server = app.listen( 8080, function() {
      console.log( 'Listening on port %d', server.address().port );
    });

log4javascript

[stritti/log4js](https://github.com/stritti/log4js)

    var log = log4javascript.getLogger();
    var ajaxAppender = new log4javascript.AjaxAppender('http://example.com/api/logger');
    ajaxAppender.setThreshold(log4javascript.Level.ERROR);
    ajaxAppender.setBatchSize(10); // send in batches of 10
    ajaxAppender.setSendAllOnUnload(); // send all remaining messages on window.beforeunload()
    log.addAppender(ajaxAppender);

    ajaxAppender.setTimed(true);
    ajaxAppender.setTimerInterval(10000); // send every 10 seconds (unit is milliseconds)

---

### Best Practices for Client-Side Logging and Error Handling in React

[Best Practices for Client-Side Logging and Error Handling in React | Log Analysis | Log Monitoring by Loggly](https://www.loggly.com/blog/best-practices-for-client-side-logging-and-error-handling-in-react/)

Sending JSON Logs with Loglevel

[pimterry/loglevel](https://github.com/pimterry/loglevel)

[kutuluk/loglevel-plugin-remote](https://github.com/kutuluk/loglevel-plugin-remote)

    import log from 'loglevel';
    import remote from 'loglevel-plugin-remote';

    const customJSON = log => ({
     msg: log.message,
     level: log.level.label,
     stacktrace: log.stacktrace
    });

    remote.apply(log, { format: customJSON, url: '/logger' });

    log.enableAll();

    log.info('Message one');
    log.warn('Message two');

Handling Errors in React with Error Boundaries

    import React, { Component } from 'react';
    import log from 'loglevel';
    import remote from 'loglevel-plugin-remote';

    const customJSON = log => ({
    msg: log.message,
    level: log.level.label,
    stacktrace: log.stacktrace
    });

    remote.apply(log, { format: customJSON, url: '/logger' });
    log.enableAll();

    class ErrorBoundary extends Component {
     constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      // log the error to our server with loglevel
      log.error({ error, info });
    }

    render() {
     if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
     }

     return this.props.children;
    }
    }

    export default ErrorBoundary;

Using Loggly in React

Logger.js

    import { LogglyTracker } from 'loggly-jslogger';

    const logger = new LogglyTracker();

    logger.push({ 'logglyKey': 'YOUR CUSTOMER TOKEN HERE' });

    export default logger;

Error Boundary Component

    import React, { Component } from 'react';
    import logger from './logger';

    class ErrorBoundary extends Component {
     constructor(props) {
      super(props);
    this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      // log the error to loggly
      logger.push({ error, info });
    }

    render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
     }

     return this.props.children;
     }
    }

    export default ErrorBoundary;

Example: Tracking Page View Time

    import React, { Component } from 'react';
    import logger from './logger';

    let startDate;

    class ServicesPage extends Component {

     componentDidMount() {
       // initialize the start date on page load
       startDate = new Date();
    }

     componentWillUnmount() {
       // calculate the time since we loaded this page
       const timeSinceLoad = (new Date().getTime() - startDate.getTime()) / 1000

       // log it to Loggly!
       logger.push({
       tag: 'pagetime', // add a custom tag for sorting
       pageName: 'Services' // the name of this page for sorting
       timeSpentInSec: timeSinceLoad
      });
    }

    render() {
      return …
     }

    }

---

### beaver-logger

[krakenjs/beaver-logger](https://github.com/krakenjs/beaver-logger)

---

### Sentry

[Application Monitoring and Error Tracking Software](https://sentry.io/welcome/)

---

### TrackJS

[JavaScript Error Logging](https://trackjs.com/)

---

### LogRocket

[LogRocket | Logging and Session Replay for JavaScript Apps](https://logrocket.com/)

---

## Profiling

### Analyze Runtime Performance

[Analyze Runtime Performance | Tools for Web Developers](https://developers.google.com/web/tools/chrome-devtools/rendering-tools)

JS

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2efa37a1-eb12-43f4-8f7d-413c1cc066a6/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2efa37a1-eb12-43f4-8f7d-413c1cc066a6/Untitled.png)

CSS

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f389d684-c65b-458c-9508-4ac96c6dbb43/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f389d684-c65b-458c-9508-4ac96c6dbb43/Untitled.png)

---

## Profilers

### Профилирование JavaScript с Chrome Developer Tools

[Профилирование JavaScript с Chrome Developer Tools](https://habr.com/ru/post/149053/)

Профайлеры показывают, какие функции занимают больше всего времени.
Давайте сделаем первоначальный профиль, переключившись на вкладку
“Profiles”, где есть три типа профилирования:

1. **JavaScript CPU profile**
   Показывает, сколько времени процессора занимает наш JavaScript.
2. **CSS selector profile**
   Показывает сколько времени CPU занимает обработка CSS-селекторов
3. **Heap snapshot**
   Показывает, сколько памяти используют наши переменные в JavaScript

Профилирование JavaScript в вашем приложении

Настоящие приложения намного сложнее, чем этот сортировщик цветов, но их профилирование состоит из тех же шагов:

1. **Определите точку отсчёта**, чтобы вы знали, откуда стартуете.
2. **Изолируйте проблему**, отделив её от другого кода в приложении.
3. **Сделайте его быстрее** в контролируемом окружении с частым использованием timeline и профилирования.

Есть ещё некоторые правила при ускорении кода:

- **Начинайте с самых медленных частей**, для того чтобы получить максимальный эффект от затраченного времени на улучшение
- **Контролируйте окружение**. Если вы меняете компьютер, обновляете браузер или плагины, всегда считайте заново точку отсчёта.
- **Повторяйте анализ**, чтобы предотвратить влияние аномалий на результат.

---

### The 3 Types of Node.js Profilers You Should Know About

[The 3 Types of Node.js Profilers You Should Know About - DZone Performance](https://dzone.com/articles/the-3-types-of-nodejs-profilers-you-should-know-ab)

Standard Node.js Profilers

### Pros

- With Node.js, the periods between records are measured in _ticks_, which are conventional units.
- Some of the other metrics covered by tracing profilers include _total_, which is the total number of ticks (the time) covered during which a
  function was executed or an activity was performed. They also look at _Total%_, which is the ratio of a function's or activity's execution time relative to the entire time when the measurements were made.
- _Self_ refers to the pure execution time of a function or
  activity without considering the time spent on executing functions
  called by it. The _self%_ is a metric that measures the ratio of
  the pure execution time of a function or activity in relation to the
  entire time when the measurements were made.
- _Of parent_ refers to the ratio of the pure execution time of a function to the execution time of parent function that called it.
- Sampling profilers build call trees and display them in separate
  panes based on the collecting profiling data, which allows you to
  analyze the application execution from which calls were time-consuming
  (heavy), and by displaying the entire call hierarchy with the functions
  that serve as execution entry points at the top.

### Cons

- Stopping and restarting profiling during the execution of an
  application is not supported, requiring you to wait until it has
  processed.
- Sampling profilers do not offer great accuracy or precision as
  snapshots are taken at random moments. This means that any function can
  happen to be recorded in a snapshot, without it necessarily fully
  detailing the pressing issues in your application.
- Sampling can give you a rough picture of where most of the time is spent, but accuracy is not its strong suit.
- This type of profiling can also cause delays in the execution, influencing the profiling results.

Node.js Tracing Profilers

### Pros

- These can measure a number of metrics that include call times, memory usage and object allocations.
- They are relatively easy to set up.
- With tracing profilers, you get exact measurements of how much
  time each method took, offering you a more comprehensive debugging
  experience.
- Plus, this tool allows you to count how many times the traced method was called.

### Cons

- They consist of a fixed amount of every function call or line of code executed, which can lead you to make incorrect decisions.
- These profilers have a limit to what they can monitor, and they
  can slow down your program considerably due to how comprehensive it is.
- Having more data also means a bigger result distortion compared to sampling.
- Tracing also means that the profiling delay depends on the code
  and the places where you made tracing measurements. If a traced method
  is called inside other traced methods at the same time, all inner delays will be amassed for the outer method, which could make it difficult to
  separate the execution time from tracing distortion.

APM Node.js Profilers

[Top 18 APM & Application Monitoring Tools Comparison](https://stackify.com/application-performance-management-tools/)

### Pros

- These find and fix memory leaks and CPU bottlenecks.
- They debug distributed transactions with end-to-end (E2E) tracing.
- They can trace distributed call-chains.
- Help to avoid security leaks and bad npm packages.
- Gain specific line-of-code visibility to pinpoint even the smallest errors with error stack traces.
- Get alerts on application errors and exceptions, and fix these before they affect your program.

### Cons

- These customized applications are not as intuitive as the other
  ones, and they are also not as renowned, requiring some time for the
  user to learn them.
- You may have to wait for enough data points to come in before you stop seeing false positives, which may happen frequently.

---

### Profiling with the Firefox Profiler

[Profiling with the Firefox Profiler](https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Profiling_with_the_Built-in_Profiler)

---

## Логирование событий на клиенте. Зачем, почему, как

### Логирование на клиенте

[Логирование на клиенте](https://www.appcode.pw/?p=1246)

---

### Мониторинг JavaScript-ошибок с помощью window.onerror

[Мониторинг JavaScript-ошибок с помощью window.onerror](https://habr.com/ru/company/ruvds/blog/413173/)

подходящий инструмент для мониторинга JS-ошибок. Среди таких инструментов — Sentry, Rollbar, TrackJS и другие подобные проекты.
