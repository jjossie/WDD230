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

    $('#product-image').html("<img alt='product image' src='" + dat.path + "'>");

    //insert product info
    var info = $('#product-info');
    info.html('');
    info.append("<h1>" + dat.name + "</h1>");
    info.append("<h2>$" + dat.price + "</h2>");
    info.append("<ul>");
    info.append("<li>" + dat.description + "</li>");
    info.append("<li>" + "Manufactured by: " + dat.manufacturer + "</li>");
    info.append("<li>Reviews: " + dat.reviews + "/5 stars</li>");

    //add title
    $('title').text(dat.name + " | ACME");

    //show content

    cont.css( { "display" : "flex", "flex-flow" : "row wrap", "width" : "100%", "justify-content" : "space-between"});

}

function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
