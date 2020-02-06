// Model-View-Presenter
/**
 * Model
In which the data model for the widget is defined.

View
In which the logic behind the UI is handled, with UI events, data visualization and other UI centric logic.

Presenter
Where the logic behind the functionality of the widgets rests, such as data manipulation, data storing and loading, application events, etc…
 */

//  Creating a Task Widget

/**
 * The Model
I’ll start by defining a simple model for the task object:
 */

//models.js
function TaskModel(_text) {
  var ID = new Date().getTime();
  this.getID = function() {
    return ID;
  };
  var Text = _text;
  this.getText = function() {
    return Text;
  };
  this.setText = function(value) {
    Text = value;
  };
}

// taskPresenter.js
function TaskPresenter(_view) {
  var view;
  var model;

  function init() {
    view = _view;
    view.addCheckedHandler(function() {
      view.remove();
    });
  }

  var public = {
    getView: function() {
      return view;
    },
    setModel: function(_model) {
      model = _model;
      view.setModel(model);
    }
  };

  init();
  return public;
}

// taskView.js
function TaskView() {
  var html;

  function init() {
    html = $("<input type='checkbox'/><label></label></li>");
  }

  var public = {
    getHtml: function() {
      return html;
    },
    setModel: function(model) {
      html.find("input").attr("id", model.getID());
      html.find("label").attr("for", model.getID());
      html.find("label").html(model.getText());
    },
    addCheckedHandler: function(handler) {
      html.find("input").click(handler);
    },
    remove: function() {
      html.remove();
    }
  };

  init();
  return public;
}

/**
 * So I created a model, a presenter and a view for a single Task widget.
To use it, I need to do the following:
 */

var model = new TaskModel("Hello world!");
var task = new TaskPresenter(new TaskView());

task.setModel(model);

$("body").append(task.getView().getHtml());

// Creating a list widget for the tasks

// listPresenter.js
function ListPresenter(_view) {
  var view;
  var model;

  function init() {
    view = _view;

    view.addCreateTaskHandler(function(taskTitle) {
      var model = new TaskModel(taskTitle);
      var task = new TaskPresenter(new TaskView());
      task.setModel(model);

      view.addTask(task.getView());
    });
  }

  var public = {
    getView: function() {
      return view;
    }
  };

  init();
  return public;
}

// listView.js
function ListView() {
  var html;

  function init() {
    html = $(
      "<div>" +
        "<h1>Awesome MVP task list</h1>" +
        "<fieldset><legend>Don't forget!</legend>" +
        "<ul id='tasklist'></ul>" +
        "</fieldset>" +
        "<h2>Add a new task:</h2>" +
        "What do you need to do? <input id='taskinput' placeholder='I need to do…'/> <input id='submittask' type='submit' value='Add'/>" +
        "</div>"
    );
  }

  var public = {
    getHtml: function() {
      return html;
    },
    addCreateTaskHandler: function(handler) {
      html.find("#submittask").click(function() {
        var newTaskTitle = html.find("#taskinput").val();
        html.find("#taskinput").val("");
        handler(newTaskTitle);
      });
    },
    addTask: function(taskView) {
      html.find("#tasklist").append(taskView.getHtml());
    }
  };

  init();
  return public;
}

// Now what’s left is simply instantiate this object and add it to the HTML:
var list = new ListPresenter(new ListView());
$("body").append(list.getView().getHtml());
