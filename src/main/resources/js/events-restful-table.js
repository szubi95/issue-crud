window.text = "";

AJS.$(document).ready(function () {

    function getParamSSS(urlText) {
        return {
            autoFocus: false,
            allowDelete: false,
            el: jQuery("#rest-table"),
            model: AJS.RestfulTable.EntryModel.extend({
                distributionDate: function () {
                    this.date();
                }
            }),
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
                    header: "Event name"
                },
                {
                    id: "description",
                    header: "Event description"
                },
                {
                    id: "title",
                    header: "Event title"
                },
                {
                    id: "distributionDate",
                    header: "Event date",
                    createView: AJS.RestfulTable.CustomCreateView.extend({
                        render: function (self) {
                            var $field = AJS.$('<input type="date" class="text aui-date-picker" name="distributionDate" />');
                            $field.datePicker({ 'overrideBrowserDefault': true });

                            return $field;
                        }
                    }),

                    editView: AJS.RestfulTable.CustomEditView.extend({
                        render: function (self) {
                            var $field = AJS.$('<input type="date" class="text aui-date-picker" name="distributionDate">');
                            $field.datePicker({ 'overrideBrowserDefault': true });
                            if (!_.isUndefined(self.value)) {
                                $field.val(new Date(self.value).print("%Y-%m-%d"));
                            }

                            return $field;
                        }
                    }),

                    readView: AJS.RestfulTable.CustomReadView.extend({
                        render: function (self) {
                            var val = (!_.isUndefined(self.value)) ? new Date(self.value).print("%Y-%m-%d") : undefined;

                            return '<span data-field-name="distributionDate">' + (val ? val : '') + '</span>';
                        }
                    })
                }
            ]
        };
    }

    AJS.$("#filter").on('click', function () {
        var text = $('#value').val();

        console.log("WIADOMOŚC COŚ: " + text);

        // AJS.params.text = text;
        // console.log("W2: " + AJS.params.text);

        // parameters.urlParam = text;

        AJS.TableExample.table.$thead.empty();
        AJS.TableExample.table.$tbody.empty();
        AJS.TableExample.table.$table.empty();
        AJS.TableExample = {};
        AJS.TableExample.table = new AJS.RestfulTable(getParamSSS(text));

        // AJS.TableExample.table.fetchInitialResources();
    });

    AJS.TableExample = {};
    AJS.TableExample.table = new AJS.RestfulTable(getParamSSS(""));

    AJS.$(document).bind(AJS.RestfulTable.Events.INITIALIZED, function () {
        AJS.$("th").each(function() {
            AJS.$(this).replaceWith("<th><span>" + AJS.$(this).text() + "</span></th>")
        });
    });

    AJS.$(document).bind(AJS.RestfulTable.Events.ROW_ADDED, function () {
        const restfulTable = AJS.$('#rest-table');
        restfulTable.find('tbody').find('tr').sort(function (a, b) {
            const first = AJS.$('td:first', a).text();
            const second = AJS.$('td:first', b).text();

            return first.localeCompare(second, undefined, {numeric: true})
        }).appendTo(restfulTable);
    });

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
