$(document).ready(function () {

    const b = document.getElementById("editFlag").value;
    var newVar = typeof b;

    console.log("Typ: " + newVar);

    console.log("wartosc dom b: " + b);

    const editFlag = (b === 'true');


    /* Sticky Message Bar */
    AJS.$(window).scroll(function(e){
        el = AJS.$('#aui-message-bar');
        if (AJS.$(this).scrollTop() > 200 && el.css('position') != 'fixed'){
            AJS.$('#aui-message-bar').css({'position': 'fixed', 'top': '110px'});
        }
    });


    function getParamSSS(urlText) {
        return {
            autoFocus: false,
            allowDelete: false,
            el: jQuery("#rest-table"),
            model: AJS.RestfulTable.EntryModel.extend({
                save: function (data, options) {

                    //console.log("Błąd? ", options);

                    // var success = options.success;
                    // options.success = function(model, data, xhr) {
                    //     if (xhr.status === 200) {
                    //         AJS.messages.success({
                    //             title: "You have the following Validation Errors",
                    //             body: "<ul> element utworzony pomyślnie </ul>"
                    //         });
                    //     }
                    // };
                    // if (success) {
                    //     return AJS.RestfulTable.EntryModel.prototype.save(this, data)
                    // }

                    var oldError = options.error;
                    options.error = function (model, data, xhr) {
                        if (xhr.status === 500) {
                            var errorMessageBody = data.message;

                            console.log("model: ", model);
                            console.log("data: ", data);
                            console.log("xhr: ", data);

                            // AJS.$.each( data.errors, function( index, error ) {
                            //     errorMessageBody = errorMessageBody + "<li>" + error.message + "</li>";
                            // });
                            AJS.messages.error({
                                title: "You have the following Validation Errors",
                                body: "<ul>"+ errorMessageBody +"</ul>"
                            });

                            // var myFlag = AJS.flag({
                            //     type: 'info',
                            //     body: "<ul>"+ errorMessageBody +"</ul>"
                            // });
                        }
                        if (oldError) {
                            return oldError.apply(this, arguments)
                        }
                    };

                    return AJS.RestfulTable.EntryModel.prototype.save.call(this, data, options)
                }
            }),
            // model: AJS.RestfulTable.EntryModel.extend({
            //     distributionDate: function () {
            //         this.date();
            //     }
            // }),
            resources: {
                all: AJS.params.baseURL + "/rest/myrestresource/1.0/message/all?value=" + urlText,
                self: AJS.params.baseURL + "/rest/myrestresource/1.0/message/self"
            },
            columns: [
                {
                    id: "id",
                    header: "Event id",
                    allowEdit: false,
                    createView: AJS.RestfulTable.CustomCreateView.extend({
                        render: function () {
                            return AJS.$('');
                        }
                    })
                },
                {
                    id: "name",
                    header: "Event name",
                    allowEdit: editFlag
                },
                {
                    id: "description",
                    header: "Event description",
                    allowEdit: editFlag
                },
                {
                    id: "title",
                    header: "Event title",
                    allowEdit: editFlag
                },
                {
                    id: "isGood",
                    header: "Event isGood",
                    allowEdit: editFlag
                }
                // {
                //     id: "distributionDate",
                //     header: "Event date",
                //     allowEdit: editFlag,
                //     createView: AJS.RestfulTable.CustomCreateView.extend({
                //         render: function (self) {
                //             var $field = $('<input type="date" class="text aui-date-picker" name="distributionDate" />');
                //             $field.datePicker({'overrideBrowserDefault': true});
                //
                //             console.log("create: ", self);
                //
                //             return $field;
                //         }
                //     }),
                //
                //     editView: AJS.RestfulTable.CustomEditView.extend({
                //         render: function (self) {
                //             var $field = $('<input type="date" class="text aui-date-picker" name="distributionDate">');
                //             $field.datePicker({'overrideBrowserDefault': true});
                //             if (!_.isUndefined(self.value)) {
                //                 $field.val($.datepicker.formatDate('yy-mm-dd', new Date(self.value)));
                //
                //                 //$field.val(new Date(self.value).print("%Y-%m-%d"));
                //             }
                //
                //             console.log("self: ", self);
                //
                //             return $field;
                //         }
                //     }),
                //
                //     readView: AJS.RestfulTable.CustomReadView.extend({
                //         render: function (self) {
                //             var val = (!_.isUndefined(self.value)) ? $.datepicker.formatDate('yy-mm-dd', new Date(self.value)) : undefined;
                //
                //             // var val = (!_.isUndefined(self.value)) ? new Date(self.value).print("%Y-%m-%d") : undefined;
                //
                //             return '<span data-field-name="distributionDate">' + (val ? val : '') + '</span>';
                //         }
                //     })
                // }
            ]
        };
    }

    AJS.$("#filter").on('click', function () {
        var text = $('#value').val();

        AJS.TableExample.table.$thead.empty();
        AJS.TableExample.table.$tbody.empty();
        AJS.TableExample.table.$table.empty();
        AJS.TableExample = {};
        AJS.TableExample.table = new AJS.RestfulTable(getParamSSS(text));

        // AJS.TableExample.table.fetchInitialResources();
    });

    AJS.TableExample = {};
    AJS.TableExample.table = new AJS.RestfulTable(getParamSSS(""));




    /* Validation Hack  */
    var RowModel = AJS.RestfulTable.EntryModel.extend({
        save: function (data, options) {

            console.log("Błąd? ");

            var oldError = options.error;
            options.error = function (model, data, xhr) {
                if (xhr.status === 400) {
                    var errorMessageBody = "";
                    AJS.$.each( data.errors, function( index, error ) {
                        errorMessageBody = errorMessageBody + "&lt;li&gt;" + error.message + "&lt;/li&gt;";
                    });
                    AJS.messages.error({
                        title: "You have the following Validation Errors",
                        body: "&lt;ul&gt;"+ errorMessageBody +"&lt;/ul&gt;",
                        fadeout : true
                    });
                }
                if (oldError) {
                    return oldError.apply(this, arguments)
                }
            };
            return AJS.RestfulTable.EntryModel.prototype.save.call(this, data, options)
        }
    });




    AJS.$(document).bind(AJS.RestfulTable.Events.INITIALIZED, function () {
        AJS.$("th").each(function() {
            AJS.$(this).replaceWith("<th><span>" + AJS.$(this).text() + "</span></th>")
        });

        //e.preventDefault();




        // AJS.$(document).on ("click", ".aui-button", function (e) {
        //     //e.preventDefault();
        //
        //     console.log("this: ", $(this));
        //     var c = $(this);
        //     console.log("c: ", c);
        //
        //     AJS.dialog2("#demo-dialog").show();
        //
        //
        //     AJS.$(document).on ("click", "#confirm", function () {
        //         //AJS.$('#confirm').click(function(e) {
        //         //e.preventDefault();
        //
        //         console.log("ok: ", e);
        //
        //         AJS.dialog2("#demo-dialog").hide();
        //
        //
        //
        //             //
        //
        //
        //         //c.click();
        //
        //         //i = 1;
        //
        //         //$(".aui-button").off(e);
        //         return true;
        //     });
        // });

        // AJS.$('.aui-restfultable-operations input[value="Add"]').attr("class", "disabled");
    });

    AJS.$(document).bind(AJS.RestfulTable.Events.ROW_ADDED, function (event) {
        const restfulTable = AJS.$('#rest-table');
        restfulTable.find('tbody').find('tr').sort(function (a, b) {
            const first = AJS.$('td:first', a).text();
            const second = AJS.$('td:first', b).text();

            return first.localeCompare(second, undefined, {numeric: true})
        }).appendTo(restfulTable);

        // AJS.$('.aui-restfultable-operations input[value="Add"]').attr("class", "disabled");

        console.log("ROW_ADDED");

        AJS.messages.success({
            title: "You have the following Validation Errors",
            body: "<ul>Rekord dodany do tabeli! :)</ul>"
        });

        // event.preventDefault();
        // console.log("event: ", event);
        //
        // AJS.$(document).on ("click", ".aui-button", function (event) {
        //     event.preventDefault();
        //     console.log("kliknięty?", event);
        //
        //     $(this).submit();
        // });

    });


    AJS.$(document).bind(AJS.RestfulTable.Events.SUBMIT_STARTED, function (event) {
        // row.bind(AJS.RestfulTable.Events.RENDER, function () {
        //     this.$el.addClass("myclass");
        // });

        console.log("zdarzenie: ", event);
    });









    AJS.$(document).bind(AJS.RestfulTable.Events.CREATED, function () {
       console.log("CREATED");
    });

    AJS.$(document).bind(AJS.RestfulTable.Events.RENDER, function () {
        console.log("RENDER");
    });








    //
    // var c = $('.aui-button');
    //
    // var i = 0;
    //
    // AJS.dialog2("#demo-dialog").show();
    //
    //
    // $('#confirm').click(function() {
    //     //AJS.dialog2("#demo-dialog").hide();
    //     //c.click();
    //
    //     console.log("Niby tak? wtf?");
    //     //e = undefined;
    //     console.log("remove: ", e);
    //     //e.stopPropagation();
    //
    //     i = 1;
    //     return i;
    // });
    //
    // $('#cancel').click(function() {
    //     AJS.dialog2("#demo-dialog").hide();
    //     console.log("cancel");
    //     //e.stopPropagation();
    //
    //     console.log("remove1: ", e);
    //
    //     //$('.aui-button').off();
    //     //e = undefined;
    //     console.log("remove2: ", e);
    //
    //     //$(c).on( e );
    //     e.stopPropagation();
    //     return false;
    // });
    //
    //
    // console.log("b: ", b);
    // console.log("e: ", e);
    // console.log("this: ", c);
    //
    // //$('.aui-button').unbind('click');
    // // $( this ).off(e);
    //
    // //AJS.dialog2("#demo-dialog").hide();
    //
    // if (i === 1) {
    //     $('.aui-button').one('click', function(e) {
    //         console.log("cos");
    //
    //         // and when you done:
    //         c.click();
    //     });
    //
    //     // AJS.dialog2("#demo-dialog").hide();
    //     // e.stopPropagation();
    //     // c.click();
    //     // return true;
    //     return false;
    // }













});

// (function ($) {
//
//     var EditGroupView = AJS.RestfulTable.CustomEditView.extend({
//         render: function (self) {
//             var $select = $("<select name='group' class='select'>" +
//                 "<option value='Friends'>Friends</option>" +
//                 "<option value='Family'>Family</option>" +
//                 "<option value='Work'>Work</option>" +
//                 "</select>");
//
//             $select.val(self.value); // select currently selected
//             return $select;
//         }
//     });
//
//     var NameReadView = AJS.RestfulTable.CustomReadView.extend({
//         render: function (self) {
//             return $("<strong />").text(self.value);
//         }
//     });
//
//     var CheckboxEditView = AJS.RestfulTable.CustomEditView.extend({
//         render: function (self) {
//             console.log(self);
//             var $select = $("<input type='checkbox' class='ajs-restfultable-input-" + self.name + "' />" +
//                 "<input type='hidden' name='" + self.name + "'/>");
//             return $select;
//         }
//     });
//
//     var DummyReadView = AJS.RestfulTable.CustomReadView.extend({
//         render: function (self) {
//             return $("<strong />").text("Blah");
//         }
//     });
//
//     // DOM ready
//     $(function () {
//         var auiEvents = ["ROW_ADDED", "REORDER_SUCCESS", "ROW_REMOVED", "EDIT_ROW"];
//         _.each(auiEvents, function(eventName){
//             $(AJS).one(AJS.RestfulTable.Events[eventName], function(){
//                 AJS.messages.info("#message-area", {
//                     id: eventName,
//                     title: "test",
//                     body: eventName + " fired on AJS. Used for testing AJS events."
//                 });
//             });
//         });
//
//         var url = AJS.contextPath() + "/rest/contacts/1.0/contacts",
//             $contactsTable = $("#contacts-table"),
//             $contactsAddPositionBottomTable = $("#contacts-table-addPositionBottom");;
//
//         new AJS.RestfulTable({
//             el: $contactsTable, // <table>
//             autofocus: true, // auto focus first field of create row
//             columns: [
//                 {id: "name", header: "Name", readView: NameReadView}, // id is the mapping of the rest property to render
//                 {id: "group", header: "Group", editView: EditGroupView}, // header is the text in the <th>
//                 {id: "number", header: "Number"},
//                 {id: "checkbox", header: "Checkbox", readView: DummyReadView, editView: CheckboxEditView}
//             ],
//             resources: {
//                 all: url, // resource to get all contacts
//                 self: url // resource to get single contact url/{id}
//             },
//             noEntriesMsg: "You have no contacts. Loner!", // message to be displayed when table is empty
//             allowReorder: true, // drag and drop reordering
//             fieldFocusSelector: function(name) {
//                 return ":input[type!=hidden][name=" + name + "], #" + name + ", .ajs-restfultable-input-" + name;
//             }
//         });
//
//         // duplicate of the first table but with the addPosition: "bottom" option applied.
//         new AJS.RestfulTable({
//             el: $contactsAddPositionBottomTable, // <table>
//             autofocus: true, // auto focus first field of create row
//             columns: [
//                 {id: "name", header: "Name", readView: NameReadView}, // id is the mapping of the rest property to render
//                 {id: "group", header: "Group", editView: EditGroupView}, // header is the text in the <th>
//                 {id: "number", header: "Number"},
//                 {id: "checkbox", header: "Checkbox", readView: DummyReadView, editView: CheckboxEditView}
//             ],
//             resources: {
//                 all: url, // resource to get all contacts
//                 self: url // resource to get single contact url/{id}
//             },
//             noEntriesMsg: "You have no contacts. Loner!", // message to be displayed when table is empty
//             allowReorder: true, // drag and drop reordering
//             fieldFocusSelector: function(name) {
//                 return ":input[type!=hidden][name=" + name + "], #" + name + ", .ajs-restfultable-input-" + name;
//             },
//             addPosition: "bottom"
//         });
//     });
//
// })(AJS.$);
