var facultyView = {

    // Funkcija za prikaz faculty view-a
    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "facultyPanel"; // novi rightPanel će biti facultyPanel

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);

        facultyView.createDatatableContextMenu(); // dodavanje izmjene i brisanja na kontekstni meni

        connection.attachAjaxEvents('facultyDT', 'faculty');
    },

    // Funkcija koja vraca panel objekat
    getPanel: function () {
        return {
            id: "facultyPanel", // rightPanel globalna varijabla -> koristi se za destrukcija view-a kad se view napušta

            rows: [
                // 1. red
                {
                    padding: 8,
                    view: "toolbar",
                    css: "panelToolbar",
                    cols: [{
                        template: "<span class='webix_icon fa-graduation-cap'><\/span> Fakulteti",
                        view: "label",
                        width: 400
                    }, {},
                        {
                            view: "button",
                            autowidth: true,
                            icon: "plus-circle",
                            id: "addFacultyBtn",
                            label: "Dodaj fakultet",
                            type: "iconButton",
                            click: "facultyView.showAddDialog"
                        }]
                },
                // 2. red
                {
                    view: "datatable",
                    id: "facultyDT",
                    navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
                    editable: true,
                    editaction: "dblclick", // dvostrukim klikom se moze izmijeniti polje u tabeli
                    select: "row", // cell
                    resizeColumn: true, // omogucen resize kolona korisniku
                    resizeRow: true, // omogucen resize redova korisniku
                    on: {
                        onAfterContextMenu: function (item) {
                            this.select(item.row); // dodat event handler kada korisnik uradi desni klik na neki red u tabeli kako bi se oznaci red u tabeli za koji se otvara kontekstni meni.
                        }
                    },
                    columns: [{
                        editor: "text",
                        fillspace: true,
                        header: ["Naziv", {content: "textFilter"}],
                        id: "name",
                        sort: "string"
                    }, {
                        editor: "text",
                        fillspace: true,
                        header: ["Adresa", {content: "textFilter"}],
                        id: "address",
                        sort: "string"
                    }],
                    url: "faculty" // endpoint sa kog se pune podaci u datatable -> moguce i sa data
                }]
        }
    },

    addDialog: {
        view: "popup",
        id: "addFacultyDialog",
        position: "center",
        modal: true,
        body: {
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    width: 400,
                    label: "<span class='webix_icon fa-graduation-cap'><\/span> Dodaj fakultet"
                }, {}, {
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('addFacultyDialog')"
                }]
            }, {
                elementsConfig: {labelWidth: 140, bottomPadding: 18},
                view: "form",
                elements: [{
                    view: "text",
                    invalidMessage: "Molimo unesite naziv.",
                    name: "name",
                    id: "name",
                    attributes: {maxLength: 45},
                    label: "Naziv:",
                    required: true
                }, {
                    view: "text",
                    name: "address",
                    attributes: {maxLength: 45},
                    id: "address",
                    label: "Adresa:"
                }, {
                    margin: 5,
                    cols: [{}, {
                        view: "button",
                        hotkey: "enter",
                        width: 150,
                        id: "saveFaculty",
                        type: "form",
                        value: "Sačuvaj",
                        click: "facultyView.save"
                    }]
                }],
                width: 500,
                rules: {},
                id: "addFacultyForm"
            }]
        }
    },

    editDialog: {
        view: "popup",
        id: "editFacultyDialog",
        position: "center",
        modal: true,
        body: {
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    width: 400,
                    label: "<span class='webix_icon fa-graduation-cap'><\/span> Promijeni podatke o fakultetu"
                }, {}, {
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('editFacultyDialog')"
                }]
            }, {
                elementsConfig: {labelWidth: 140, bottomPadding: 18},
                view: "form",
                elements: [{view: "text", hidden: true, name: "id", id: "id", label: "Id:"}, {
                    view: "text",
                    invalidMessage: "Molimo unesite naziv.",
                    name: "name",
                    id: "name",
                    label: "Naziv:",
                    attributes: {maxLength: 45},
                    required: true
                }, {
                    view: "text",
                    name: "address",
                    id: "address",
                    attributes: {maxLength: 45},
                    label: "Adresa:"
                }, {
                    margin: 5,
                    cols: [{}, {
                        view: "button",
                        hotkey: "enter",
                        width: 150,
                        id: "saveFaculty",
                        type: "form",
                        value: "Sačuvaj",
                        click: "facultyView.saveEdited"
                    }]
                }],
                width: 500,
                rules: {},
                id: "editFacultyForm"
            }]
        }
    },

    showAddDialog: function () {
        webix.ui(webix.copy(facultyView.addDialog));
        $$("addFacultyDialog").show();
        webix.UIManager.setFocus("name"); // fokusiranje polja za unos Naziva
    },

    saveOld: function () {
        var createForm = $$("addFacultyForm");
        if (createForm.validate()) {
            var newItem = createForm.getValues();
            connection.sendAjax("POST", "faculty", function (text, data, xhr) {
                var record = data.json();
                util.messages.showMessage("Podaci o fakultetu su uspješno sačuvani.");
                $$("facultyDT").add(record);
            }, function () {
                util.messages.showErrorMessage("Došlo je do greške prilikom kreiranja zapisa o fakultetu.");
            }, newItem);
            util.dismissDialog('addFacultyDialog');
        }
    },

    save: function () {
        var createForm = $$("addFacultyForm");
        if (createForm.validate()) {
            var newItem = createForm.getValues();
            $$("facultyDT").add(newItem);
            util.dismissDialog('addFacultyDialog');
        }
    },

    // object - red koji trenutno mijenjamo npr. { id: 1, name: "Faculty of economics", address: "Coronation St" }
    showEditDialog: function (object) {
        webix.ui(webix.copy(facultyView.editDialog));
        $$("editFacultyForm").setValues(object);
        setTimeout(function () {
            $$("editFacultyDialog").show();
            webix.UIManager.setFocus("name");
        }, 0);
    },

    saveEdited: function () {
        var editForm = $$("editFacultyForm");
        if (editForm.validate()) {
            var newItem = editForm.getValues();
            connection.sendAjax("PUT", "faculty/" + newItem.id, function (text, data, xhr) {
                if (text === "Success") {
                    util.messages.showMessage("Podaci o fakultetu su uspješno promijenjeni.");
                    $$("facultyDT").updateItem(newItem.id, newItem); // updateItem osvjezava vrijednosti za odabrani red po id-u
                }
                else
                    util.messages.showErrorMessage("Došlo je do greške prilikom promjene podataka o fakultetu.");
            }, function () {
                util.messages.showErrorMessage("Došlo je do greške prilikom promjene podataka o fakultetu.");
            }, newItem);
            util.dismissDialog('editFacultyDialog');
        }
    },

    // DEPRECATED brisanje sad radi kroz connection.attachAjaxEvents('facultyDT', 'faculty');
    deleteRecordOld: function (id) {
        connection.sendAjax("DELETE", "faculty/" + id, function () {
            $$("facultyDT").remove(id);
            util.messages.showMessage("Fakultet uspješno obrisan.");
        }, function () {
            util.messages.showErrorMessage("Došlo je do greške pri brisanju fakulteta.");
        })
    },

    // Funkcija za dodavanje kontekstnog menija (izmjena, brisanje) na datatable "facultyDT"
    createDatatableContextMenu: function () {
        webix.ui({
            view: "contextmenu",
            id: "facultyContextMenu",
            width: 200,
            data: [{
                id: "1",
                value: "Izmijeni",
                icon: "pencil"
            },
                {
                    id: "2",
                    value: "Obriši",
                    icon: "trash"
                }],
            master: $$("facultyDT"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1": {
                            facultyView.showEditDialog($$("facultyDT").getItem(context.id));
                            break;
                        }
                        case "2": {
                            var delBox = {
                                title: "Brisanje fakulteta",
                                ok: "Da",
                                cancel: "Ne",
                                width: 500,
                                text: "Da li ste sigurni da želite obrisati fakultet?",
                                callback: function (okPressed) {
                                    if (okPressed) { // Korisnik potvrdio brisanje -> Odabrao opciju na "Da"
                                        $$("facultyDT").remove(context.id.row);
                                    } else { // Korisnik odustao od brisanja -> Odabrao opciju "Ne:

                                    }
                                }
                            };
                            webix.confirm(delBox);
                            break;
                        }
                    }
                }
            }
        });
    }
};