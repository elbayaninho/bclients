$(function () {

  /* Functions */

  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-client").modal("show");
      },
      success: function (data) {
        $("#modal-client .modal-content").html(data.html_form);
      }
    });
  };

  var saveForm = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          if (data.mode == 1) {
            // Create Client
            iziToast.success({
              timeout: 5000,
              icon: 'fa fa-check-circle',
              title: 'SUCCESS',
              message: "Client ajouté avec succès"
            });
            // Ici on s'occupe des lignes du tables
            // DataTable
            var dt = $("#client-table").DataTable();
            console.log(dt.page.info().recordsTotal);
            if (dt.page.info().recordsTotal == 0) {
              // Tableau vide
              $("#client-table td.dataTables_empty").closest('tr').replaceWith(data.html_client_list);
              $("#client-table tr:eq(-1)").children('td, th').css('backgroundColor', '#55ff7f');
              setTimeout(() => {
                $("#client-table tr:eq(-1)").children('td, th').css('backgroundColor', '');
              }, 15000);
              // S'il ya un seul element on refresh
              location.reload(true);
            } else {
              // Tableau n'est pas vide
              $("#client-table tr:first").after(data.html_client_list);
              $("#client-table tr:eq(1)").children('td, th').css('backgroundColor', '#55ff7f');
              setTimeout(() => {
                $("#client-table tr:eq(1)").children('td, th').css('backgroundColor', '');
              }, 5000);
            }
          } else if (data.mode == 2) {
            // Update Client
            iziToast.success({
              timeout: 5000,
              icon: 'fa fa-check-circle',
              title: 'SUCCESS',
              message: "Client modifié avec succès"
            });
            // Ici on s'occupe des lignes du tables
            var client_id = "client-" + data.client_id;
            console.log(client_id);
            $("#client-table #" + client_id).replaceWith(data.html_client_list);
            $("#client-table #" + client_id).children('td, th').css('backgroundColor', '#55ff7f');
            setTimeout(() => {
              $("#client-table #" + client_id).children('td, th').css('backgroundColor', '');
            }, 5000);
          } else {
            // Delete Client
            iziToast.success({
              timeout: 5000,
              icon: 'fa fa-check-circle',
              title: 'SUCCESS',
              message: "Client supprimé avec succès"
            });
            // Quelques verifications
            var client_id = "client-" + data.client_id;
            console.log(client_id);
            if (data.size == 0) {
              $("#client-table #" + client_id).replaceWith(
                `<tr class="odd"><td valign="top" colspan="5" class="dataTables_empty">Aucun client disponible</td></tr>`
              );
              // S'il ya un seul element on refresh
              location.reload(true);
            } else {
              $("#client-table #" + client_id).remove(); // On retire la ligne
            }
          }
        }
        else {
          $("#modal-client .modal-content").html(data.html_form);
          iziToast.error({
            timeout: 7000,
            icon: 'fa fa-times-circle',
            title: 'DANGER',
            message: "Une erreur inattendue est apparue"
          });
        }
        $("#modal-client").modal("hide");
      }
    });
    return false;
  };


  /* Binding */

  // Create client
  $(".js-create-client").click(loadForm);
  $("#modal-client").on("submit", ".js-client-create-form", saveForm);

  // Read client
  $("#client-table").on("click", ".js-view-client", loadForm);

  // Update client
  $("#client-table").on("click", ".js-update-client", loadForm);
  $("#modal-client").on("submit", ".js-client-update-form", saveForm);

  // Delete client
  $("#client-table").on("click", ".js-delete-client", loadForm);
  $("#modal-client").on("submit", ".js-client-delete-form", saveForm);

});