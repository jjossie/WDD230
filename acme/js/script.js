var acme;
$(function () {
    //Build the navigation bar

    $.getJSON('/acme/js/acme.json', function (data) {
        console.log(data);
        acme = data;
        $('nav ul').html("<li><a href='/acme/index.html'>Home</a></li>");
        $.each(data.Navigation, function (num, obj) {
            var navstring = "<li> <a class='navLink' href='/acme/" + obj + ".html'>" + toTitleCase(obj) + "</a></li>";
            //            var navstring = "<li class='navLink'>" + toTitleCase(obj) + "</li>";
            $('nav ul').append(navstring);
        });
        $('.navLink').click(function (event) {
            event.preventDefault();
            var pageName = $(this)[0].innerHTML;
            makePage(pageName);

        });
    });


});

function makePage(name) {
    var dat = acme[name];
    var cont = $('#content');
    // Insert page content
    $('#home').hide();
    $('#content h2').html(dat.name);


    cont.show();
}

function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
