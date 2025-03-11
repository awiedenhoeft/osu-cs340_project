function deletePayment(invoiceID) {
    let link = '/delete-payment-ajax/';
    let data = {
      id: invoiceID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(invoiceID);
      }
    });
  }
  
  function deleteRow(invoiceID){
      let table = document.getElementById("payment-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == invoiceID) {
              table.deleteRow(i);
              break;
         }
      }
  }