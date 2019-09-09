$(document).ready(function() {
    $('#searchInput').keyup(function () {

        const filter = $('#searchInput').val().toUpperCase();

        $('#rest-table tr').each(function () {
            td = $(this).find('td')[1];

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    $(this).css('display', '');
                } else {
                    $(this).css('display', 'none');
                }
            }
        });
    });
});