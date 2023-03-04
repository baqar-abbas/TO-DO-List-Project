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
      //   const textElement = node.querySelector('.items');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IGFkZFRhc2ssIHRvZG9JdGVtcyB9IGZyb20gJy4vdG9kby5qcyc7XG5pbXBvcnQgdXBkYXRlQ29tcGxldGVkU3RhdHVzIGZyb20gJy4vc3RhdHVzLmpzJztcbmltcG9ydCBzZWxlY3QyIGZyb20gJy4uL2ltYWdlcy9zZWxlY3QucG5nJztcbmltcG9ydCBkZWxldGUyIGZyb20gJy4uL2ltYWdlcy9kZWxldGUucG5nJztcbmltcG9ydCByZWZyZXNoIGZyb20gJy4uL2ltYWdlcy9yZWZyZXNoLnBuZyc7XG5pbXBvcnQgZWRpdCBmcm9tICcuLi9pbWFnZXMvZWRpdC5qcGcnO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb0xpc3QnKTtcbmZvcm0uaW5uZXJIVE1MID0gYFxuPGxhYmVsIGNsYXNzPVwidGl0bGVcIlxuPlRvZGF5J3MgVG8gRG8gPGltZyBjbGFzcz1cInJlZnJlc2hcIiBzcmM9JHtyZWZyZXNofSBhbHQ9XCJyZWZyZXNoXCJcbi8+PC9sYWJlbD5cbjxpbnB1dFxuY2xhc3M9XCJpbnB1dFRleHRcIlxucGxhY2Vob2xkZXI9XCJBZGQgdG8geW91ciBsaXN0Li4uXCJcbnR5cGU9XCJ0ZXh0XCJcbi8+XG5gO1xuXG5jb25zdCBidG5EZWxldGVBbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmJ0bkRlbGV0ZUFsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RlbGV0ZS1hbGwnKTtcbmJ0bkRlbGV0ZUFsbC50ZXh0Q29udGVudCA9ICdDbGVhciBhbGwgY29tcGxldGVkJztcbmNvbnRhaW5lci5hcHBlbmQoYnRuRGVsZXRlQWxsKTtcblxuY29uc3QgZGlzcGxheSA9ICgpID0+IHtcbiAgdG9kb0l0ZW1zLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcbiAgdWwuaW5uZXJIVE1MID0gJyc7IC8vIGNsZWFyIHRoZSBsaXN0IGJlZm9yZSByZS1yZW5kZXJpbmcgaXRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvSXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1pdGVtJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JywgdG9kb0l0ZW1zW2ldLmluZGV4KTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1pdGVtIGVkaXRhYmxlJyk7XG5cbiAgICBub2RlLmlubmVySFRNTCA9IGAgXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImNoZWNrYm94XCIgaWQ9XCIke3RvZG9JdGVtc1tpXS5pbmRleH1cIiB0eXBlPVwiY2hlY2tib3hcIi8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3RvZG9JdGVtc1tpXS5pbmRleH1cIiBjbGFzcz1cIm9wdGlvblwiPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInNlbGVjdFwiIHNyYz0ke3NlbGVjdDJ9IGFsdD1cIlwiLz5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJkZWxldGVcIiBzcmM9JHtkZWxldGUyfSBhbHQ9XCJcIi8+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiZWRpdFwiIHNyYz0ke2VkaXR9IGFsdD1cImVkaXR0ZXh0XCIvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJpdGVtc1wiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3RvZG9JdGVtc1tpXS50ZXh0fVwiIHJlYWRvbmx5IC8+XG5cbiAgICBgO1xuICAgIHVsLmFwcGVuZChub2RlKTtcblxuICAgIC8vIEdldCB0aGUgc2VsZWN0ZG90cywgZGVsZXRlb3B0aW9uLCBhbmQgZWRpdG9wdGlvbiBlbGVtZW50cyBmb3IgdGhpcyB0YXNrXG4gICAgY29uc3Qgc2VsZWN0ZG90cyA9IG5vZGUucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpO1xuICAgIGNvbnN0IGRlbGV0ZW9wdGlvbiA9IG5vZGUucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpO1xuICAgIGNvbnN0IGVkaXRvcHRpb24gPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5lZGl0Jyk7XG4gICAgLy8gR2V0IHRoZSBjaGVja2JveCBlbGVtZW50IGZvciB0aGlzIHRhc2tcbiAgICBjb25zdCBjaGVja2JveCA9IG5vZGUucXVlcnlTZWxlY3RvcignLmNoZWNrYm94Jyk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGNvbXBsZXRpbmcgYSB0YXNrXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbUtleSA9IHBhcnNlSW50KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLCAxMCk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBjaGVja2JveC5jaGVja2VkO1xuICAgICAgdXBkYXRlQ29tcGxldGVkU3RhdHVzKGl0ZW1LZXksIGNvbXBsZXRlZCk7XG4gICAgICAvLyBGaW5kIHRoZSB0ZXh0IGVsZW1lbnQgZm9yIHRoaXMgdGFza1xuICAgICAgLy8gICBjb25zdCB0ZXh0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcignLml0ZW1zJyk7XG4gICAgICAvLyBBZGQgbGluZS10aHJvdWdoIHN0eWxlIHRvIHRoZSB0ZXh0IHdoZW4gY2hlY2tib3ggaXMgY2hlY2tlZFxuICAgICAgaWYgKGNvbXBsZXRlZCkge1xuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcycpLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ2xpbmUtdGhyb3VnaCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcycpLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xlYXJDb21wbGV0ZWRUYXNrcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHVuY29tcGxldGVkVGFza3MgPSB0b2RvSXRlbXMuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5jb21wbGV0ZWQpO1xuICAgICAgdG9kb0l0ZW1zLmxlbmd0aCA9IDA7XG4gICAgICB0b2RvSXRlbXMucHVzaCguLi51bmNvbXBsZXRlZFRhc2tzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5jb21wbGV0ZWRUYXNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB1bmNvbXBsZXRlZFRhc2tzW2ldLmluZGV4ID0gaSArIDE7XG4gICAgICB9XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb0l0ZW1zJywgSlNPTi5zdHJpbmdpZnkodG9kb0l0ZW1zKSk7XG4gICAgICBkaXNwbGF5KCk7XG4gICAgfTtcblxuICAgIGJ0bkRlbGV0ZUFsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNsZWFyQ29tcGxldGVkVGFza3MoKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgdG8gc2hvdyB0aGUgZGVsZXRlL2VkaXQgb3B0aW9ucyB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgc2VsZWN0ZG90c1xuICAgIHNlbGVjdGRvdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBzZWxlY3Rkb3RzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBkZWxldGVvcHRpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBlZGl0b3B0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkZWxldGluZyBhIHRhc2tcbiAgICBkZWxldGVvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtS2V5ID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksIDEwKTtcbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRvZG9JdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaW5kZXggPT09IGl0ZW1LZXkpO1xuICAgICAgdG9kb0l0ZW1zLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICAvLyBSZS1pbmRleCB0aGUgcmVtYWluaW5nIHRhc2tzXG4gICAgICBmb3IgKGxldCBpID0gaXRlbUluZGV4OyBpIDwgdG9kb0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRvZG9JdGVtc1tpXS5pbmRleCA9IGkgKyAxO1xuICAgICAgfVxuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb0l0ZW1zJywgSlNPTi5zdHJpbmdpZnkodG9kb0l0ZW1zKSk7XG4gICAgICBkaXNwbGF5KCk7XG4gICAgfSk7XG5cbiAgICBlZGl0b3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbUtleSA9IHBhcnNlSW50KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLCAxMCk7XG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0b2RvSXRlbXMuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSBpdGVtS2V5KTtcblxuICAgICAgLy8gVG9nZ2xlIHRoZSByZWFkb25seSBhdHRyaWJ1dGUgb24gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcignLml0ZW1zJyk7XG4gICAgICBpbnB1dEVsZW1lbnQucmVhZE9ubHkgPSAhaW5wdXRFbGVtZW50LnJlYWRPbmx5O1xuXG4gICAgICAvLyBUb2dnbGUgdGhlIGVkaXRhYmxlIGNsYXNzIG9uIHRoZSBsaSBlbGVtZW50XG4gICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoJ2VkaXRhYmxlJyk7XG5cbiAgICAgIC8vIElmIHRoZSBpbnB1dCBlbGVtZW50IGlzIG5vdyBlZGl0YWJsZSwgZm9jdXMgb24gaXRcbiAgICAgIGlmICghaW5wdXRFbGVtZW50LnJlYWRPbmx5KSB7XG4gICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgdXNlciBwcmVzc2VzIHRoZSBFbnRlciBrZXkgd2hpbGUgZWRpdGluZyB0aGUgaW5wdXQgZWxlbWVudCwgdXBkYXRlIHRoZSB0YXNrIHRleHRcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrVGV4dCA9IGlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgICB0b2RvSXRlbXNbaXRlbUluZGV4XS50ZXh0ID0gbmV3VGFza1RleHQ7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRvZG9JdGVtcykpO1xuICAgICAgICAgIGRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgaW5wdXQgZWxlbWVudCB0byB0b2dnbGUgdGhlIGVkaXRhYmxlIGNsYXNzIG9uIHRoZSBsaSBlbGVtZW50XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0YWJsZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbndpbmRvdy5vbmxvYWQgPSBkaXNwbGF5KCk7XG5cbi8vIFNldCB1cCBmb3JtIHN1Ym1pdCBldmVudCBsaXN0ZW5lciB0byBhZGQgYSBuZXcgdGFza1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGlucHV0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dFRleHQnKTtcbiAgY29uc3QgdGV4dCA9IGlucHV0VGV4dC52YWx1ZS50cmltKCk7XG4gIGlmICh0ZXh0ICE9PSAnJykge1xuICAgIGFkZFRhc2sodGV4dCk7XG4gICAgaW5wdXRUZXh0LnZhbHVlID0gJyc7XG4gICAgdWwuaW5uZXJIVE1MID0gJyc7XG4gICAgZGlzcGxheSgpO1xuICB9XG59KTsiLCJpbXBvcnQgeyB0b2RvSXRlbXMgfSBmcm9tICcuL3RvZG8uanMnO1xuXG5jb25zdCB1cGRhdGVDb21wbGV0ZWRTdGF0dXMgPSAoaW5kZXgsIGNvbXBsZXRlZCkgPT4ge1xuICBjb25zdCB0YXNrID0gdG9kb0l0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaW5kZXggPT09IGluZGV4KTtcbiAgdGFzay5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbn07XG5leHBvcnQgZGVmYXVsdCB1cGRhdGVDb21wbGV0ZWRTdGF0dXM7XG4iLCIvLyBMb2FkIHRhc2tzIGZyb20gbG9jYWwgc3RvcmFnZSwgb3IgdXNlIGFuIGVtcHR5IGFycmF5IGlmIG5vbmUgZXhpc3RzXG5jb25zdCB0b2RvSXRlbXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvSXRlbXMnKSkgfHwgW107XG5cbmNvbnN0IGFkZFRhc2sgPSAodGV4dCkgPT4ge1xuICBjb25zdCBuZXdUYXNrID0ge1xuICAgIHRleHQsXG4gICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICBpbmRleDogdG9kb0l0ZW1zLmxlbmd0aCArIDEsXG4gIH07XG4gIHRvZG9JdGVtcy5wdXNoKG5ld1Rhc2spO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb0l0ZW1zJywgSlNPTi5zdHJpbmdpZnkodG9kb0l0ZW1zKSk7XG59O1xuXG5leHBvcnQgeyBhZGRUYXNrLCB0b2RvSXRlbXMgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiI2NvbnRhaW5lciB7XFxyXFxuICBsZWZ0OiAzMCU7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDUwcHg7XFxyXFxuICB3aWR0aDogMzAlO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDIwcHggMCAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxuICBmb250LXNpemU6IDI0cHg7XFxyXFxufVxcclxcblxcclxcbi5yZWZyZXNoIHtcXHJcXG4gIGZsb2F0OiByaWdodDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXRUZXh0IHtcXHJcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICB3aWR0aDogMTA4JTtcXHJcXG4gIGhlaWdodDogNDBweDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGxlZnQ6IC0yMHB4O1xcclxcbiAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBib3JkZXItbGVmdDogbm9uZTtcXHJcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuOjpwbGFjZWhvbGRlciB7XFxyXFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBsZWZ0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1pdGVtIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIG1pbi1oZWlnaHQ6IDI3cHg7XFxyXFxuICB3aWR0aDogMTA1JTtcXHJcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB3aGVhdDtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxuICBwYWRkaW5nOiAxM3B4IDEwcHg7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLm9wdGlvbiB7XFxyXFxuICBmbG9hdDogcmlnaHQ7XFxyXFxufVxcclxcblxcclxcbi5kZWxldGUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIHdpZHRoOiAxNXB4O1xcclxcbiAgaGVpZ2h0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZWRpdCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgd2lkdGg6IDE1cHg7XFxyXFxuICBoZWlnaHQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5pdGVtcyB7XFxyXFxuICBtYXJnaW4tbGVmdDogMTVweDtcXHJcXG4gIHRvcDogNXB4O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0IHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlLWFsbCB7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxuICB3aWR0aDogMTA5JTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IC0yMHB4O1xcclxcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxVQUFVO0VBQ1YsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsOEJBQThCO0VBQzlCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFFBQVE7RUFDUixZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjY29udGFpbmVyIHtcXHJcXG4gIGxlZnQ6IDMwJTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogNTBweDtcXHJcXG4gIHdpZHRoOiAzMCU7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGVhdDtcXHJcXG4gIHBhZGRpbmc6IDIwcHggMjBweCAwIDIwcHg7XFxyXFxufVxcclxcblxcclxcbi50aXRsZSB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIGZvbnQtc2l6ZTogMjRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiAzcHg7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dFRleHQge1xcclxcbiAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gIHdpZHRoOiAxMDglO1xcclxcbiAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBmb250LXNpemU6IDE4cHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGVhdDtcXHJcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcclxcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG46OnBsYWNlaG9sZGVyIHtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGxlZnQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWl0ZW0ge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgbWluLWhlaWdodDogMjdweDtcXHJcXG4gIHdpZHRoOiAxMDUlO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gIHBhZGRpbmc6IDEzcHggMTBweDtcXHJcXG4gIGxlZnQ6IC0yMHB4O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4ub3B0aW9uIHtcXHJcXG4gIGZsb2F0OiByaWdodDtcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgd2lkdGg6IDE1cHg7XFxyXFxuICBoZWlnaHQ6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5lZGl0IHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLml0ZW1zIHtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xcclxcbiAgdG9wOiA1cHg7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3Qge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5kZWxldGUtYWxsIHtcXHJcXG4gIGhlaWdodDogNTBweDtcXHJcXG4gIHdpZHRoOiAxMDklO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImFkZFRhc2siLCJ0b2RvSXRlbXMiLCJ1cGRhdGVDb21wbGV0ZWRTdGF0dXMiLCJzZWxlY3QyIiwiZGVsZXRlMiIsInJlZnJlc2giLCJlZGl0IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZvcm0iLCJxdWVyeVNlbGVjdG9yIiwidWwiLCJpbm5lckhUTUwiLCJidG5EZWxldGVBbGwiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcHBlbmQiLCJkaXNwbGF5Iiwic29ydCIsImEiLCJiIiwiaW5kZXgiLCJpIiwibGVuZ3RoIiwibm9kZSIsInRleHQiLCJzZWxlY3Rkb3RzIiwiZGVsZXRlb3B0aW9uIiwiZWRpdG9wdGlvbiIsImNoZWNrYm94IiwiYWRkRXZlbnRMaXN0ZW5lciIsIml0ZW1LZXkiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImNvbXBsZXRlZCIsImNoZWNrZWQiLCJzdHlsZSIsInRleHREZWNvcmF0aW9uIiwiY2xlYXJDb21wbGV0ZWRUYXNrcyIsInVuY29tcGxldGVkVGFza3MiLCJmaWx0ZXIiLCJpdGVtIiwicHVzaCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbUluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwiaW5wdXRFbGVtZW50IiwicmVhZE9ubHkiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJmb2N1cyIsImV2ZW50Iiwia2V5IiwibmV3VGFza1RleHQiLCJ2YWx1ZSIsInJlbW92ZSIsIndpbmRvdyIsIm9ubG9hZCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0VGV4dCIsInRyaW0iLCJ0YXNrIiwiZmluZCIsInBhcnNlIiwiZ2V0SXRlbSIsIm5ld1Rhc2siXSwic291cmNlUm9vdCI6IiJ9