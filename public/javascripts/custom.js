/*$(document).ready(function() {
    $('#listModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var list = button.data('content'); // Extract info from data-* attributes
        var modal = $(this);
        console.log(modal);
        if (!!list.name) {
            var name = list.name;
            var description = list.desc;
            modal.data('list', list);
            modal.find('#listName').val(list.name);
            modal.find('#listDesc').val(list.desc);
        } else {
            modal.data('list', {id: list, name: "", desc: "", added: new Date() });
            modal.find('#listName').attr("placeholder", "List name");
            modal.find('#listDesc').attr("placeholder", "List description");
        }
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    });

    $('.save-list').on('click', function(event) {
        var modal = $(event.currentTarget)
        console.log(modal)
        var parent = modal.parents('#listModal');
        console.log(parent);
        var list = parent.data('list');
        console.log(list);
    })
});*/
