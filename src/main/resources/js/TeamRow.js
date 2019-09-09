// jQuery.namespace("JIRA.Admin.Team.TeamRow");
//
// editView = AJS.RestfulTable.Row.extend({
//     initialize: function () {
//         AJS.RestfulTable.Row.prototype.initialize.apply(this, arguments);
//         this.delegateEvents();
//     },
//
//     render: function () {
//         var data = this.model.toJSON(),
//             id = this.model.get("id"),
//             $el = this.$el;
//
//         console.log("Model: " + this.model);
//
//         $el.attr("id", "team-" + id + "-row").attr("data-id", id);
//         $el.html(editView({
//             team: data
//         }));
//         return this;
//     }
//
//     // },
//     //
//     //     render: function (self) {
//     //         var $field = AJS.$('<input type="date" class="text aui-date-picker" name="date">');
//     //         $field.datePicker({'overrideBrowserDefault': true});
//     //         if (!_.isUndefined(self.value)) {
//     //             $field.val(new Date(self.value).print("%Y-%m-%d"));
//     //         }
//     //         return $field;
//     //     }
//
// });