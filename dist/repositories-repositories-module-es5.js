(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["repositories-repositories-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/repositories/repo-page/repo-page.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/repositories/repo-page/repo-page.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div ibmGrid class=\"bx--grid--full-width bx--grid--no-gutter repo-page\">\n\t<div ibmRow class=\"repo-page__r1\">\n\t\t<div ibmCol [columnNumbers]=\"{'lg': 16}\">\n\t\t\t<app-repo-table></app-repo-table>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/repositories/repo-table/repo-table.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/repositories/repo-table/repo-table.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ibm-table-container>\n\t<ibm-table-header>\n\t\t<h4 ibmTableHeaderTitle>Carbon Repositories</h4>\n\t\t<p ibmTableHeaderDescription>A collection of public Carbon repositories.</p>\n\t</ibm-table-header>\n\t<ibm-table\n\t\t[model]=\"model\"\n\t\t[showSelectionColumn]=\"false\"\n\t\t[striped]=\"false\">\n\t</ibm-table>\n</ibm-table-container>\n"

/***/ }),

/***/ "./src/app/repositories/repo-page/repo-page.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/repositories/repo-page/repo-page.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".repo-page .bx--row {\n  padding-top: 1rem;\n  padding-bottom: 1rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWMvY2FyYm9uX3VpL3NyYy9hcHAvcmVwb3NpdG9yaWVzL3JlcG8tcGFnZS9yZXBvLXBhZ2UuY29tcG9uZW50LnNjc3MiLCIvVXNlcnMvbWFjL2NhcmJvbl91aS9ub2RlX21vZHVsZXMvY2FyYm9uLWNvbXBvbmVudHMvc2Nzcy9nbG9iYWxzL3Njc3MvdmVuZG9yL0BjYXJib24vZWxlbWVudHMvc2Nzcy9sYXlvdXQvZ2VuZXJhdGVkL19zcGFjaW5nLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxpQkM0QnFCO0VEM0JyQixvQkMyQnFCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9yZXBvc2l0b3JpZXMvcmVwby1wYWdlL3JlcG8tcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCJ+Y2FyYm9uLWNvbXBvbmVudHMvc2Nzcy9nbG9iYWxzL3Njc3MvdHlwb2dyYXBoeVwiO1xuXG4ucmVwby1wYWdlIC5ieC0tcm93IHtcbiAgICBwYWRkaW5nLXRvcDogJHNwYWNpbmctMDU7XG4gICAgcGFkZGluZy1ib3R0b206ICRzcGFjaW5nLTA1O1xufVxuIiwiLy8gQ29kZSBnZW5lcmF0ZWQgYnkgQGNhcmJvbi9sYXlvdXQuIERPIE5PVCBFRElULlxuLy9cbi8vIENvcHlyaWdodCBJQk0gQ29ycC4gMjAxOCwgMjAxOVxuLy9cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZS0yLjAgbGljZW5zZSBmb3VuZCBpbiB0aGVcbi8vIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vXG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuJGNhcmJvbi0tc3BhY2luZy0wMTogMC4xMjVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuJGNhcmJvbi0tc3BhY2luZy0wMjogMC4yNXJlbSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4kY2FyYm9uLS1zcGFjaW5nLTAzOiAwLjVyZW0gIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuJGNhcmJvbi0tc3BhY2luZy0wNDogMC43NXJlbSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4kY2FyYm9uLS1zcGFjaW5nLTA1OiAxcmVtICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbiRjYXJib24tLXNwYWNpbmctMDY6IDEuNXJlbSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4kY2FyYm9uLS1zcGFjaW5nLTA3OiAycmVtICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbiRjYXJib24tLXNwYWNpbmctMDg6IDIuNXJlbSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4kY2FyYm9uLS1zcGFjaW5nLTA5OiAzcmVtICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbiRjYXJib24tLXNwYWNpbmctMTA6IDRyZW0gIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuJGNhcmJvbi0tc3BhY2luZy0xMTogNXJlbSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4kY2FyYm9uLS1zcGFjaW5nLTEyOiA2cmVtICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbiRjYXJib24tLXNwYWNpbmctMTM6IDEwcmVtICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTGlzdFxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4kY2FyYm9uLS1zcGFjaW5nOiAoXG4gICRjYXJib24tLXNwYWNpbmctMDEsXG4gICRjYXJib24tLXNwYWNpbmctMDIsXG4gICRjYXJib24tLXNwYWNpbmctMDMsXG4gICRjYXJib24tLXNwYWNpbmctMDQsXG4gICRjYXJib24tLXNwYWNpbmctMDUsXG4gICRjYXJib24tLXNwYWNpbmctMDYsXG4gICRjYXJib24tLXNwYWNpbmctMDcsXG4gICRjYXJib24tLXNwYWNpbmctMDgsXG4gICRjYXJib24tLXNwYWNpbmctMDksXG4gICRjYXJib24tLXNwYWNpbmctMTAsXG4gICRjYXJib24tLXNwYWNpbmctMTEsXG4gICRjYXJib24tLXNwYWNpbmctMTIsXG4gICRjYXJib24tLXNwYWNpbmctMTNcbik7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuLy8vIEBhbGlhcyBjYXJib24tLXNwYWNpbmctMDFcbiRzcGFjaW5nLTAxOiAkY2FyYm9uLS1zcGFjaW5nLTAxICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbi8vLyBAYWxpYXMgY2FyYm9uLS1zcGFjaW5nLTAyXG4kc3BhY2luZy0wMjogJGNhcmJvbi0tc3BhY2luZy0wMiAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4vLy8gQGFsaWFzIGNhcmJvbi0tc3BhY2luZy0wM1xuJHNwYWNpbmctMDM6ICRjYXJib24tLXNwYWNpbmctMDMgIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuLy8vIEBhbGlhcyBjYXJib24tLXNwYWNpbmctMDRcbiRzcGFjaW5nLTA0OiAkY2FyYm9uLS1zcGFjaW5nLTA0ICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbi8vLyBAYWxpYXMgY2FyYm9uLS1zcGFjaW5nLTA1XG4kc3BhY2luZy0wNTogJGNhcmJvbi0tc3BhY2luZy0wNSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4vLy8gQGFsaWFzIGNhcmJvbi0tc3BhY2luZy0wNlxuJHNwYWNpbmctMDY6ICRjYXJib24tLXNwYWNpbmctMDYgIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuLy8vIEBhbGlhcyBjYXJib24tLXNwYWNpbmctMDdcbiRzcGFjaW5nLTA3OiAkY2FyYm9uLS1zcGFjaW5nLTA3ICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbi8vLyBAYWxpYXMgY2FyYm9uLS1zcGFjaW5nLTA4XG4kc3BhY2luZy0wODogJGNhcmJvbi0tc3BhY2luZy0wOCAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4vLy8gQGFsaWFzIGNhcmJvbi0tc3BhY2luZy0wOVxuJHNwYWNpbmctMDk6ICRjYXJib24tLXNwYWNpbmctMDkgIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuLy8vIEBhbGlhcyBjYXJib24tLXNwYWNpbmctMTBcbiRzcGFjaW5nLTEwOiAkY2FyYm9uLS1zcGFjaW5nLTEwICFkZWZhdWx0O1xuXG4vLy8gQHR5cGUgTnVtYmVyXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgQGNhcmJvbi9sYXlvdXRcbi8vLyBAYWxpYXMgY2FyYm9uLS1zcGFjaW5nLTExXG4kc3BhY2luZy0xMTogJGNhcmJvbi0tc3BhY2luZy0xMSAhZGVmYXVsdDtcblxuLy8vIEB0eXBlIE51bWJlclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIEBjYXJib24vbGF5b3V0XG4vLy8gQGFsaWFzIGNhcmJvbi0tc3BhY2luZy0xMlxuJHNwYWNpbmctMTI6ICRjYXJib24tLXNwYWNpbmctMTIgIWRlZmF1bHQ7XG5cbi8vLyBAdHlwZSBOdW1iZXJcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBAY2FyYm9uL2xheW91dFxuLy8vIEBhbGlhcyBjYXJib24tLXNwYWNpbmctMTNcbiRzcGFjaW5nLTEzOiAkY2FyYm9uLS1zcGFjaW5nLTEzICFkZWZhdWx0O1xuIl19 */"

/***/ }),

/***/ "./src/app/repositories/repo-page/repo-page.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/repositories/repo-page/repo-page.component.ts ***!
  \***************************************************************/
/*! exports provided: RepoPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepoPageComponent", function() { return RepoPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RepoPageComponent = /** @class */ (function () {
    function RepoPageComponent() {
    }
    RepoPageComponent.prototype.ngOnInit = function () {
    };
    RepoPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-repo-page',
            template: __webpack_require__(/*! raw-loader!./repo-page.component.html */ "./node_modules/raw-loader/index.js!./src/app/repositories/repo-page/repo-page.component.html"),
            styles: [__webpack_require__(/*! ./repo-page.component.scss */ "./src/app/repositories/repo-page/repo-page.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RepoPageComponent);
    return RepoPageComponent;
}());



/***/ }),

/***/ "./src/app/repositories/repo-table/repo-table.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/repositories/repo-table/repo-table.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcG9zaXRvcmllcy9yZXBvLXRhYmxlL3JlcG8tdGFibGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/repositories/repo-table/repo-table.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/repositories/repo-table/repo-table.component.ts ***!
  \*****************************************************************/
/*! exports provided: RepoTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepoTableComponent", function() { return RepoTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! carbon-components-angular */ "./node_modules/carbon-components-angular/fesm5/carbon-components-angular.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RepoTableComponent = /** @class */ (function () {
    function RepoTableComponent() {
        this.model = new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableModel"]();
    }
    RepoTableComponent.prototype.ngOnInit = function () {
        this.model.data = [
            [
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Repo 1', expandedData: 'Row description' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Date' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Date' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: '123' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: '456' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Links' })
            ],
            [
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Repo 2', expandedData: 'Row description' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Date' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Date' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: '123' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: '456' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Links' })
            ],
            [
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Repo 3', expandedData: 'Row description' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Date' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Date' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: '123' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: '456' }),
                new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableItem"]({ data: 'Links' })
            ]
        ];
        this.model.header = [
            new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableHeaderItem"]({ data: 'Name' }),
            new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableHeaderItem"]({ data: 'Created' }),
            new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableHeaderItem"]({ data: 'Updated' }),
            new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableHeaderItem"]({ data: 'Open Issues' }),
            new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableHeaderItem"]({ data: 'Stars' }),
            new carbon_components_angular__WEBPACK_IMPORTED_MODULE_1__["TableHeaderItem"]({ data: 'Links' })
        ];
    };
    RepoTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-repo-table',
            template: __webpack_require__(/*! raw-loader!./repo-table.component.html */ "./node_modules/raw-loader/index.js!./src/app/repositories/repo-table/repo-table.component.html"),
            styles: [__webpack_require__(/*! ./repo-table.component.scss */ "./src/app/repositories/repo-table/repo-table.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RepoTableComponent);
    return RepoTableComponent;
}());



/***/ }),

/***/ "./src/app/repositories/repositories-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/repositories/repositories-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: RepositoriesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepositoriesRoutingModule", function() { return RepositoriesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _repo_page_repo_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repo-page/repo-page.component */ "./src/app/repositories/repo-page/repo-page.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _repo_page_repo_page_component__WEBPACK_IMPORTED_MODULE_2__["RepoPageComponent"]
    }];
var RepositoriesRoutingModule = /** @class */ (function () {
    function RepositoriesRoutingModule() {
    }
    RepositoriesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], RepositoriesRoutingModule);
    return RepositoriesRoutingModule;
}());



/***/ }),

/***/ "./src/app/repositories/repositories.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/repositories/repositories.module.ts ***!
  \*****************************************************/
/*! exports provided: RepositoriesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepositoriesModule", function() { return RepositoriesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _repositories_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repositories-routing.module */ "./src/app/repositories/repositories-routing.module.ts");
/* harmony import */ var _repo_page_repo_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repo-page/repo-page.component */ "./src/app/repositories/repo-page/repo-page.component.ts");
/* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! carbon-components-angular */ "./node_modules/carbon-components-angular/fesm5/carbon-components-angular.js");
/* harmony import */ var _repo_table_repo_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./repo-table/repo-table.component */ "./src/app/repositories/repo-table/repo-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var RepositoriesModule = /** @class */ (function () {
    function RepositoriesModule() {
    }
    RepositoriesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_repo_page_repo_page_component__WEBPACK_IMPORTED_MODULE_3__["RepoPageComponent"], _repo_table_repo_table_component__WEBPACK_IMPORTED_MODULE_5__["RepoTableComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _repositories_routing_module__WEBPACK_IMPORTED_MODULE_2__["RepositoriesRoutingModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__["GridModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__["TableModule"]
            ]
        })
    ], RepositoriesModule);
    return RepositoriesModule;
}());



/***/ })

}]);
//# sourceMappingURL=repositories-repositories-module-es5.js.map