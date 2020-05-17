//profile-sticky
window.onscroll = function() { Scroll() };

var profile = document.getElementById("profile"),
    sticky = profile.offsetTop;

function Scroll() {
    if (window.pageYOffset >= sticky) {
        profile.classList.add("sticky");
    } else {
        profile.classList.remove("sticky");
    }
};
//table
$(document).ready(function() {

    $.ajax({
        type: "get",
        url: "https://sinhvien.phongdaotao.com/getcourses.php?fbclid=IwAR0ik9tfAW5Rlihz8U9uHEg3GwXSq8_NQWFRjjoETdQEJodo5iq-LIFEo7Q",
        success: function(response) {
            response.data.forEach(element => {
                var trid = $("<tr class='click'></tr>"),
                    tdid = $('<td>' + element.id + '</td>'),
                    tr_infor = $("<tr class='info-couses'></tr>"),
                    td_infor = $("<td colspan='2'></td>");
                trid.append(tdid);
                var tdname = $('<td>' + element.name + '</td>');
                trid.append(tdname);
                $.ajax({
                    type: "get",
                    url: "https://sinhvien.phongdaotao.com/course.php?id=" + element.id,
                    success: function(elm_infor) {
                        var p1 = $('<p class="tag-p">Description:  ' + elm_infor.description + '</p>');
                        var p2 = $('<p class="tag-p">Textbook:  ' + elm_infor.textbook + '</p>');
                        td_infor.append(p1, p2);
                        tr_infor.append(td_infor);
                    }
                });
                $('table').append(trid);
                $('table').append(tr_infor);
            });
            //load Data môn học
            $('.click').click(function() {
                    $(this).next().toggle();
                })
                //page1 and page2
                //next and previous
            $(".click:nth-child(n+9)").hide();
            var pageIndex = 1;
            $("#page1").prop("disabled", true);
            $(".click:nth-child(n+9)").hide();
            $('#page2').click(function() {
                $(".click:nth-child(n+9)").show();
                $('.click:nth-child(-n+8)').hide();
                $("#page2,#next").prop("disabled", true);
                $("#page1,#previous").prop("disabled", false);
                pageIndex = 2;
                $('.info-couses').hide();
            })
            $('#page1').click(function() {
                $(".click:nth-child(n+9)").hide();
                $('.click:nth-child(-n+8)').show();
                $("#page2,#next").prop("disabled", false);
                $("#page1,#previous").prop("disabled", true);
                $('.info-couses').hide();
                pageIndex = 1;
            })
            $('#previous').click(function() {
                if (pageIndex == 2) {
                    pageIndex--;
                    $('.click:nth-child(n+9)').hide();
                    $('.click:nth-child(-n+8)').show();
                    $('#page2,#next').prop("disabled", false);
                    $('.info-couses').hide();
                    $('#page1,#previous').prop("disabled", true);
                }
            })
            $('#next').click(function() {
                if (pageIndex === 1) {
                    pageIndex++;
                    $('.click:nth-child(n+9)').show();
                    $('.click:nth-child(-n+8)').hide();
                    $("#page2,#next").prop('disabled', true);
                    $('.info-couses').hide();
                    $('#page1,#previous').prop('disabled', false);
                }
            })

            function loadPage(index) {
                if (index === 1) {
                    $('.click:nth-child(n+9)').show();
                    $('.click:nth-child(-n+8)').hide();
                } else {
                    $('.click:nth-child(n+9)').hide();
                    $('.click:nth-child(-n+8)').show();
                }
            }
        }
    });
    //đổi text khi next hoặc back
    $('#page1,#previous').click(function() {
        $('#show').text("Showing 1 to 4 of 8 entries");
    });
    $('#page2,#next').click(function() {
        $('#show').text("Showing 5 to 8 of 8 entries");
    });
});