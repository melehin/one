define(function(require) {
  var OpenNebulaAction = require('./action');
  var OpenNebulaError = require('./error');
  var Locale = require('utils/locale');

  var RESOURCE = "DOCUMENT";
  var PATH = 'service';

  var TAB_ID = require('tabs/oneflow-services-tab/tabId');
  var PANEL_ID = require('tabs/oneflow-services-tab/panels/roles/panelId');

  function generate_batch_action_params() {
    var context = $('#'+TAB_ID+' #'+PANEL_ID);

    var action_obj = {
        "period" : $("#batch_action_period", context).val(),
        "number" : $("#batch_action_number", context).val()};

    return action_obj;
  }

  var Role = {
    "resource": RESOURCE,
    "state" : function(state_int) {
      state_int = state_int ? state_int : 0;
      var state = [
          Locale.tr("PENDING"),
          Locale.tr("DEPLOYING"),
          Locale.tr("RUNNING"),
          Locale.tr("UNDEPLOYING"),
          Locale.tr("WARNING"),
          Locale.tr("DONE"),
          Locale.tr("FAILED_UNDEPLOYING"),
          Locale.tr("FAILED_DEPLOYING"),
          Locale.tr("SCALING"),
          Locale.tr("FAILED_SCALING"),
          Locale.tr("COOLDOWN")
      ][state_int]
      return state ? state : state_int;
    },
    "hold" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "hold",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "release" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "release",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "suspend" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "suspend",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "resume" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "resume",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "stop" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "stop",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "boot" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "boot",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "delete_recreate" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "delete-recreate",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "reboot" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "reboot",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "reboot_hard" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "reboot-hard",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "poweroff" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "poweroff",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "poweroff_hard" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "poweroff-hard",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "undeploy" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "undeploy",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "undeploy_hard" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "undeploy-hard",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "snapshot_create" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "snapshot-create",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "shutdown" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "shutdown",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "cancel" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "shutdown-hard",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "del" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "delete",
                                      generate_batch_action_params(),
                                      PATH);
    },
    "recover" : function(params) {
      OpenNebulaAction.simple_action(params,
                                      RESOURCE,
                                      "recover",
                                      null,
                                      PATH);
    },
    "update" : function(params) {
      var request = OpenNebula.Helper.request(RESOURCE, "update", params.data.id);

      $.ajax({
        url: PATH + "/" + params.data.id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params.data.extra_param),
        success: function(response) {
          return params.success ? params.success(request, response) : null;
        },
        error: function(response) {
          return params.error ? params.error(request, OpenNebulaError(response)) : null;
        }
      });
    }
  }

  return Role;
})