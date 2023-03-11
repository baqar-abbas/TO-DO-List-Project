"use strict";
(self["webpackChunkto_do_list_project"] = self["webpackChunkto_do_list_project"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./status.js */ "./src/status.js");
/* harmony import */ var _images_select_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/select.png */ "./images/select.png");
/* harmony import */ var _images_delete_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/delete.png */ "./images/delete.png");
/* harmony import */ var _images_refresh_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/refresh.png */ "./images/refresh.png");
/* harmony import */ var _images_edit_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/edit.jpg */ "./images/edit.jpg");







const container = document.getElementById('container');
const form = document.querySelector('form');
const ul = document.querySelector('.todoList');
form.innerHTML = `
<label class="title"
>Today's To Do <img class="refresh" src=${_images_refresh_png__WEBPACK_IMPORTED_MODULE_5__} alt="refresh"
/></label>
<input
class="inputText"
placeholder="Add to your list..."
type="text"
/>
`;
const btnDeleteAll = document.createElement('button');
btnDeleteAll.setAttribute('class', 'delete-all');
btnDeleteAll.textContent = 'Clear all completed';
container.append(btnDeleteAll);
const display = () => {
  _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.sort((a, b) => a.index - b.index);
  ul.innerHTML = ''; // clear the list before re-rendering it
  for (let i = 0; i < _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.length; i += 1) {
    const node = document.createElement('li');
    node.setAttribute('class', 'todo-item');
    node.setAttribute('data-key', _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[i].index);
    node.setAttribute('class', 'todo-item editable');
    node.innerHTML = ` 
        <input class="checkbox" id="${_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[i].index}" type="checkbox"/>
        <label for="${_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[i].index}" class="option">
            <img class="select" src=${_images_select_png__WEBPACK_IMPORTED_MODULE_3__} alt=""/>
            <img class="delete" src=${_images_delete_png__WEBPACK_IMPORTED_MODULE_4__} alt=""/>
            <img class="edit" src=${_images_edit_jpg__WEBPACK_IMPORTED_MODULE_6__} alt="edittext"/>
        </label>
        <input class="items" type="text" value="${_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[i].text}" readonly />

    `;
    ul.append(node);

    // Get the selectdots, deleteoption, and editoption elements for this task
    const selectdots = node.querySelector('.select');
    const deleteoption = node.querySelector('.delete');
    const editoption = node.querySelector('.edit');
    // Get the checkbox element for this task
    const checkbox = node.querySelector('.checkbox');

    // Add event listener for completing a task
    checkbox.addEventListener('change', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const completed = checkbox.checked;
      (0,_status_js__WEBPACK_IMPORTED_MODULE_2__["default"])(itemKey, completed);
      // Find the text element for this task
      // Add line-through style to the text when checkbox is checked
      if (completed) {
        node.querySelector('.items').style.textDecoration = 'line-through';
      } else {
        node.querySelector('.items').style.textDecoration = 'none';
      }
    });
    const clearCompletedTasks = () => {
      const uncompletedTasks = _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.filter(item => !item.completed);
      _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.length = 0;
      _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.push(...uncompletedTasks);
      for (let i = 0; i < uncompletedTasks.length; i += 1) {
        uncompletedTasks[i].index = i + 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems));
      display();
    };
    btnDeleteAll.addEventListener('click', () => {
      clearCompletedTasks();
    });

    // Add event listeners to show the delete/edit options when the user clicks on the selectdots
    selectdots.addEventListener('click', () => {
      selectdots.style.display = 'none';
      deleteoption.style.display = 'block';
      editoption.style.display = 'block';
    });

    // Add event listener for deleting a task
    deleteoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.findIndex(item => item.index === itemKey);
      _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.splice(itemIndex, 1);

      // Re-index the remaining tasks
      for (let i = itemIndex; i < _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.length; i += 1) {
        _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[i].index = i + 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems));
      display();
    });
    editoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems.findIndex(item => item.index === itemKey);

      // Toggle the readonly attribute on the input element
      const inputElement = node.querySelector('.items');
      inputElement.readOnly = !inputElement.readOnly;

      // Toggle the editable class on the li element
      node.classList.toggle('editable');

      // If the input element is now editable, focus on it
      if (!inputElement.readOnly) {
        inputElement.focus();
      }

      // If the user presses the Enter key while editing the input element, update the task text
      inputElement.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          const newTaskText = inputElement.value;
          _todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[itemIndex].text = newTaskText;
          localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems));
          display();
        }
      });

      // Add an event listener to the input element to toggle the editable class on the li element
      inputElement.addEventListener('blur', () => {
        node.classList.remove('editable');
      });
    });
  }
};
window.onload = display();

// Set up form submit event listener to add a new task
form.addEventListener('submit', e => {
  e.preventDefault();
  const inputText = document.querySelector('.inputText');
  const text = inputText.value.trim();
  if (text !== '') {
    (0,_todo_js__WEBPACK_IMPORTED_MODULE_1__.addTask)(text);
    inputText.value = '';
    ul.innerHTML = '';
    display();
  }
});

/***/ }),

/***/ "./src/status.js":
/*!***********************!*\
  !*** ./src/status.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");

const updateCompletedStatus = (index, completed) => {
  const task = _todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems.find(item => item.index === index);
  task.completed = completed;
  localStorage.setItem('todoItems', JSON.stringify(_todo_js__WEBPACK_IMPORTED_MODULE_0__.todoItems));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateCompletedStatus);

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "todoItems": () => (/* binding */ todoItems)
/* harmony export */ });
// Load tasks from local storage, or use an empty array if none exists
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
const addTask = text => {
  const newTask = {
    text,
    completed: false,
    index: todoItems.length + 1
  };
  todoItems.push(newTask);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#container {\r\n  left: 30%;\r\n  position: relative;\r\n  top: 50px;\r\n  width: 30%;\r\n  border: 1px solid wheat;\r\n  padding: 20px 20px 0 20px;\r\n}\r\n\r\n.title {\r\n  display: block;\r\n  font-size: 24px;\r\n}\r\n\r\n.refresh {\r\n  float: right;\r\n  position: relative;\r\n  top: 3px;\r\n}\r\n\r\n.inputText {\r\n  margin-top: 15px;\r\n  width: 108%;\r\n  height: 40px;\r\n  position: relative;\r\n  left: -20px;\r\n  font-size: 18px;\r\n  border: 1px solid wheat;\r\n  border-left: none;\r\n  border-right: none;\r\n}\r\n\r\n::placeholder {\r\n  font-style: italic;\r\n  position: relative;\r\n  left: 15px;\r\n}\r\n\r\n.todo-item {\r\n  text-decoration: none;\r\n  min-height: 27px;\r\n  width: 105%;\r\n  border-bottom: 1px solid wheat;\r\n  list-style: none;\r\n  font-size: 20px;\r\n  padding: 13px 10px;\r\n  left: -20px;\r\n  position: relative;\r\n}\r\n\r\n.option {\r\n  float: right;\r\n}\r\n\r\n.delete {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.edit {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.items {\r\n  margin-left: 15px;\r\n  top: 5px;\r\n  border: none;\r\n  font-size: 16px;\r\n}\r\n\r\n.select {\r\n  display: block;\r\n}\r\n\r\n.delete-all {\r\n  height: 50px;\r\n  width: 109%;\r\n  position: relative;\r\n  top: 0;\r\n  left: -20px;\r\n  border-style: none;\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,WAAW;EACX,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,QAAQ;EACR,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":["#container {\r\n  left: 30%;\r\n  position: relative;\r\n  top: 50px;\r\n  width: 30%;\r\n  border: 1px solid wheat;\r\n  padding: 20px 20px 0 20px;\r\n}\r\n\r\n.title {\r\n  display: block;\r\n  font-size: 24px;\r\n}\r\n\r\n.refresh {\r\n  float: right;\r\n  position: relative;\r\n  top: 3px;\r\n}\r\n\r\n.inputText {\r\n  margin-top: 15px;\r\n  width: 108%;\r\n  height: 40px;\r\n  position: relative;\r\n  left: -20px;\r\n  font-size: 18px;\r\n  border: 1px solid wheat;\r\n  border-left: none;\r\n  border-right: none;\r\n}\r\n\r\n::placeholder {\r\n  font-style: italic;\r\n  position: relative;\r\n  left: 15px;\r\n}\r\n\r\n.todo-item {\r\n  text-decoration: none;\r\n  min-height: 27px;\r\n  width: 105%;\r\n  border-bottom: 1px solid wheat;\r\n  list-style: none;\r\n  font-size: 20px;\r\n  padding: 13px 10px;\r\n  left: -20px;\r\n  position: relative;\r\n}\r\n\r\n.option {\r\n  float: right;\r\n}\r\n\r\n.delete {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.edit {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.items {\r\n  margin-left: 15px;\r\n  top: 5px;\r\n  border: none;\r\n  font-size: 16px;\r\n}\r\n\r\n.select {\r\n  display: block;\r\n}\r\n\r\n.delete-all {\r\n  height: 50px;\r\n  width: 109%;\r\n  position: relative;\r\n  top: 0;\r\n  left: -20px;\r\n  border-style: none;\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./images/delete.png":
/*!***************************!*\
  !*** ./images/delete.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0484fb5a0c6903b28b2b.png";

/***/ }),

/***/ "./images/edit.jpg":
/*!*************************!*\
  !*** ./images/edit.jpg ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "11c04825479be83e1de7.jpg";

/***/ }),

/***/ "./images/refresh.png":
/*!****************************!*\
  !*** ./images/refresh.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "95fe9ff30905b13de203.png";

/***/ }),

/***/ "./images/select.png":
/*!***************************!*\
  !*** ./images/select.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a70d8793503778e2a955.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXFCO0FBQzBCO0FBQ0M7QUFDTDtBQUNBO0FBQ0M7QUFDTjtBQUV0QyxNQUFNTyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFdBQVcsQ0FBQztBQUN0RCxNQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE1BQU0sQ0FBQztBQUMzQyxNQUFNQyxFQUFFLEdBQUdKLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUM5Q0QsSUFBSSxDQUFDRyxTQUFTLEdBQUk7QUFDbEI7QUFDQSwwQ0FBMENSLGdEQUFRO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFFRCxNQUFNUyxZQUFZLEdBQUdOLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUNyREQsWUFBWSxDQUFDRSxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztBQUNoREYsWUFBWSxDQUFDRyxXQUFXLEdBQUcscUJBQXFCO0FBQ2hEVixTQUFTLENBQUNXLE1BQU0sQ0FBQ0osWUFBWSxDQUFDO0FBRTlCLE1BQU1LLE9BQU8sR0FBR0EsQ0FBQSxLQUFNO0VBQ3BCbEIsb0RBQWMsQ0FBQyxDQUFDb0IsQ0FBQyxFQUFFQyxDQUFDLEtBQUtELENBQUMsQ0FBQ0UsS0FBSyxHQUFHRCxDQUFDLENBQUNDLEtBQUssQ0FBQztFQUMzQ1gsRUFBRSxDQUFDQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDbkIsS0FBSyxJQUFJVyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd2QixzREFBZ0IsRUFBRXVCLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDNUMsTUFBTUUsSUFBSSxHQUFHbEIsUUFBUSxDQUFDTyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ3pDVyxJQUFJLENBQUNWLFlBQVksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO0lBQ3ZDVSxJQUFJLENBQUNWLFlBQVksQ0FBQyxVQUFVLEVBQUVmLCtDQUFTLENBQUN1QixDQUFDLENBQUMsQ0FBQ0QsS0FBSyxDQUFDO0lBQ2pERyxJQUFJLENBQUNWLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUM7SUFFaERVLElBQUksQ0FBQ2IsU0FBUyxHQUFJO0FBQ3RCLHNDQUFzQ1osK0NBQVMsQ0FBQ3VCLENBQUMsQ0FBQyxDQUFDRCxLQUFNO0FBQ3pELHNCQUFzQnRCLCtDQUFTLENBQUN1QixDQUFDLENBQUMsQ0FBQ0QsS0FBTTtBQUN6QyxzQ0FBc0NwQiwrQ0FBUTtBQUM5QyxzQ0FBc0NDLCtDQUFRO0FBQzlDLG9DQUFvQ0UsNkNBQUs7QUFDekM7QUFDQSxrREFBa0RMLCtDQUFTLENBQUN1QixDQUFDLENBQUMsQ0FBQ0csSUFBSztBQUNwRTtBQUNBLEtBQUs7SUFDRGYsRUFBRSxDQUFDTSxNQUFNLENBQUNRLElBQUksQ0FBQzs7SUFFZjtJQUNBLE1BQU1FLFVBQVUsR0FBR0YsSUFBSSxDQUFDZixhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ2hELE1BQU1rQixZQUFZLEdBQUdILElBQUksQ0FBQ2YsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUNsRCxNQUFNbUIsVUFBVSxHQUFHSixJQUFJLENBQUNmLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDOUM7SUFDQSxNQUFNb0IsUUFBUSxHQUFHTCxJQUFJLENBQUNmLGFBQWEsQ0FBQyxXQUFXLENBQUM7O0lBRWhEO0lBQ0FvQixRQUFRLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNO01BQ3hDLE1BQU1DLE9BQU8sR0FBR0MsUUFBUSxDQUFDUixJQUFJLENBQUNTLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUM7TUFDM0QsTUFBTUMsU0FBUyxHQUFHTCxRQUFRLENBQUNNLE9BQU87TUFDbENuQyxzREFBcUIsQ0FBQytCLE9BQU8sRUFBRUcsU0FBUyxDQUFDO01BQ3pDO01BQ0E7TUFDQSxJQUFJQSxTQUFTLEVBQUU7UUFDYlYsSUFBSSxDQUFDZixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMyQixLQUFLLENBQUNDLGNBQWMsR0FBRyxjQUFjO01BQ3BFLENBQUMsTUFBTTtRQUNMYixJQUFJLENBQUNmLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzJCLEtBQUssQ0FBQ0MsY0FBYyxHQUFHLE1BQU07TUFDNUQ7SUFDRixDQUFDLENBQUM7SUFFRixNQUFNQyxtQkFBbUIsR0FBR0EsQ0FBQSxLQUFNO01BQ2hDLE1BQU1DLGdCQUFnQixHQUFHeEMsc0RBQWdCLENBQUUwQyxJQUFJLElBQUssQ0FBQ0EsSUFBSSxDQUFDUCxTQUFTLENBQUM7TUFDcEVuQyxzREFBZ0IsR0FBRyxDQUFDO01BQ3BCQSxvREFBYyxDQUFDLEdBQUd3QyxnQkFBZ0IsQ0FBQztNQUNuQyxLQUFLLElBQUlqQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdpQixnQkFBZ0IsQ0FBQ2hCLE1BQU0sRUFBRUQsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuRGlCLGdCQUFnQixDQUFDakIsQ0FBQyxDQUFDLENBQUNELEtBQUssR0FBR0MsQ0FBQyxHQUFHLENBQUM7TUFDbkM7TUFDQXFCLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLFdBQVcsRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUMvQywrQ0FBUyxDQUFDLENBQUM7TUFDNURrQixPQUFPLEVBQUU7SUFDWCxDQUFDO0lBRURMLFlBQVksQ0FBQ2tCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQzNDUSxtQkFBbUIsRUFBRTtJQUN2QixDQUFDLENBQUM7O0lBRUY7SUFDQVosVUFBVSxDQUFDSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUN6Q0osVUFBVSxDQUFDVSxLQUFLLENBQUNuQixPQUFPLEdBQUcsTUFBTTtNQUNqQ1UsWUFBWSxDQUFDUyxLQUFLLENBQUNuQixPQUFPLEdBQUcsT0FBTztNQUNwQ1csVUFBVSxDQUFDUSxLQUFLLENBQUNuQixPQUFPLEdBQUcsT0FBTztJQUNwQyxDQUFDLENBQUM7O0lBRUY7SUFDQVUsWUFBWSxDQUFDRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUMzQyxNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ1IsSUFBSSxDQUFDUyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDO01BQzNELE1BQU1jLFNBQVMsR0FBR2hELHlEQUFtQixDQUFFMEMsSUFBSSxJQUFLQSxJQUFJLENBQUNwQixLQUFLLEtBQUtVLE9BQU8sQ0FBQztNQUN2RWhDLHNEQUFnQixDQUFDZ0QsU0FBUyxFQUFFLENBQUMsQ0FBQzs7TUFFOUI7TUFDQSxLQUFLLElBQUl6QixDQUFDLEdBQUd5QixTQUFTLEVBQUV6QixDQUFDLEdBQUd2QixzREFBZ0IsRUFBRXVCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcER2QiwrQ0FBUyxDQUFDdUIsQ0FBQyxDQUFDLENBQUNELEtBQUssR0FBR0MsQ0FBQyxHQUFHLENBQUM7TUFDNUI7TUFFQXFCLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLFdBQVcsRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUMvQywrQ0FBUyxDQUFDLENBQUM7TUFDNURrQixPQUFPLEVBQUU7SUFDWCxDQUFDLENBQUM7SUFFRlcsVUFBVSxDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUN6QyxNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ1IsSUFBSSxDQUFDUyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDO01BQzNELE1BQU1jLFNBQVMsR0FBR2hELHlEQUFtQixDQUFFMEMsSUFBSSxJQUFLQSxJQUFJLENBQUNwQixLQUFLLEtBQUtVLE9BQU8sQ0FBQzs7TUFFdkU7TUFDQSxNQUFNbUIsWUFBWSxHQUFHMUIsSUFBSSxDQUFDZixhQUFhLENBQUMsUUFBUSxDQUFDO01BQ2pEeUMsWUFBWSxDQUFDQyxRQUFRLEdBQUcsQ0FBQ0QsWUFBWSxDQUFDQyxRQUFROztNQUU5QztNQUNBM0IsSUFBSSxDQUFDNEIsU0FBUyxDQUFDQyxNQUFNLENBQUMsVUFBVSxDQUFDOztNQUVqQztNQUNBLElBQUksQ0FBQ0gsWUFBWSxDQUFDQyxRQUFRLEVBQUU7UUFDMUJELFlBQVksQ0FBQ0ksS0FBSyxFQUFFO01BQ3RCOztNQUVBO01BQ0FKLFlBQVksQ0FBQ3BCLGdCQUFnQixDQUFDLFNBQVMsRUFBR3lCLEtBQUssSUFBSztRQUNsRCxJQUFJQSxLQUFLLENBQUNDLEdBQUcsS0FBSyxPQUFPLEVBQUU7VUFDekIsTUFBTUMsV0FBVyxHQUFHUCxZQUFZLENBQUNRLEtBQUs7VUFDdEMzRCwrQ0FBUyxDQUFDZ0QsU0FBUyxDQUFDLENBQUN0QixJQUFJLEdBQUdnQyxXQUFXO1VBQ3ZDZCxZQUFZLENBQUNDLE9BQU8sQ0FBQyxXQUFXLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDL0MsK0NBQVMsQ0FBQyxDQUFDO1VBQzVEa0IsT0FBTyxFQUFFO1FBQ1g7TUFDRixDQUFDLENBQUM7O01BRUY7TUFDQWlDLFlBQVksQ0FBQ3BCLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO1FBQzFDTixJQUFJLENBQUM0QixTQUFTLENBQUNPLE1BQU0sQ0FBQyxVQUFVLENBQUM7TUFDbkMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0o7QUFDRixDQUFDO0FBRURDLE1BQU0sQ0FBQ0MsTUFBTSxHQUFHNUMsT0FBTyxFQUFFOztBQUV6QjtBQUNBVCxJQUFJLENBQUNzQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUdnQyxDQUFDLElBQUs7RUFDckNBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO0VBQ2xCLE1BQU1DLFNBQVMsR0FBRzFELFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFlBQVksQ0FBQztFQUN0RCxNQUFNZ0IsSUFBSSxHQUFHdUMsU0FBUyxDQUFDTixLQUFLLENBQUNPLElBQUksRUFBRTtFQUNuQyxJQUFJeEMsSUFBSSxLQUFLLEVBQUUsRUFBRTtJQUNmM0IsaURBQU8sQ0FBQzJCLElBQUksQ0FBQztJQUNidUMsU0FBUyxDQUFDTixLQUFLLEdBQUcsRUFBRTtJQUNwQmhELEVBQUUsQ0FBQ0MsU0FBUyxHQUFHLEVBQUU7SUFDakJNLE9BQU8sRUFBRTtFQUNYO0FBQ0YsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN6Sm9DO0FBRXRDLE1BQU1qQixxQkFBcUIsR0FBR0EsQ0FBQ3FCLEtBQUssRUFBRWEsU0FBUyxLQUFLO0VBQ2xELE1BQU1nQyxJQUFJLEdBQUduRSxvREFBYyxDQUFFMEMsSUFBSSxJQUFLQSxJQUFJLENBQUNwQixLQUFLLEtBQUtBLEtBQUssQ0FBQztFQUMzRDZDLElBQUksQ0FBQ2hDLFNBQVMsR0FBR0EsU0FBUztFQUMxQlMsWUFBWSxDQUFDQyxPQUFPLENBQUMsV0FBVyxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQy9DLCtDQUFTLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBQ0QsaUVBQWVDLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7O0FDUHBDO0FBQ0EsTUFBTUQsU0FBUyxHQUFHOEMsSUFBSSxDQUFDdUIsS0FBSyxDQUFDekIsWUFBWSxDQUFDMEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRTtBQUVyRSxNQUFNdkUsT0FBTyxHQUFJMkIsSUFBSSxJQUFLO0VBQ3hCLE1BQU02QyxPQUFPLEdBQUc7SUFDZDdDLElBQUk7SUFDSlMsU0FBUyxFQUFFLEtBQUs7SUFDaEJiLEtBQUssRUFBRXRCLFNBQVMsQ0FBQ3dCLE1BQU0sR0FBRztFQUM1QixDQUFDO0VBQ0R4QixTQUFTLENBQUMyQyxJQUFJLENBQUM0QixPQUFPLENBQUM7RUFDdkIzQixZQUFZLENBQUNDLE9BQU8sQ0FBQyxXQUFXLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDL0MsU0FBUyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hEO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxzREFBc0QsZ0JBQWdCLHlCQUF5QixnQkFBZ0IsaUJBQWlCLDhCQUE4QixnQ0FBZ0MsS0FBSyxnQkFBZ0IscUJBQXFCLHNCQUFzQixLQUFLLGtCQUFrQixtQkFBbUIseUJBQXlCLGVBQWUsS0FBSyxvQkFBb0IsdUJBQXVCLGtCQUFrQixtQkFBbUIseUJBQXlCLGtCQUFrQixzQkFBc0IsOEJBQThCLHdCQUF3Qix5QkFBeUIsS0FBSyx1QkFBdUIseUJBQXlCLHlCQUF5QixpQkFBaUIsS0FBSyxvQkFBb0IsNEJBQTRCLHVCQUF1QixrQkFBa0IscUNBQXFDLHVCQUF1QixzQkFBc0IseUJBQXlCLGtCQUFrQix5QkFBeUIsS0FBSyxpQkFBaUIsbUJBQW1CLEtBQUssaUJBQWlCLG9CQUFvQixrQkFBa0IsbUJBQW1CLEtBQUssZUFBZSxvQkFBb0Isa0JBQWtCLG1CQUFtQixLQUFLLGdCQUFnQix3QkFBd0IsZUFBZSxtQkFBbUIsc0JBQXNCLEtBQUssaUJBQWlCLHFCQUFxQixLQUFLLHFCQUFxQixtQkFBbUIsa0JBQWtCLHlCQUF5QixhQUFhLGtCQUFrQix5QkFBeUIsS0FBSyxZQUFZLHlCQUF5QixLQUFLLFdBQVcsZ0ZBQWdGLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLHNDQUFzQyxnQkFBZ0IseUJBQXlCLGdCQUFnQixpQkFBaUIsOEJBQThCLGdDQUFnQyxLQUFLLGdCQUFnQixxQkFBcUIsc0JBQXNCLEtBQUssa0JBQWtCLG1CQUFtQix5QkFBeUIsZUFBZSxLQUFLLG9CQUFvQix1QkFBdUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsa0JBQWtCLHNCQUFzQiw4QkFBOEIsd0JBQXdCLHlCQUF5QixLQUFLLHVCQUF1Qix5QkFBeUIseUJBQXlCLGlCQUFpQixLQUFLLG9CQUFvQiw0QkFBNEIsdUJBQXVCLGtCQUFrQixxQ0FBcUMsdUJBQXVCLHNCQUFzQix5QkFBeUIsa0JBQWtCLHlCQUF5QixLQUFLLGlCQUFpQixtQkFBbUIsS0FBSyxpQkFBaUIsb0JBQW9CLGtCQUFrQixtQkFBbUIsS0FBSyxlQUFlLG9CQUFvQixrQkFBa0IsbUJBQW1CLEtBQUssZ0JBQWdCLHdCQUF3QixlQUFlLG1CQUFtQixzQkFBc0IsS0FBSyxpQkFBaUIscUJBQXFCLEtBQUsscUJBQXFCLG1CQUFtQixrQkFBa0IseUJBQXlCLGFBQWEsa0JBQWtCLHlCQUF5QixLQUFLLFlBQVkseUJBQXlCLEtBQUssdUJBQXVCO0FBQzdsSDtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3N0YXR1cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBhZGRUYXNrLCB0b2RvSXRlbXMgfSBmcm9tICcuL3RvZG8uanMnO1xuaW1wb3J0IHVwZGF0ZUNvbXBsZXRlZFN0YXR1cyBmcm9tICcuL3N0YXR1cy5qcyc7XG5pbXBvcnQgc2VsZWN0MiBmcm9tICcuLi9pbWFnZXMvc2VsZWN0LnBuZyc7XG5pbXBvcnQgZGVsZXRlMiBmcm9tICcuLi9pbWFnZXMvZGVsZXRlLnBuZyc7XG5pbXBvcnQgcmVmcmVzaCBmcm9tICcuLi9pbWFnZXMvcmVmcmVzaC5wbmcnO1xuaW1wb3J0IGVkaXQgZnJvbSAnLi4vaW1hZ2VzL2VkaXQuanBnJztcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9MaXN0Jyk7XG5mb3JtLmlubmVySFRNTCA9IGBcbjxsYWJlbCBjbGFzcz1cInRpdGxlXCJcbj5Ub2RheSdzIFRvIERvIDxpbWcgY2xhc3M9XCJyZWZyZXNoXCIgc3JjPSR7cmVmcmVzaH0gYWx0PVwicmVmcmVzaFwiXG4vPjwvbGFiZWw+XG48aW5wdXRcbmNsYXNzPVwiaW5wdXRUZXh0XCJcbnBsYWNlaG9sZGVyPVwiQWRkIHRvIHlvdXIgbGlzdC4uLlwiXG50eXBlPVwidGV4dFwiXG4vPlxuYDtcblxuY29uc3QgYnRuRGVsZXRlQWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5idG5EZWxldGVBbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkZWxldGUtYWxsJyk7XG5idG5EZWxldGVBbGwudGV4dENvbnRlbnQgPSAnQ2xlYXIgYWxsIGNvbXBsZXRlZCc7XG5jb250YWluZXIuYXBwZW5kKGJ0bkRlbGV0ZUFsbCk7XG5cbmNvbnN0IGRpc3BsYXkgPSAoKSA9PiB7XG4gIHRvZG9JdGVtcy5zb3J0KChhLCBiKSA9PiBhLmluZGV4IC0gYi5pbmRleCk7XG4gIHVsLmlubmVySFRNTCA9ICcnOyAvLyBjbGVhciB0aGUgbGlzdCBiZWZvcmUgcmUtcmVuZGVyaW5nIGl0XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RvZG8taXRlbScpO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIHRvZG9JdGVtc1tpXS5pbmRleCk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RvZG8taXRlbSBlZGl0YWJsZScpO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSBgIFxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2JveFwiIGlkPVwiJHt0b2RvSXRlbXNbaV0uaW5kZXh9XCIgdHlwZT1cImNoZWNrYm94XCIvPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHt0b2RvSXRlbXNbaV0uaW5kZXh9XCIgY2xhc3M9XCJvcHRpb25cIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzZWxlY3RcIiBzcmM9JHtzZWxlY3QyfSBhbHQ9XCJcIi8+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiZGVsZXRlXCIgc3JjPSR7ZGVsZXRlMn0gYWx0PVwiXCIvPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cImVkaXRcIiBzcmM9JHtlZGl0fSBhbHQ9XCJlZGl0dGV4dFwiLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiaXRlbXNcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0b2RvSXRlbXNbaV0udGV4dH1cIiByZWFkb25seSAvPlxuXG4gICAgYDtcbiAgICB1bC5hcHBlbmQobm9kZSk7XG5cbiAgICAvLyBHZXQgdGhlIHNlbGVjdGRvdHMsIGRlbGV0ZW9wdGlvbiwgYW5kIGVkaXRvcHRpb24gZWxlbWVudHMgZm9yIHRoaXMgdGFza1xuICAgIGNvbnN0IHNlbGVjdGRvdHMgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QnKTtcbiAgICBjb25zdCBkZWxldGVvcHRpb24gPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUnKTtcbiAgICBjb25zdCBlZGl0b3B0aW9uID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuZWRpdCcpO1xuICAgIC8vIEdldCB0aGUgY2hlY2tib3ggZWxlbWVudCBmb3IgdGhpcyB0YXNrXG4gICAgY29uc3QgY2hlY2tib3ggPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpO1xuXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjb21wbGV0aW5nIGEgdGFza1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBwYXJzZUludChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSwgMTApO1xuICAgICAgY29uc3QgY29tcGxldGVkID0gY2hlY2tib3guY2hlY2tlZDtcbiAgICAgIHVwZGF0ZUNvbXBsZXRlZFN0YXR1cyhpdGVtS2V5LCBjb21wbGV0ZWQpO1xuICAgICAgLy8gRmluZCB0aGUgdGV4dCBlbGVtZW50IGZvciB0aGlzIHRhc2tcbiAgICAgIC8vIEFkZCBsaW5lLXRocm91Z2ggc3R5bGUgdG8gdGhlIHRleHQgd2hlbiBjaGVja2JveCBpcyBjaGVja2VkXG4gICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvcignLml0ZW1zJykuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbGluZS10aHJvdWdoJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvcignLml0ZW1zJykuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGVhckNvbXBsZXRlZFRhc2tzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdW5jb21wbGV0ZWRUYXNrcyA9IHRvZG9JdGVtcy5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmNvbXBsZXRlZCk7XG4gICAgICB0b2RvSXRlbXMubGVuZ3RoID0gMDtcbiAgICAgIHRvZG9JdGVtcy5wdXNoKC4uLnVuY29tcGxldGVkVGFza3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmNvbXBsZXRlZFRhc2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHVuY29tcGxldGVkVGFza3NbaV0uaW5kZXggPSBpICsgMTtcbiAgICAgIH1cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbiAgICAgIGRpc3BsYXkoKTtcbiAgICB9O1xuXG4gICAgYnRuRGVsZXRlQWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY2xlYXJDb21wbGV0ZWRUYXNrcygpO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyB0byBzaG93IHRoZSBkZWxldGUvZWRpdCBvcHRpb25zIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBzZWxlY3Rkb3RzXG4gICAgc2VsZWN0ZG90cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNlbGVjdGRvdHMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGRlbGV0ZW9wdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIGVkaXRvcHRpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRlbGV0aW5nIGEgdGFza1xuICAgIGRlbGV0ZW9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBwYXJzZUludChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSwgMTApO1xuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdG9kb0l0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pbmRleCA9PT0gaXRlbUtleSk7XG4gICAgICB0b2RvSXRlbXMuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG5cbiAgICAgIC8vIFJlLWluZGV4IHRoZSByZW1haW5pbmcgdGFza3NcbiAgICAgIGZvciAobGV0IGkgPSBpdGVtSW5kZXg7IGkgPCB0b2RvSXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdG9kb0l0ZW1zW2ldLmluZGV4ID0gaSArIDE7XG4gICAgICB9XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbiAgICAgIGRpc3BsYXkoKTtcbiAgICB9KTtcblxuICAgIGVkaXRvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtS2V5ID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksIDEwKTtcbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRvZG9JdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaW5kZXggPT09IGl0ZW1LZXkpO1xuXG4gICAgICAvLyBUb2dnbGUgdGhlIHJlYWRvbmx5IGF0dHJpYnV0ZSBvbiB0aGUgaW5wdXQgZWxlbWVudFxuICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuaXRlbXMnKTtcbiAgICAgIGlucHV0RWxlbWVudC5yZWFkT25seSA9ICFpbnB1dEVsZW1lbnQucmVhZE9ubHk7XG5cbiAgICAgIC8vIFRvZ2dsZSB0aGUgZWRpdGFibGUgY2xhc3Mgb24gdGhlIGxpIGVsZW1lbnRcbiAgICAgIG5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnZWRpdGFibGUnKTtcblxuICAgICAgLy8gSWYgdGhlIGlucHV0IGVsZW1lbnQgaXMgbm93IGVkaXRhYmxlLCBmb2N1cyBvbiBpdFxuICAgICAgaWYgKCFpbnB1dEVsZW1lbnQucmVhZE9ubHkpIHtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSB1c2VyIHByZXNzZXMgdGhlIEVudGVyIGtleSB3aGlsZSBlZGl0aW5nIHRoZSBpbnB1dCBlbGVtZW50LCB1cGRhdGUgdGhlIHRhc2sgdGV4dFxuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tUZXh0ID0gaW5wdXRFbGVtZW50LnZhbHVlO1xuICAgICAgICAgIHRvZG9JdGVtc1tpdGVtSW5kZXhdLnRleHQgPSBuZXdUYXNrVGV4dDtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb0l0ZW1zJywgSlNPTi5zdHJpbmdpZnkodG9kb0l0ZW1zKSk7XG4gICAgICAgICAgZGlzcGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBlbGVtZW50IHRvIHRvZ2dsZSB0aGUgZWRpdGFibGUgY2xhc3Mgb24gdGhlIGxpIGVsZW1lbnRcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXRhYmxlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxud2luZG93Lm9ubG9hZCA9IGRpc3BsYXkoKTtcblxuLy8gU2V0IHVwIGZvcm0gc3VibWl0IGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBhIG5ldyB0YXNrXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgaW5wdXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0VGV4dCcpO1xuICBjb25zdCB0ZXh0ID0gaW5wdXRUZXh0LnZhbHVlLnRyaW0oKTtcbiAgaWYgKHRleHQgIT09ICcnKSB7XG4gICAgYWRkVGFzayh0ZXh0KTtcbiAgICBpbnB1dFRleHQudmFsdWUgPSAnJztcbiAgICB1bC5pbm5lckhUTUwgPSAnJztcbiAgICBkaXNwbGF5KCk7XG4gIH1cbn0pOyIsImltcG9ydCB7IHRvZG9JdGVtcyB9IGZyb20gJy4vdG9kby5qcyc7XG5cbmNvbnN0IHVwZGF0ZUNvbXBsZXRlZFN0YXR1cyA9IChpbmRleCwgY29tcGxldGVkKSA9PiB7XG4gIGNvbnN0IHRhc2sgPSB0b2RvSXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pbmRleCA9PT0gaW5kZXgpO1xuICB0YXNrLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRvZG9JdGVtcykpO1xufTtcbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZUNvbXBsZXRlZFN0YXR1cztcbiIsIi8vIExvYWQgdGFza3MgZnJvbSBsb2NhbCBzdG9yYWdlLCBvciB1c2UgYW4gZW1wdHkgYXJyYXkgaWYgbm9uZSBleGlzdHNcbmNvbnN0IHRvZG9JdGVtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9JdGVtcycpKSB8fCBbXTtcblxuY29uc3QgYWRkVGFzayA9ICh0ZXh0KSA9PiB7XG4gIGNvbnN0IG5ld1Rhc2sgPSB7XG4gICAgdGV4dCxcbiAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgIGluZGV4OiB0b2RvSXRlbXMubGVuZ3RoICsgMSxcbiAgfTtcbiAgdG9kb0l0ZW1zLnB1c2gobmV3VGFzayk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbn07XG5cbmV4cG9ydCB7IGFkZFRhc2ssIHRvZG9JdGVtcyB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIjY29udGFpbmVyIHtcXHJcXG4gIGxlZnQ6IDMwJTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogNTBweDtcXHJcXG4gIHdpZHRoOiAzMCU7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGVhdDtcXHJcXG4gIHBhZGRpbmc6IDIwcHggMjBweCAwIDIwcHg7XFxyXFxufVxcclxcblxcclxcbi50aXRsZSB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIGZvbnQtc2l6ZTogMjRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dFRleHQge1xcclxcbiAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gIHdpZHRoOiAxMDglO1xcclxcbiAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBmb250LXNpemU6IDE4cHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGVhdDtcXHJcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcclxcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG46OnBsYWNlaG9sZGVyIHtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGxlZnQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWl0ZW0ge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgbWluLWhlaWdodDogMjdweDtcXHJcXG4gIHdpZHRoOiAxMDUlO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gIHBhZGRpbmc6IDEzcHggMTBweDtcXHJcXG4gIGxlZnQ6IC0yMHB4O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4ub3B0aW9uIHtcXHJcXG4gIGZsb2F0OiByaWdodDtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgd2lkdGg6IDE1cHg7XFxyXFxuICBoZWlnaHQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5lZGl0IHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW1zIHtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xcclxcbiAgdG9wOiA1cHg7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3Qge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5kZWxldGUtYWxsIHtcXHJcXG4gIGhlaWdodDogNTBweDtcXHJcXG4gIHdpZHRoOiAxMDklO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFVBQVU7RUFDVix1QkFBdUI7RUFDdkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCw4QkFBOEI7RUFDOUIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsUUFBUTtFQUNSLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNjb250YWluZXIge1xcclxcbiAgbGVmdDogMzAlO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiA1MHB4O1xcclxcbiAgd2lkdGg6IDMwJTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgcGFkZGluZzogMjBweCAyMHB4IDAgMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBmbG9hdDogcmlnaHQ7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0VGV4dCB7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgd2lkdGg6IDEwOCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbjo6cGxhY2Vob2xkZXIge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8taXRlbSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBtaW4taGVpZ2h0OiAyN3B4O1xcclxcbiAgd2lkdGg6IDEwNSU7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgcGFkZGluZzogMTNweCAxMHB4O1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5vcHRpb24ge1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmVkaXQge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIHdpZHRoOiAxNXB4O1xcclxcbiAgaGVpZ2h0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbXMge1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICB0b3A6IDVweDtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdCB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZS1hbGwge1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgd2lkdGg6IDEwOSU7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiYWRkVGFzayIsInRvZG9JdGVtcyIsInVwZGF0ZUNvbXBsZXRlZFN0YXR1cyIsInNlbGVjdDIiLCJkZWxldGUyIiwicmVmcmVzaCIsImVkaXQiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJ1bCIsImlubmVySFRNTCIsImJ0bkRlbGV0ZUFsbCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsImRpc3BsYXkiLCJzb3J0IiwiYSIsImIiLCJpbmRleCIsImkiLCJsZW5ndGgiLCJub2RlIiwidGV4dCIsInNlbGVjdGRvdHMiLCJkZWxldGVvcHRpb24iLCJlZGl0b3B0aW9uIiwiY2hlY2tib3giLCJhZGRFdmVudExpc3RlbmVyIiwiaXRlbUtleSIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiY29tcGxldGVkIiwiY2hlY2tlZCIsInN0eWxlIiwidGV4dERlY29yYXRpb24iLCJjbGVhckNvbXBsZXRlZFRhc2tzIiwidW5jb21wbGV0ZWRUYXNrcyIsImZpbHRlciIsIml0ZW0iLCJwdXNoIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpdGVtSW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJpbnB1dEVsZW1lbnQiLCJyZWFkT25seSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImZvY3VzIiwiZXZlbnQiLCJrZXkiLCJuZXdUYXNrVGV4dCIsInZhbHVlIiwicmVtb3ZlIiwid2luZG93Iiwib25sb2FkIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaW5wdXRUZXh0IiwidHJpbSIsInRhc2siLCJmaW5kIiwicGFyc2UiLCJnZXRJdGVtIiwibmV3VGFzayJdLCJzb3VyY2VSb290IjoiIn0=