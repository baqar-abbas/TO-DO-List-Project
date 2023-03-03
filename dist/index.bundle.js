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
/* harmony import */ var _images_select_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/select.png */ "./images/select.png");
/* harmony import */ var _images_delete_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/delete.png */ "./images/delete.png");
/* harmony import */ var _images_refresh_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/refresh.png */ "./images/refresh.png");
/* harmony import */ var _images_edit_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/edit.jpg */ "./images/edit.jpg");






const container = document.getElementById('container');
const form = document.querySelector('form');
const ul = document.querySelector('.todoList');
form.innerHTML = `
<label class="title"
>Today's To Do <img class="refresh" src=${_images_refresh_png__WEBPACK_IMPORTED_MODULE_4__} alt="refresh"
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
            <img class="select" src=${_images_select_png__WEBPACK_IMPORTED_MODULE_2__} alt=""/>
            <img class="delete" src=${_images_delete_png__WEBPACK_IMPORTED_MODULE_3__} alt=""/>
            <img class="edit" src=${_images_edit_jpg__WEBPACK_IMPORTED_MODULE_5__} alt="edittext"/>
        </label>
        <input class="items" type="text" value="${_todo_js__WEBPACK_IMPORTED_MODULE_1__.todoItems[i].text}" readonly />

    `;
    ul.append(node);

    // Get the selectdots, deleteoption, and editoption elements for this task
    const selectdots = node.querySelector('.select');
    const deleteoption = node.querySelector('.delete');
    const editoption = node.querySelector('.edit');

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
___CSS_LOADER_EXPORT___.push([module.id, "#container {\r\n  left: 30%;\r\n  position: relative;\r\n  top: 50px;\r\n  width: 30%;\r\n  border: 1px solid wheat;\r\n  padding: 20px 20px 0 20px;\r\n}\r\n\r\n.title {\r\n  display: block;\r\n  font-size: 24px;\r\n}\r\n\r\n.refresh {\r\n  float: right;\r\n  position: relative;\r\n  top: 3px;\r\n}\r\n\r\n.inputText {\r\n  margin-top: 15px;\r\n  width: 108%;\r\n  height: 40px;\r\n  position: relative;\r\n  left: -20px;\r\n  font-size: 18px;\r\n  border: 1px solid wheat;\r\n  border-left: none;\r\n  border-right: none;\r\n}\r\n\r\n::placeholder {\r\n  font-style: italic;\r\n  position: relative;\r\n  left: 15px;\r\n}\r\n\r\n.todo-item {\r\n  text-decoration: none;\r\n  min-height: 27px;\r\n  width: 105%;\r\n  border-bottom: 1px solid wheat;\r\n  list-style: none;\r\n  font-size: 20px;\r\n  padding: 13px 10px;\r\n  left: -20px;\r\n  position: relative;\r\n}\r\n\r\n.option {\r\n  float: right;\r\n}\r\n\r\n.delete {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.edit {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.items {\r\n  margin-left: 15px;\r\n  top: 5px;\r\n  border: none;\r\n}\r\n\r\n.select {\r\n  display: block;\r\n}\r\n\r\n.delete-all {\r\n  height: 50px;\r\n  width: 109%;\r\n  position: relative;\r\n  top: 0;\r\n  left: -20px;\r\n  border-style: none;\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,eAAe;EACf,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,WAAW;EACX,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,QAAQ;EACR,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":["#container {\r\n  left: 30%;\r\n  position: relative;\r\n  top: 50px;\r\n  width: 30%;\r\n  border: 1px solid wheat;\r\n  padding: 20px 20px 0 20px;\r\n}\r\n\r\n.title {\r\n  display: block;\r\n  font-size: 24px;\r\n}\r\n\r\n.refresh {\r\n  float: right;\r\n  position: relative;\r\n  top: 3px;\r\n}\r\n\r\n.inputText {\r\n  margin-top: 15px;\r\n  width: 108%;\r\n  height: 40px;\r\n  position: relative;\r\n  left: -20px;\r\n  font-size: 18px;\r\n  border: 1px solid wheat;\r\n  border-left: none;\r\n  border-right: none;\r\n}\r\n\r\n::placeholder {\r\n  font-style: italic;\r\n  position: relative;\r\n  left: 15px;\r\n}\r\n\r\n.todo-item {\r\n  text-decoration: none;\r\n  min-height: 27px;\r\n  width: 105%;\r\n  border-bottom: 1px solid wheat;\r\n  list-style: none;\r\n  font-size: 20px;\r\n  padding: 13px 10px;\r\n  left: -20px;\r\n  position: relative;\r\n}\r\n\r\n.option {\r\n  float: right;\r\n}\r\n\r\n.delete {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.edit {\r\n  display: none;\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.items {\r\n  margin-left: 15px;\r\n  top: 5px;\r\n  border: none;\r\n}\r\n\r\n.select {\r\n  display: block;\r\n}\r\n\r\n.delete-all {\r\n  height: 50px;\r\n  width: 109%;\r\n  position: relative;\r\n  top: 0;\r\n  left: -20px;\r\n  border-style: none;\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBhZGRUYXNrLCB0b2RvSXRlbXMgfSBmcm9tICcuL3RvZG8uanMnO1xuaW1wb3J0IHNlbGVjdDIgZnJvbSAnLi4vaW1hZ2VzL3NlbGVjdC5wbmcnO1xuaW1wb3J0IGRlbGV0ZTIgZnJvbSAnLi4vaW1hZ2VzL2RlbGV0ZS5wbmcnO1xuaW1wb3J0IHJlZnJlc2ggZnJvbSAnLi4vaW1hZ2VzL3JlZnJlc2gucG5nJztcbmltcG9ydCBlZGl0IGZyb20gJy4uL2ltYWdlcy9lZGl0LmpwZyc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5jb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvTGlzdCcpO1xuZm9ybS5pbm5lckhUTUwgPSBgXG48bGFiZWwgY2xhc3M9XCJ0aXRsZVwiXG4+VG9kYXkncyBUbyBEbyA8aW1nIGNsYXNzPVwicmVmcmVzaFwiIHNyYz0ke3JlZnJlc2h9IGFsdD1cInJlZnJlc2hcIlxuLz48L2xhYmVsPlxuPGlucHV0XG5jbGFzcz1cImlucHV0VGV4dFwiXG5wbGFjZWhvbGRlcj1cIkFkZCB0byB5b3VyIGxpc3QuLi5cIlxudHlwZT1cInRleHRcIlxuLz5cbmA7XG5jb25zdCBidG5EZWxldGVBbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmJ0bkRlbGV0ZUFsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RlbGV0ZS1hbGwnKTtcbmJ0bkRlbGV0ZUFsbC50ZXh0Q29udGVudCA9ICdDbGVhciBhbGwgY29tcGxldGVkJztcbmNvbnRhaW5lci5hcHBlbmQoYnRuRGVsZXRlQWxsKTtcblxuY29uc3QgZGlzcGxheSA9ICgpID0+IHtcbiAgdG9kb0l0ZW1zLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KTtcbiAgdWwuaW5uZXJIVE1MID0gJyc7IC8vIGNsZWFyIHRoZSBsaXN0IGJlZm9yZSByZS1yZW5kZXJpbmcgaXRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvSXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1pdGVtJyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JywgdG9kb0l0ZW1zW2ldLmluZGV4KTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby1pdGVtIGVkaXRhYmxlJyk7XG5cbiAgICBub2RlLmlubmVySFRNTCA9IGAgXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImNoZWNrYm94XCIgaWQ9XCIke3RvZG9JdGVtc1tpXS5pbmRleH1cIiB0eXBlPVwiY2hlY2tib3hcIi8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3RvZG9JdGVtc1tpXS5pbmRleH1cIiBjbGFzcz1cIm9wdGlvblwiPlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInNlbGVjdFwiIHNyYz0ke3NlbGVjdDJ9IGFsdD1cIlwiLz5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJkZWxldGVcIiBzcmM9JHtkZWxldGUyfSBhbHQ9XCJcIi8+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiZWRpdFwiIHNyYz0ke2VkaXR9IGFsdD1cImVkaXR0ZXh0XCIvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJpdGVtc1wiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3RvZG9JdGVtc1tpXS50ZXh0fVwiIHJlYWRvbmx5IC8+XG5cbiAgICBgO1xuICAgIHVsLmFwcGVuZChub2RlKTtcblxuICAgIC8vIEdldCB0aGUgc2VsZWN0ZG90cywgZGVsZXRlb3B0aW9uLCBhbmQgZWRpdG9wdGlvbiBlbGVtZW50cyBmb3IgdGhpcyB0YXNrXG4gICAgY29uc3Qgc2VsZWN0ZG90cyA9IG5vZGUucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpO1xuICAgIGNvbnN0IGRlbGV0ZW9wdGlvbiA9IG5vZGUucXVlcnlTZWxlY3RvcignLmRlbGV0ZScpO1xuICAgIGNvbnN0IGVkaXRvcHRpb24gPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5lZGl0Jyk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIHNob3cgdGhlIGRlbGV0ZS9lZGl0IG9wdGlvbnMgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHNlbGVjdGRvdHNcbiAgICBzZWxlY3Rkb3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc2VsZWN0ZG90cy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZGVsZXRlb3B0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgZWRpdG9wdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KTtcblxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgZGVsZXRpbmcgYSB0YXNrXG4gICAgZGVsZXRlb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbUtleSA9IHBhcnNlSW50KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLCAxMCk7XG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0b2RvSXRlbXMuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSBpdGVtS2V5KTtcbiAgICAgIHRvZG9JdGVtcy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblxuICAgICAgLy8gUmUtaW5kZXggdGhlIHJlbWFpbmluZyB0YXNrc1xuICAgICAgZm9yIChsZXQgaSA9IGl0ZW1JbmRleDsgaSA8IHRvZG9JdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0b2RvSXRlbXNbaV0uaW5kZXggPSBpICsgMTtcbiAgICAgIH1cblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRvZG9JdGVtcykpO1xuICAgICAgZGlzcGxheSgpO1xuICAgIH0pO1xuXG4gICAgZWRpdG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBwYXJzZUludChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSwgMTApO1xuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdG9kb0l0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pbmRleCA9PT0gaXRlbUtleSk7XG5cbiAgICAgIC8vIFRvZ2dsZSB0aGUgcmVhZG9ubHkgYXR0cmlidXRlIG9uIHRoZSBpbnB1dCBlbGVtZW50XG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcycpO1xuICAgICAgaW5wdXRFbGVtZW50LnJlYWRPbmx5ID0gIWlucHV0RWxlbWVudC5yZWFkT25seTtcblxuICAgICAgLy8gVG9nZ2xlIHRoZSBlZGl0YWJsZSBjbGFzcyBvbiB0aGUgbGkgZWxlbWVudFxuICAgICAgbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdlZGl0YWJsZScpO1xuXG4gICAgICAvLyBJZiB0aGUgaW5wdXQgZWxlbWVudCBpcyBub3cgZWRpdGFibGUsIGZvY3VzIG9uIGl0XG4gICAgICBpZiAoIWlucHV0RWxlbWVudC5yZWFkT25seSkge1xuICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIHVzZXIgcHJlc3NlcyB0aGUgRW50ZXIga2V5IHdoaWxlIGVkaXRpbmcgdGhlIGlucHV0IGVsZW1lbnQsIHVwZGF0ZSB0aGUgdGFzayB0ZXh0XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgY29uc3QgbmV3VGFza1RleHQgPSBpbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgdG9kb0l0ZW1zW2l0ZW1JbmRleF0udGV4dCA9IG5ld1Rhc2tUZXh0O1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvSXRlbXMnLCBKU09OLnN0cmluZ2lmeSh0b2RvSXRlbXMpKTtcbiAgICAgICAgICBkaXNwbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGVsZW1lbnQgdG8gdG9nZ2xlIHRoZSBlZGl0YWJsZSBjbGFzcyBvbiB0aGUgbGkgZWxlbWVudFxuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnZWRpdGFibGUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG53aW5kb3cub25sb2FkID0gZGlzcGxheSgpO1xuXG4vLyBTZXQgdXAgZm9ybSBzdWJtaXQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIGEgbmV3IHRhc2tcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRUZXh0Jyk7XG4gIGNvbnN0IHRleHQgPSBpbnB1dFRleHQudmFsdWUudHJpbSgpO1xuICBpZiAodGV4dCAhPT0gJycpIHtcbiAgICBhZGRUYXNrKHRleHQpO1xuICAgIGlucHV0VGV4dC52YWx1ZSA9ICcnO1xuICAgIHVsLmlubmVySFRNTCA9ICcnO1xuICAgIGRpc3BsYXkoKTtcbiAgfVxufSk7IiwiLy8gTG9hZCB0YXNrcyBmcm9tIGxvY2FsIHN0b3JhZ2UsIG9yIHVzZSBhbiBlbXB0eSBhcnJheSBpZiBub25lIGV4aXN0c1xuY29uc3QgdG9kb0l0ZW1zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb0l0ZW1zJykpIHx8IFtdO1xuXG5jb25zdCBhZGRUYXNrID0gKHRleHQpID0+IHtcbiAgY29uc3QgbmV3VGFzayA9IHtcbiAgICB0ZXh0LFxuICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgaW5kZXg6IHRvZG9JdGVtcy5sZW5ndGggKyAxLFxuICB9O1xuICB0b2RvSXRlbXMucHVzaChuZXdUYXNrKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9JdGVtcycsIEpTT04uc3RyaW5naWZ5KHRvZG9JdGVtcykpO1xufTtcblxuZXhwb3J0IHsgYWRkVGFzaywgdG9kb0l0ZW1zIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIiNjb250YWluZXIge1xcclxcbiAgbGVmdDogMzAlO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiA1MHB4O1xcclxcbiAgd2lkdGg6IDMwJTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgcGFkZGluZzogMjBweCAyMHB4IDAgMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBmbG9hdDogcmlnaHQ7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0VGV4dCB7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgd2lkdGg6IDEwOCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbjo6cGxhY2Vob2xkZXIge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8taXRlbSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBtaW4taGVpZ2h0OiAyN3B4O1xcclxcbiAgd2lkdGg6IDEwNSU7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgcGFkZGluZzogMTNweCAxMHB4O1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5vcHRpb24ge1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmVkaXQge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIHdpZHRoOiAxNXB4O1xcclxcbiAgaGVpZ2h0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbXMge1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICB0b3A6IDVweDtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdCB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZS1hbGwge1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgd2lkdGg6IDEwOSU7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsVUFBVTtFQUNWLHVCQUF1QjtFQUN2Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLDhCQUE4QjtFQUM5QixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixRQUFRO0VBQ1IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiNjb250YWluZXIge1xcclxcbiAgbGVmdDogMzAlO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiA1MHB4O1xcclxcbiAgd2lkdGg6IDMwJTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgcGFkZGluZzogMjBweCAyMHB4IDAgMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBmbG9hdDogcmlnaHQ7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDNweDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0VGV4dCB7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgd2lkdGg6IDEwOCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoZWF0O1xcclxcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbjo6cGxhY2Vob2xkZXIge1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8taXRlbSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBtaW4taGVpZ2h0OiAyN3B4O1xcclxcbiAgd2lkdGg6IDEwNSU7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgd2hlYXQ7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgcGFkZGluZzogMTNweCAxMHB4O1xcclxcbiAgbGVmdDogLTIwcHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5vcHRpb24ge1xcclxcbiAgZmxvYXQ6IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVsZXRlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB3aWR0aDogMTVweDtcXHJcXG4gIGhlaWdodDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmVkaXQge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIHdpZHRoOiAxNXB4O1xcclxcbiAgaGVpZ2h0OiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaXRlbXMge1xcclxcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICB0b3A6IDVweDtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdCB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmRlbGV0ZS1hbGwge1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgd2lkdGg6IDEwOSU7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAtMjBweDtcXHJcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiYWRkVGFzayIsInRvZG9JdGVtcyIsInNlbGVjdDIiLCJkZWxldGUyIiwicmVmcmVzaCIsImVkaXQiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJ1bCIsImlubmVySFRNTCIsImJ0bkRlbGV0ZUFsbCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZCIsImRpc3BsYXkiLCJzb3J0IiwiYSIsImIiLCJpbmRleCIsImkiLCJsZW5ndGgiLCJub2RlIiwidGV4dCIsInNlbGVjdGRvdHMiLCJkZWxldGVvcHRpb24iLCJlZGl0b3B0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0eWxlIiwiaXRlbUtleSIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaXRlbUluZGV4IiwiZmluZEluZGV4IiwiaXRlbSIsInNwbGljZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaW5wdXRFbGVtZW50IiwicmVhZE9ubHkiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJmb2N1cyIsImV2ZW50Iiwia2V5IiwibmV3VGFza1RleHQiLCJ2YWx1ZSIsInJlbW92ZSIsIndpbmRvdyIsIm9ubG9hZCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0VGV4dCIsInRyaW0iLCJwYXJzZSIsImdldEl0ZW0iLCJuZXdUYXNrIiwiY29tcGxldGVkIiwicHVzaCJdLCJzb3VyY2VSb290IjoiIn0=