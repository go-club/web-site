var $ = window.$;
var dialog = require('vex/js/vex.dialog.js');

$('#users [data-toggle=tooltip]').tooltip();

$('#users .delete').click(function(){
    dialog.confirm({
        message: 'Are you sure you want to delete user `' + $(this).data('id') +'` ?',
        callback: function(value){
            if (value) {
                alert('ok')    
            }
            
        }
    });
    
});