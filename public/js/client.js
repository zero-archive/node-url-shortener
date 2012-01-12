$(function () {
    $('#submit').click(function(e){
        e.preventDefault;
        $.getJSON('/api/v1/shorten', { 'long_url' : $('#urlfield').val() }, function(data){
            if(data.url) {
                $('#urlfield').hide();
                $('#submit').hide();
                $('#urllink a').attr('href', data.url).text(data.url);
                $('#urllink').fadeIn('slow');
            }
        });
    });
});