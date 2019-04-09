/**
 *
 */

var util = {

    //common - utils


    //[{10, 'a' }{20,'b'},{30,'c'}],

    stringContains: function (string, test) {
        return string.indexOf(test) > -1;
    },

    stringStartsWith: function (string, test) {
        return string.indexOf(test) == 0;
    },

    isset: function (variable) {
        return typeof variable !== typeof undefined ? true : false;
    },

    arrayToCsv: function (array) {
        var retVal = "";
        for (var i = 0; i < array.length; i++) {
            retVal += array[i];
            if (i < array.length - 1) retVal += ",";
        }
        return retVal;
    },

    preloader: {
        state: 0,

        inc: function () {
            if (this.state == 0)
                document.getElementById("preloader").style.display = "block";
            document.getElementById("menu-collapse").style.display = "none";
            this.state++;
        },

        dec: function () {
            if (this.state == 0) return;
            this.state--;
            if (this.state == 0)
                document.getElementById("preloader").style.display = "none";
            document.getElementById("menu-collapse").style.display = "block";
        },

        reset: function () {
            this.state = 0;
            document.getElementById("preloader").style.display = "none";
            document.getElementById("menu-collapse").style.display = "block";
        }
    },

    //common validation

    validation: {
        checkStandardInput: function (value) {
            if (!value) return false;
            return (value.length >= 1 && value.length < 45);
        },
        checkStandardInputMinMax: function (value, min, max) {
            if (!value) return false;
            return (value.length >= min && value.length <= max);
        },

        checkGeZero: function (value) {
            return value != "" && !isNaN(value) && value >= 0;
        },

        checkGtZero: function (value) {
            return value != "" && !isNaN(value) && value > 0;
        },

        checkAmount: function (value, field, dependentField) {
            if (value > field.getItem(field.getSelectedId().id).dependentField) {
                return false;
            } else {
                return value != "" && !isNaN(value) && value > 0;
            }
        },

        validateUponEdit: function (editor, type, boundaries) {
            switch (type) {
                case "isEmpty" : {
                    if (/^\s*$/.test(editor.getValue())) {
                        util.messages.showErrorMessage("Polje je obavezno za unos.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "number": {
                    var check = ( editor.getValue() != "" && !isNaN(editor.getValue()));
                    if (!check) {
                        util.messages.showErrorMessage("Molimo unesite ispravan broj.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "numberGeZero": {
                    var check = ( editor.getValue() != "" && !isNaN(editor.getValue()) && editor.getValue() >= 0);
                    if (!check) {
                        util.messages.showErrorMessage("Molimo unesite nenegativan broj.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "checkGtZero": {
                    var check = ( editor.getValue() != "" && !isNaN(editor.getValue()) && editor.getValue() > 0);
                    if (!check) {
                        util.messages.showErrorMessage("Molimo unesite pozitivan broj.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "checkEmailAddress": {
                    var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
                    var check = emailRegex.test(editor.getValue());
                    if (!check) {
                        util.messages.showErrorMessage("Molimo vas unesite email u odgovarajućem fromatu.");
                        return false;
                    } else return true;

                }
                    ;
                    break;
                case "checkStandardInputMinMax": {
                    var value = editor.getValue();

                    var min = boundaries.min;
                    var max = boundaries.max;
                    var type = boundaries.type;

                    if (type == "number") {
                        var check = (!isNaN(value) && value.length >= min && value.length <= max);
                        if (!check) {
                            util.messages.showErrorMessage("Molimo unesite pozitivan broj od " + min + " do " + max + " cifara.");
                            return false;
                        } else return true;

                    } else if (type == "string") {
                        var check = (value.length >= min && value.length <= max);
                        if (!check) {
                            util.messages.showErrorMessage("Molimo unesite tekst maksimalne dužine " + max + " karaktera.");
                            return false;
                        } else return true;
                    }
                }
                    ;
                    break;

                case "checkDateGreaterThanNow": {
                    var value = editor.getValue();
                    var currentValue = new Date();
                    if (value <= currentValue) {
                        util.messages.showErrorMessage("Molimo unesite datum i vrijeme veće od trenutnog.");
                        return false;
                    }
                }
            }
            return true;
        },

        checkSupportedTypes: function (type, typesStr) {
            var suppTypesArray = typesStr.split(',');
            var supported = false;
            for (var i = 0; i < suppTypesArray.length; i++) {
                if (type == suppTypesArray[i]) {
                    supported = true;
                    break;
                }
            }

            return supported;
        },
        checkPositiveNumber: function (value, errorMessageTarget, errorMessage) {
            var valid = true
            if (isNaN(value)) valid = false;
            else valid = (value > 0);

            if (!valid)
                $$(errorMessageTarget).setHTML(errorMessage);
            return valid;
        },
        checkEmailAddress: function (email) {
            var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
            return emailRegex.test(email);

        }
        ,
        checkMacAddress: function (mac) {
            var macRegex = new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$");
            return macRegex.test(mac);
        },

        onBeforeEditStopCancelEdit: function (newValue, oldValue) {
            // TODO check if there are other specific situations to be considered
            if (newValue == "" && oldValue == 0) {
            }
            else if (newValue == oldValue) return true; // === was before -> == added since "2" === 2 returned false

            return false;
        }

    },

    //common messages

    messages: {
        showMessage: function (message) {
            webix.message({type: "default", text: message});
        },
        showErrorMessage: function (message) {
            webix.message({type: "error", text: message});
        },
        showSessionExpiredError: function () {
            webix.message({type: "error", text: "Vaša sesija je istekla. Prijavite se ponovo..."});
        },
        showLogoutMessage: function () {
            webix.message({type: "defult", text: "Uspješno ste se odjavili."});
        },
        showWarningMessage: function (message, expire) {
            webix.message({type: "warning", text: message, expire: expire || 0});
        }
    },

    isAdmin: function () {
        if (typeof userData === 'undefined') return false;
        if (!userData) return false;
        if (userData.rolaNivo == 10 || userData.rolaNivo == 20) return true;
        return false;
    },

    getRoleLevel: function () {
        if (typeof userData === 'undefined') return 0;
        if (!userData) return 0;
        return userData.rolaNivo;
    },

    dismissDialog: function (formName) {
        $$(formName).hide();
        $$(formName).destructor();
    },

    getToday: function () {
        var d = new Date();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);

        return d;
    },

    roundToTwo: function (num) {
        return +(Math.round(num + "e+2") + "e-2");
    },

    roundTo: function (decimalPlaces, num) {
        return +(Math.round(num + "e+" + decimalPlaces) + "e-" + decimalPlaces);
    },

    currencyFromCentesimal: function (value) {
        return webix.i18n.numberFormat(util.roundToTwo(value / 100));
    },

    currencyFromCentesimalPriceFormat: function (value) {
        return webix.i18n.priceFormat(util.roundToTwo(value));
    },
    currencyToCentesimal: function (value) {
        return util.roundToTwo(value) * 100;
    },

    checkboxes: {
        nonEditableYesNoField: function (obj, common, value) {
            if (value)
                return '<div class="yesNoField checked"><span class="nonCheckableCheckArea"></span></div>';
            else
                return '<div class="yesNoField notchecked"><span class="nonCheckableCheckArea"></span></div>';
        }
    },
    onAfterFilter: function (count) {
        $$("rowsNumberIndicator").setValues({filteredRowsCount: count, config: $$("pagingDiv").config});
    },
    clearAllFiltersForDatatable: function (datatableId) {
        var typeOfArgument = typeof  datatableId, datatable;
        if (typeOfArgument === "string") {
            datatable = $$(datatableId);
        } else if (typeOfArgument === "object") {
            datatable = datatableId;
        } else throw "argument is not valid";
        var columns = datatable.config.columns;
        for (var i = 0; i < columns.length; i++) {
            datatable.getFilter(columns[i].id).value = "";
        }
    },
    datetime: {
        getLastSunday: function (d) {
            var t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }
    },
    concatenameFirstAndLastName: function (user) {
        return user.ime + ' ' + user.prezime;
    },
    messagesUtil: {
        showMessagesIcon: function () {
            return userData.rolaNivo == 21 || userData.rolaNivo == 31;
        },
        concatenameFirstAndLastName: function (user) {
            return (user.name) ? (user.name + ' ' + user.lastName) : (user.ime + ' ' + user.prezime);
        },
        getMessageTimeIndicator: function (now, messageDateString) {
            var midnight = now;
            var messageDate = parseInt(messageDateString);

            midnight.setHours(0);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            midnight.setMilliseconds(0);

            var yesterdaysMidnight = new Date(midnight);

            yesterdaysMidnight.setHours(-24);

            var lastWeeksDay = new Date(midnight);

            lastWeeksDay.setDate(lastWeeksDay.getDate() - 7);

            if (messageDate > midnight) {
                return "Danas " + webix.Date.dateToStr("%H:%i:%s")(new Date(messageDate));
            } else if (messageDate > yesterdaysMidnight) {
                return "Juče " + webix.Date.dateToStr("%H:%i:%s")(new Date(messageDate));
            } else {
                return webix.Date.dateToStr("%d.%m.%Y. %H:%i:%s")(new Date(messageDate));
            }
        },

        renderMessageNotificationButton: function (obj, gk) {
            if (obj && obj.navigated) {
                return "<span style='cursor:pointer;' class='messageNotificationButton clear viewButton'><i class='fa fa-envelope faa-horizontal animated'></i></span>";
            }
            else
                return gk ?
                    "<span style='cursor:pointer;' class='messageNotificationButton clear viewButton' id='gkMessageContainer'></span>" :
                    "<span style='cursor:pointer;' class='messageNotificationButton viewButton'></span>";
        },

        scrollMessagesDataViewToEnd: function (messagesLv) {
            messagesLv.scrollTo(0, Number.MAX_SAFE_INTEGER);
        },

        showMessagesPopup: function (messageObj) {
            messagesView.conversationUtil.currentMessageType = messageObj.messageType;

            var participant = messageObj.participant, entityType = messageObj.entityType,
                messageType = messageObj.messageType,
                entity = messageObj.entity;

            var entityDisplayName, icon, entityHeader;
            switch (messageType) {
                case MESSAGE_TYPE_ENUMS.ENTITY: {
                    switch (entityType) {
                        case ENTITY_TYPE_ENUMS.GK: {
                            entityHeader = "Poruke za <span class='webix_icon fa-book'></span>" + '<b>' + entity.nazivObjekta + '</b>, šifra: <b>' + entity.sifraObjekta + '</b>';
                            break;
                        }
                        case ENTITY_TYPE_ENUMS.MATERIJAL: {
                            entityHeader = "Poruke za <span class='webix_icon fa-cubes'></span> " + '<b>' + entity.materijalNaziv + '</b>, šifra: <b>' + entity.materijalSifra + '</b>';
                            break;
                        }
                        case ENTITY_TYPE_ENUMS.RAD: {
                            entityHeader = "Poruke za <span class='webix_icon fa-road'></span> " + '<b>' + entity.radNaziv + '</b>, šifra: <b>' + entity.radSifra + '</b>';
                            break;
                        }
                    }
                }
            }

            webix.ui({
                view: "popup",
                width: 800,
                height: 500,
                maxHeight: 700,
                id: "messagesDialog",
                modal: true,
                position: "center",
                body: {
                    id: "addGkInside",
                    rows: [{
                        view: "toolbar",
                        cols: [{
                            view: "label",
                            label: "<span class='webix_icon fa-user'></span> " + util.messagesUtil.concatenameFirstAndLastName(participant) // TODO messaging header text, change icon
                        }, {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            hotkey: "esc",
                            click: "util.dismissDialog('messagesDialog');"
                        }]
                    },
                        {
                            padding: 8,
                            view: "toolbar",
                            css: "panelToolbar",
                            cols: [
                                {
                                    template: entityHeader,
                                    view: "label",
                                    width: 700
                                }]
                        },
                        messagesView.getMessageArea(messageObj)]
                }
            }).show();

            messagesView.fetchMessages(messageObj);
        },

        markMessageIconInDatatable: function (entityType, guid) {

            var dataTableRef;
            switch (entityType.toString()) {
                case ENTITY_TYPE_ENUMS.RAD: {
                    dataTableRef = $$("gkRadoviDT");
                    break;
                }
                case ENTITY_TYPE_ENUMS.MATERIJAL: {
                    dataTableRef = $$("gkMaterijaliDT");
                    break;
                }
                case ENTITY_TYPE_ENUMS.GK: {
                    util.messagesUtil.navigatedToGk = true;
                    break;
                }
            }

            if (dataTableRef)
                dataTableRef.attachEvent("onAfterLoad", function () {
                    setTimeout(function () {
                        var radovi = dataTableRef.find(function (item) {
                            return item.guid == guid;
                        });
                        if (radovi.length) {
                            var rad = radovi[0];
                            rad.navigated = true;
                            dataTableRef.refresh();
                        }
                    }, 0)
                });
        }
    },
    escapeHtml: function (unsafe) {
        return unsafe.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/`/g, '&#x60;')
            .replace(/'/g, "&#039;");
        // '&': '&amp;',
        //     '<': '&lt;',
        //     '>': '&gt;',
        //     '"': '&quot;',
        //     "'": '&#x27;',
        //     '`': '&#x60;'

    }
}