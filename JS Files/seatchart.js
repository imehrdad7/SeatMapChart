
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Seatchart = factory());
})(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var Base = /** @class */ (function () {
        function Base(element) {
            this.element = element;
        }
        return Base;
    }());

    var Seat = /** @class */ (function (_super) {
        __extends(Seat, _super);
        function Seat(index, store) {
            var _this = this;
            var seat = document.createElement('div');
            _this = _super.call(this, seat) || this;
            _this.store = store;
            _this.index = index;
            _this.seatClick = _this.seatClick.bind(_this);
            seat.addEventListener('click', _this.seatClick);
            _this.stateEventListener = _this.stateEventListener.bind(_this);
            _this.store.addEventListener('seatchange', _this.stateEventListener, {
                index: index
            });
            return _this;
        }
        Seat.prototype.stateEventListener = function (e) {
            var _a = e.current, index = _a.index, state = _a.state, label = _a.label, type = _a.type;
            var typeOptions = this.store.getTypeOptions(type);
            if (this.index.row === index.row && this.index.col === index.col) {
                this.element.textContent = label;
                this.element.className = "sc-seat sc-seat-".concat(state, " ").concat(typeOptions.cssClass);
            }
        };
        Seat.prototype.seatClick = function () {
            var seat = this.store.getSeat(this.index);
            if (seat.state !== 'reserved' && seat.state !== 'disabled') {
                var newState = seat.state === 'selected' ? 'available' : 'selected';
                this.store.setSeat(seat.index, { state: newState }, true);
            }
        };
        return Seat;
    }(Base));

    var MapFrontIndicator = /** @class */ (function (_super) {
        __extends(MapFrontIndicator, _super);
        function MapFrontIndicator() {
            var _this = this;
            var front = document.createElement('div');
            front.textContent = 'جلو صحنه / سینما / تئاتر';
            front.className = 'sc-front';
            _this = _super.call(this, front) || this;
            return _this;
        }
        return MapFrontIndicator;
    }(Base));

    var SeatIndexer = /** @class */ (function (_super) {
        __extends(SeatIndexer, _super);
        function SeatIndexer(content) {
            var _this = this;
            var seatIndex = document.createElement('div');
            seatIndex.className = 'sc-seat-indexer';
            seatIndex.textContent = content;
            _this = _super.call(this, seatIndex) || this;
            return _this;
        }
        return SeatIndexer;
    }(Base));

    var Spacer = /** @class */ (function (_super) {
        __extends(Spacer, _super);
        function Spacer() {
            var _this = this;
            var seat = document.createElement('div');
            seat.className = "sc-spacer";
            _this = _super.call(this, seat) || this;
            return _this;
        }
        return Spacer;
    }(Base));

    var MapIndexer = /** @class */ (function (_super) {
        __extends(MapIndexer, _super);
        function MapIndexer(type, store) {
            var _this = this;
            var mapIndexer = document.createElement('div');
            mapIndexer.className = "sc-indexer sc-indexer-".concat(type);
            var map = store.getOptions().map;
            var spacers = type === 'rows' ? map.rowSpacers : map.columnSpacers;
            var length = type === 'rows' ? map.rows : map.columns;
            var getIndexerLabel = type === 'rows' ? store.getRowLabel : store.getColumnLabel;
            var _loop_1 = function (i) {
                var indexerLabel = getIndexerLabel(i);
                var indexer = new SeatIndexer(indexerLabel);
                if (spacers === null || spacers === void 0 ? void 0 : spacers.some(function (x) { return x === i; })) {
                    var spacer = new Spacer();
                    mapIndexer.appendChild(spacer.element);
                }
                mapIndexer.appendChild(indexer.element);
            };
            for (var i = 0; i < length; i += 1) {
                _loop_1(i);
            }
            _this = _super.call(this, mapIndexer) || this;
            return _this;
        }
        return MapIndexer;
    }(Base));

    var Map = /** @class */ (function (_super) {
        __extends(Map, _super);
        function Map(store) {
            var _this = this;
            var options = store.getOptions();
            var _a = options.map, rows = _a.rows, columns = _a.columns, rowSpacers = _a.rowSpacers, columnSpacers = _a.columnSpacers, indexerRows = _a.indexerRows, indexerColumns = _a.indexerColumns, frontVisible = _a.frontVisible;
            var map = document.createElement('div');
            map.classList.add('sc-seats-container');
            var _loop_1 = function (i) {
                var row = document.createElement('div');
                row.className = 'sc-seat-row';
                if (rowSpacers === null || rowSpacers === void 0 ? void 0 : rowSpacers.find(function (x) { return x === i; })) {
                    var rowSpacer = new Spacer();
                    map.appendChild(rowSpacer.element);
                }
                var _loop_2 = function (j) {
                    if (columnSpacers === null || columnSpacers === void 0 ? void 0 : columnSpacers.find(function (x) { return x === j; })) {
                        var spacer = new Spacer();
                        row.appendChild(spacer.element);
                    }
                    var index = { row: i, col: j };
                    var seat = new Seat(index, store);
                    row.appendChild(seat.element);
                };
                for (var j = 0; j < columns; j += 1) {
                    _loop_2(j);
                }
                map.appendChild(row);
            };
            for (var i = 0; i < rows; i += 1) {
                _loop_1(i);
            }
            var innerContainer = document.createElement('div');
            innerContainer.className = 'sc-map-inner-container';
            if (frontVisible === undefined || frontVisible) {
                var frontHeader = new MapFrontIndicator();
                innerContainer.appendChild(frontHeader.element);
            }
			
            if ((indexerColumns === null || indexerColumns === void 0 ? void 0 : indexerColumns.visible) === undefined || indexerColumns.visible) {
                var columnIndexer = new MapIndexer('columns', store);
                innerContainer.appendChild(columnIndexer.element);
            }
            innerContainer.appendChild(map);
            var mapContainer = document.createElement('div');
            mapContainer.className = 'sc-map';
            if ((indexerRows === null || indexerRows === void 0 ? void 0 : indexerRows.visible) === undefined || indexerRows.visible) {
                var rowIndexer = new MapIndexer('rows', store);
                mapContainer.appendChild(rowIndexer.element);
            }
            mapContainer.appendChild(innerContainer);
            _this = _super.call(this, mapContainer) || this;
            return _this;
        }
        return Map;
    }(Base));

    var DEFAULT_CURRENCY = 'تومان ';
    var DEFAULT_SUBMIT_LABEL = 'خرید نهایی';

    var CartTotal = /** @class */ (function (_super) {
        __extends(CartTotal, _super);
        function CartTotal(store) {
            var _this = this;
            var total = document.createElement('p');
            total.className = 'sc-cart-total';
            _this = _super.call(this, total) || this;
            _this.store = store;
            var cart = _this.store.getOptions().cart;
            _this.currency = (cart === null || cart === void 0 ? void 0 : cart.currency) || DEFAULT_CURRENCY;
            _this.updateTotalText(); // init total text
            _this.updateTotalText = _this.updateTotalText.bind(_this);
            _this.store.addEventListener('cartchange', _this.updateTotalText);
            _this.store.addEventListener('cartclear', _this.updateTotalText);
            _this.store.addEventListener('seatchange', _this.updateTotalText);
            return _this;
        }
        CartTotal.prototype.updateTotalText = function () {
            var total = this.store.getCartTotal();
            this.element.textContent = "جمع کل خرید شما : ".concat(this.currency).concat(total.toFixed(2));
        };
        return CartTotal;
    }(Base));

    var CartFooter = /** @class */ (function (_super) {
        __extends(CartFooter, _super);
        function CartFooter(store) {
            var _this = this;
            var total = new CartTotal(store);
            var container = document.createElement('div');
            container.className = 'sc-cart-footer';
            var cart = store.getOptions().cart;
            var submitBtn = document.createElement('button');
            submitBtn.className = 'sc-cart-btn sc-cart-btn-submit';
            submitBtn.textContent = (cart === null || cart === void 0 ? void 0 : cart.submitLabel) || DEFAULT_SUBMIT_LABEL;
            submitBtn.type = 'button';
            submitBtn.onclick = function () { return store.submit(); };
            container.appendChild(total.element);
            container.appendChild(submitBtn);
            _this = _super.call(this, container) || this;
            return _this;
        }
        return CartFooter;
    }(Base));

    var DeleteButton = /** @class */ (function (_super) {
        __extends(DeleteButton, _super);
        function DeleteButton(onclick) {
            var _this = this;
            var buttonIcon = document.createElement('div');
            buttonIcon.className = 'sc-cart-btn-icon';
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'sc-cart-btn sc-cart-btn-delete';
            deleteBtn.title = 'حذف';
            deleteBtn.type = 'button';
            deleteBtn.appendChild(buttonIcon);
            deleteBtn.onclick = onclick;
            _this = _super.call(this, deleteBtn) || this;
            return _this;
        }
        return DeleteButton;
    }(Base));

    var CartHeader = /** @class */ (function (_super) {
        __extends(CartHeader, _super);
        function CartHeader(store) {
            var _this = this;
            var container = document.createElement('div');
            container.className = 'sc-cart-header';
            _this = _super.call(this, container) || this;
            var title = document.createElement('p');
            title.className = 'sc-cart-title';
            _this.deleteAllClick = _this.deleteAllClick.bind(_this);
            var clearButton = new DeleteButton(_this.deleteAllClick);
            container.appendChild(title);
            container.appendChild(clearButton.element);
            _this.store = store;
            _this.title = title;
            _this.updateCartTitle(); // init title text
            _this.updateCartTitle = _this.updateCartTitle.bind(_this);
            _this.store.addEventListener('cartclear', _this.updateCartTitle);
            _this.store.addEventListener('cartchange', _this.updateCartTitle);
            return _this;
        }
        CartHeader.prototype.deleteAllClick = function () {
            this.store.clearCart(true);
        };
        CartHeader.prototype.updateCartTitle = function () {
            var count = this.store.countCartItems();
            this.title.textContent = "صندلی های انتخابی شما (".concat(count, ")");
        };
        return CartHeader;
    }(Base));

    var CartTicket = /** @class */ (function (_super) {
        __extends(CartTicket, _super);
        function CartTicket(seatLabel, seatType) {
            var _this = this;
            var ticket = document.createElement('div');
            ticket.className = "sc-ticket ".concat(seatType.cssClass);
            _this = _super.call(this, ticket) || this;
            var stripes = document.createElement('div');
            stripes.className = 'sc-ticket-stripes';
            _this.seatLabelContainer = document.createElement('div');
            _this.seatLabelContainer.textContent = seatLabel;
            _this.seatLabelContainer.className = 'sc-ticket-seat-label';
            _this.seatTypeContainer = document.createElement('div');
            _this.seatTypeContainer.textContent = seatType.label;
            _this.seatTypeContainer.className = 'sc-ticket-seat-type';
            ticket.appendChild(stripes);
            ticket.appendChild(_this.seatLabelContainer);
            ticket.appendChild(_this.seatTypeContainer);
            ticket.appendChild(stripes.cloneNode(true));
            return _this;
        }
        CartTicket.prototype.update = function (seatLabel, seatType) {
            this.element.className = "sc-ticket ".concat(seatType.cssClass);
            this.seatTypeContainer.textContent = seatType.label;
            this.seatLabelContainer.textContent = seatLabel;
        };
        return CartTicket;
    }(Base));

    var CartItem = /** @class */ (function (_super) {
        __extends(CartItem, _super);
        function CartItem(index, store) {
            var _this = this;
            var cartItem = document.createElement('tr');
            _this = _super.call(this, cartItem) || this;
            var info = store.getSeat(index);
            var typeOptions = store.getTypeOptions(info.type);
            _this.ticket = new CartTicket(info.label, typeOptions);
            var ticketTd = document.createElement('td');
            ticketTd.appendChild(_this.ticket.element);
            var cart = store.getOptions().cart;
            _this.currency = (cart === null || cart === void 0 ? void 0 : cart.currency) || DEFAULT_CURRENCY;
            _this.seatPriceTd = document.createElement('td');
            _this.seatPriceTd.textContent = _this.formatPrice(typeOptions.price);
            _this.deleteClick = _this.deleteClick.bind(_this);
            var deleteBtn = new DeleteButton(_this.deleteClick);
            var deleteTd = document.createElement('td');
            deleteTd.appendChild(deleteBtn.element);
            cartItem.appendChild(ticketTd);
            cartItem.appendChild(_this.seatPriceTd);
            cartItem.appendChild(deleteTd);
            _this.store = store;
            _this.seatIndex = info.index;
            return _this;
        }
        CartItem.prototype.deleteClick = function () {
            this.store.setSeat(this.seatIndex, { state: 'available' }, true);
        };
        CartItem.prototype.formatPrice = function (price) {
            return "".concat(this.currency).concat(price.toFixed(2));
        };
        CartItem.prototype.update = function (seatLabel, seatType) {
            this.ticket.update(seatLabel, seatType);
            this.seatPriceTd.textContent = this.formatPrice(seatType.price);
        };
        return CartItem;
    }(Base));

    var CartTable = /** @class */ (function (_super) {
        __extends(CartTable, _super);
        function CartTable(store) {
            var _this = this;
            var table = document.createElement('table');
            table.className = 'sc-cart-table';
            _this = _super.call(this, table) || this;
            _this.store = store;
            _this.items = [];
            _this.cartChangeEventListener = _this.cartChangeEventListener.bind(_this);
            _this.cartClearEventListener = _this.cartClearEventListener.bind(_this);
            _this.seatChangeEventListener = _this.seatChangeEventListener.bind(_this);
            _this.store.addEventListener('cartchange', _this.cartChangeEventListener);
            _this.store.addEventListener('cartclear', _this.cartClearEventListener);
            _this.store.addEventListener('seatchange', _this.seatChangeEventListener);
            return _this;
        }
        CartTable.prototype.findItem = function (index) {
            return this.items.findIndex(function (item) {
                return item.seatIndex.row === index.row && item.seatIndex.col === index.col;
            });
        };
        CartTable.prototype.cartChangeEventListener = function (e) {
            if (e.action === 'add') {
                var cartItem = new CartItem(e.seat.index, this.store);
                this.element.appendChild(cartItem.element);
                this.items.push(cartItem);
            }
            else if (e.action === 'remove') {
                var index = this.findItem(e.seat.index);
                if (index >= 0) {
                    this.items[index].element.remove();
                    this.items.splice(index, 1);
                }
            }
        };
        CartTable.prototype.cartClearEventListener = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    item.element.remove();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.items = [];
        };
        CartTable.prototype.seatChangeEventListener = function (e) {
            var index = this.findItem(e.current.index);
            if (index >= 0) {
                var map = this.store.getOptions().map;
                var seatType = map.seatTypes[e.current.type];
                this.items[index].update(e.current.label, seatType);
            }
        };
        return CartTable;
    }(Base));

    var Cart = /** @class */ (function (_super) {
        __extends(Cart, _super);
        function Cart(store) {
            var _this = this;
            var cartTable = new CartTable(store);
            var cartTableContainer = document.createElement('div');
            cartTableContainer.className = 'sc-cart-table-container';
            cartTableContainer.appendChild(cartTable.element);
            var cartHeader = new CartHeader(store);
            var cartFooter = new CartFooter(store);
            var cartContainer = document.createElement('div');
            cartContainer.className = 'sc-cart';
            cartContainer.appendChild(cartHeader.element);
            cartContainer.appendChild(cartTableContainer);
            cartContainer.appendChild(cartFooter.element);
            _this = _super.call(this, cartContainer) || this;
            return _this;
        }
        return Cart;
    }(Base));

    var LegendItem = /** @class */ (function (_super) {
        __extends(LegendItem, _super);
        function LegendItem(content, cssClassBullet) {
            var _this = this;
            var legendItem = document.createElement('li');
            legendItem.className = 'sc-legend-item';
            var legendBullet = document.createElement('div');
            legendBullet.className = "sc-legend-bullet ".concat(cssClassBullet);
            var description = document.createElement('p');
            description.className = 'sc-legend-description';
            description.textContent = content;
            legendItem.appendChild(legendBullet);
            legendItem.appendChild(description);
            _this = _super.call(this, legendItem) || this;
            return _this;
        }
        return LegendItem;
    }(Base));

    var Legend = /** @class */ (function (_super) {
        __extends(Legend, _super);
        function Legend(store) {
            var e_1, _a;
            var _this = this;
            var _b = store.getOptions(), cart = _b.cart, map = _b.map;
            var list = document.createElement('ul');
            list.className = 'sc-legend';
            var currency = (cart === null || cart === void 0 ? void 0 : cart.currency) || DEFAULT_CURRENCY;
            var seatTypesOptions = map.seatTypes;
            var types = Object.keys(seatTypesOptions);
            types.sort(function (a, b) { return seatTypesOptions[b].price - seatTypesOptions[a].price; });
            try {
                for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                    var type = types_1_1.value;
                    var seatType = seatTypesOptions[type];
                    var description = "".concat(seatType.label, " (").concat(currency).concat(seatType.price, ")");
                    var item = new LegendItem(description, seatType.cssClass);
                    list.appendChild(item.element);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (types_1_1 && !types_1_1.done && (_a = types_1["return"])) _a.call(types_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var reservedItem = new LegendItem('Reserved', 'sc-seat-reserved');
            list.appendChild(reservedItem.element);
            _this = _super.call(this, list) || this;
            return _this;
        }
        return Legend;
    }(Base));

    var Seatchart$1 = /** @class */ (function () {
        function Seatchart(container, store) {
            while (container.firstChild) {
                container.firstChild.remove();
            }
            container.classList.add('sc-main-container');
            var map = new Map(store);
            container.appendChild(map.element);
            var rightContainer = document.createElement('div');
            rightContainer.className = 'sc-right-container';
            var options = store.getOptions();
            if (!options.cart ||
                options.cart.visible === undefined ||
                options.cart.visible) {
                var cart = new Cart(store);
                rightContainer === null || rightContainer === void 0 ? void 0 : rightContainer.appendChild(cart.element);
            }
            if (options.legendVisible === undefined || options.legendVisible) {
                var legend = new Legend(store);
                rightContainer === null || rightContainer === void 0 ? void 0 : rightContainer.appendChild(legend.element);
            }
            if (rightContainer.childElementCount > 0) {
                container.appendChild(rightContainer);
            }
        }
        return Seatchart;
    }());

    var Store = /** @class */ (function () {
        function Store(options) {
            this.cart = [];
            this.seats = [];
            this.singleSeatChangeEventListeners = {};
            this.options = options;
            this.getColumnLabel = this.getColumnLabel.bind(this);
            this.getRowLabel = this.getRowLabel.bind(this);
            this.eventListeners = {
                cartchange: [],
                cartclear: [],
                seatchange: [],
                submit: []
            };
            var _a = options.map, rows = _a.rows, columns = _a.columns;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    var listenerKey = this.listenerKey({ row: i, col: j });
                    this.singleSeatChangeEventListeners[listenerKey] = [];
                }
            }
        }
        Store.prototype.init = function () {
            var e_1, _a;
            var _b = this.options.map, totalRows = _b.rows, totalColumns = _b.columns, disabledSeats = _b.disabledSeats, reservedSeats = _b.reservedSeats, selectedSeats = _b.selectedSeats;
            // init seats
            for (var row = 0; row < totalRows; row++) {
                this.seats[row] = [];
                var _loop_1 = function (col) {
                    var index = { row: row, col: col };
                    var previous = __assign({}, this_1.seats[row][col]);
                    var state = 'available';
                    if (disabledSeats === null || disabledSeats === void 0 ? void 0 : disabledSeats.some(this_1.isSameSeat(index))) {
                        state = 'disabled';
                    }
                    else if (reservedSeats === null || reservedSeats === void 0 ? void 0 : reservedSeats.some(this_1.isSameSeat(index))) {
                        state = 'reserved';
                    }
                    else if (selectedSeats === null || selectedSeats === void 0 ? void 0 : selectedSeats.some(this_1.isSameSeat(index))) {
                        state = 'selected';
                    }
                    var label = this_1.getSeatLabel(index);
                    var type = this_1.getSeatType(index);
                    this_1.seats[row][col] = {
                        index: index,
                        label: label,
                        state: state,
                        type: type
                    };
                    var current = this_1.seats[row][col];
                    var listenerKey = this_1.listenerKey(index);
                    this_1.singleSeatChangeEventListeners[listenerKey].forEach(function (el) {
                        return el({ previous: previous, current: current });
                    });
                    this_1.eventListeners.seatchange.forEach(function (el) {
                        return el({ previous: previous, current: current });
                    });
                };
                var this_1 = this;
                for (var col = 0; col < totalColumns; col++) {
                    _loop_1(col);
                }
            }
            // init cart
            if (selectedSeats) {
                var _loop_2 = function (seatIndex) {
                    var seat = this_2.seats[seatIndex.row][seatIndex.col];
                    this_2.cart.push(seat);
                    this_2.eventListeners.cartchange.forEach(function (el) {
                        return el({ action: 'add', seat: seat });
                    });
                };
                var this_2 = this;
                try {
                    for (var selectedSeats_1 = __values(selectedSeats), selectedSeats_1_1 = selectedSeats_1.next(); !selectedSeats_1_1.done; selectedSeats_1_1 = selectedSeats_1.next()) {
                        var seatIndex = selectedSeats_1_1.value;
                        _loop_2(seatIndex);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (selectedSeats_1_1 && !selectedSeats_1_1.done && (_a = selectedSeats_1["return"])) _a.call(selectedSeats_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        Store.prototype.getOptions = function () {
            return this.options;
        };
        Store.prototype.getTypeOptions = function (type) {
            return this.options.map.seatTypes[type];
        };
        Store.prototype.setSeat = function (index, info, emit) {
            this.validateIndex(index);
            this.validateType(info.type);
            var row = index.row, col = index.col;
            var previous = __assign({}, this.seats[row][col]);
            this.seats[row][col] = __assign(__assign({}, previous), info);
            var seat = this.seats[row][col];
            if (previous.state !== info.state) {
                if (seat.state === 'selected') {
                    this.addToCart(seat.index, emit);
                }
                else if (previous.state === 'selected') {
                    this.removeFromCart(seat.index, emit);
                }
            }
            var hasChanged = Object.keys(info).some(function (x) { return info[x] && previous[x] !== info[x]; });
            if (hasChanged && emit) {
                var listenerKey = this.listenerKey(index);
                this.singleSeatChangeEventListeners[listenerKey].forEach(function (el) {
                    return el({ previous: previous, current: seat });
                });
                this.eventListeners.seatchange.forEach(function (el) {
                    return el({ previous: previous, current: seat });
                });
            }
        };
        Store.prototype.getSeat = function (index) {
            this.validateIndex(index);
            return this.seats[index.row][index.col];
        };
        Store.prototype.clearCart = function (emit) {
            var e_2, _a, e_3, _b;
            var seats = __spreadArray([], __read(this.cart), false);
            this.cart = [];
            try {
                for (var seats_1 = __values(seats), seats_1_1 = seats_1.next(); !seats_1_1.done; seats_1_1 = seats_1.next()) {
                    var seat = seats_1_1.value;
                    seat.state = 'available';
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (seats_1_1 && !seats_1_1.done && (_a = seats_1["return"])) _a.call(seats_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (emit) {
                if (seats.length > 0) {
                    this.eventListeners.cartclear.forEach(function (el) { return el({ seats: seats }); });
                }
                var _loop_3 = function (seat) {
                    this_3.eventListeners.cartchange.forEach(function (el) {
                        return el({ action: 'remove', seat: seat });
                    });
                    var previous = __assign(__assign({}, seat), { state: 'selected' });
                    var listenerKey = this_3.listenerKey(seat.index);
                    this_3.singleSeatChangeEventListeners[listenerKey].forEach(function (el) {
                        return el({ previous: previous, current: seat });
                    });
                    this_3.eventListeners.seatchange.forEach(function (el) {
                        return el({ previous: previous, current: seat });
                    });
                };
                var this_3 = this;
                try {
                    for (var seats_2 = __values(seats), seats_2_1 = seats_2.next(); !seats_2_1.done; seats_2_1 = seats_2.next()) {
                        var seat = seats_2_1.value;
                        _loop_3(seat);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (seats_2_1 && !seats_2_1.done && (_b = seats_2["return"])) _b.call(seats_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        Store.prototype.submit = function () {
            var _this = this;
            var total = this.getCartTotal();
            this.eventListeners.submit.forEach(function (el) { return el({ cart: _this.cart, total: total }); });
        };
        Store.prototype.getCart = function () {
            return this.cart;
        };
        Store.prototype.getCartTotal = function () {
            var e_4, _a;
            var seatTypes = this.options.map.seatTypes;
            var total = 0;
            try {
                for (var _b = __values(this.cart), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var seat = _c.value;
                    total += seatTypes[seat.type].price;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return total;
        };
        Store.prototype.countCartItems = function () {
            return this.cart.length;
        };
        Store.prototype.getRowLabel = function (row) {
            var _a;
            var label = (_a = this.options.map.indexerRows) === null || _a === void 0 ? void 0 : _a.label;
            if (label) {
                return label(row);
            }
            var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            //var alphabet = 'ابپتثجچحخدذرزژسشصضطظعغکگلمنوهی';
			//var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            var times = Math.floor(row / alphabet.length);
            var index = row - alphabet.length * times;
            return alphabet[index].repeat(times + 1);
        };
        Store.prototype.getColumnLabel = function (column) {
            var _a;
            var label = (_a = this.options.map.indexerColumns) === null || _a === void 0 ? void 0 : _a.label;
            if (label) {
                return label(column);
            }
            return (column + 1).toString();
        };
        Store.prototype.addEventListener = function (type, listener, options) {
            if (options) {
                var listenerKey = this.listenerKey(options.index);
                this.singleSeatChangeEventListeners[listenerKey].push(listener);
            }
            else {
                this.eventListeners[type].push(listener);
            }
        };
        Store.prototype.removeEventListener = function (type, listener, options) {
            if (options) {
                var listenerKey = this.listenerKey(options.index);
                this.singleSeatChangeEventListeners[listenerKey] =
                    this.singleSeatChangeEventListeners[listenerKey].filter(function (x) { return x !== listener; });
            }
            else {
                this.eventListeners[type] = this.eventListeners[type].filter(function (x) { return x !== listener; });
            }
        };
        Store.prototype.validateIndex = function (index) {
            if (index.row < 0 ||
                index.col < 0 ||
                index.row >= this.options.map.rows ||
                index.col >= this.options.map.columns) {
                throw RangeError('Seat index is out of range');
            }
        };
        Store.prototype.validateType = function (type) {
            if (type !== undefined && !this.options.map.seatTypes[type]) {
                throw TypeError("Seat type does not exist");
            }
        };
        Store.prototype.listenerKey = function (index) {
            return "".concat(index.row, "_").concat(index.col);
        };
        Store.prototype.isSameSeat = function (index) {
            return function (otherIndex) {
                return index.row === otherIndex.row && index.col === otherIndex.col;
            };
        };
        Store.prototype.addToCart = function (index, emit) {
            this.cart.push(this.seats[index.row][index.col]);
            if (emit) {
                var seat_1 = this.getSeat(index);
                this.eventListeners.cartchange.forEach(function (el) {
                    return el({ action: 'add', seat: seat_1 });
                });
            }
        };
        Store.prototype.removeFromCart = function (seatIndex, emit) {
            var index = this.cart.findIndex(function (x) { return seatIndex.row === x.index.row && seatIndex.col === x.index.col; });
            if (index >= 0) {
                this.cart.splice(index, 1);
                if (emit) {
                    var seat_2 = this.getSeat(seatIndex);
                    this.eventListeners.cartchange.forEach(function (el) {
                        return el({ action: 'remove', seat: seat_2 });
                    });
                }
            }
        };
        Store.prototype.getSeatType = function (index) {
            var e_5, _a;
            var _b, _c, _d;
            var seatTypes = this.options.map.seatTypes;
            var types = Object.keys(seatTypes);
            try {
                for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                    var key = types_1_1.value;
                    var options = seatTypes[key];
                    if (((_b = options.seats) === null || _b === void 0 ? void 0 : _b.some(this.isSameSeat(index))) ||
                        ((_c = options.seatColumns) === null || _c === void 0 ? void 0 : _c.some(function (col) { return col === index.col; })) ||
                        ((_d = options.seatRows) === null || _d === void 0 ? void 0 : _d.some(function (row) { return row === index.row; }))) {
                        return key;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (types_1_1 && !types_1_1.done && (_a = types_1["return"])) _a.call(types_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return 'default';
        };
        Store.prototype.getSeatLabel = function (index) {
            var seatLabel = this.options.map.seatLabel;
            if (seatLabel) {
                return seatLabel(index);
            }
            var rowIndex = this.getRowLabel(index.row);
            var columnIndex = this.getColumnLabel(index.col);
            return "".concat(rowIndex).concat(columnIndex);
        };
        return Store;
    }());

    var Seatchart = /** @class */ (function () {
        /**
         * Creates a seatchart.
         * @param element - Html element that will contain the Seatchart.
         * @param options - Seatchart options.
         */
        function Seatchart(element, options) {
            this.element = element;
            this.options = options;
            this.store = new Store(options);
            this.ui = new Seatchart$1(element, this.store);
            this.store.init();
        }
        /**
         * Adds an event listener.
         * @param type - Event type.
         * @param listener - Listener function called when the given event occurs.
         */
        Seatchart.prototype.addEventListener = function (type, listener) {
            this.store.addEventListener(type, listener);
        };
        /**
         * Removes an event listener.
         * @param type - Event type.
         * @param listener - Listener to remove.
         */
        Seatchart.prototype.removeEventListener = function (type, listener) {
            this.store.removeEventListener(type, listener);
        };
        /**
         * Gets a reference to the seat info.
         * @param index - Seat index.
         * @returns Seat info.
         */
        Seatchart.prototype.getSeat = function (index) {
            return this.store.getSeat(index);
        };
        /**
         * Sets seat info.
         * @param index - Index of the seat to update.
         * @param seat - An object containing the new seat info.
         */
        Seatchart.prototype.setSeat = function (index, seat) {
            this.store.setSeat(index, seat, true);
        };
        /**
         * Gets a reference to the cart array.
         * @returns An array containing selected seats.
         */
        Seatchart.prototype.getCart = function () {
            return this.store.getCart();
        };
        /**
         * Gets the total price of the selected seats.
         * @returns The total price.
         */
        Seatchart.prototype.getCartTotal = function () {
            return this.store.getCartTotal();
        };
        /**
         * Unselects all seats and removes them from the cart.
         * @returns The total price.
         */
        Seatchart.prototype.clearCart = function () {
            this.store.clearCart(true);
        };
        return Seatchart;
    }());

    return Seatchart;

}));
