updateCakeList();
if($(".cakebody").length) {
    updateCommentList();
}

$(".my-rating").starRating({
    totalStars: 5,
    starShape: 'rounded',
    starSize: 40,
    emptyColor: 'lightgray',
    hoverColor: 'salmon',
    activeColor: 'crimson',
    useGradient: false,
    disableAfterRate: false
});

function updateCake(e){
    e.preventDefault()
    $.ajax({
        url: `/cakes/${$(".cakeID").val()}`,
        method: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": $("#updateCakeName").val(),
            "imageURL": $("#updateCakeIMG").val(),
            "yumFactor": $('#my-update-rating').starRating('getRating')
        }),
        success: function(results) {
            $("#my-update-rating").starRating('unload');
            $(".update-rater-holder").append(`<div class="my-rating" id="my-comment-rating" aria-describedby="commentRatingSM"></div>`)
            $(".update-rater-holder #my-update-rating").starRating({
                totalStars: 5,
                starShape: 'rounded',
                starSize: 40,
                emptyColor: 'lightgray',
                hoverColor: 'salmon',
                activeColor: 'crimson',
                useGradient: false,
                disableAfterRate: false
            });
            window.location = "/";
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function deleteCake(){
    $.ajax({
        url: `/cakes/${$(".cakeID").val()}`,
        method: "delete",
        success: function(results) {
            window.location = "/";
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function addComment(e) {
    e.preventDefault()
    $.ajax({
        url: `/cakes/${$(".cakeID").val()}`,
        method: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "comment": {
                "name": $("#commentName").val(),
                "message": $("#commentMsg").val(),
                "yumFactor": $('#my-comment-rating').starRating('getRating')
            }
        }),
        success: function(results) {
            updateCommentList();
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function createCake(e) {
    e.preventDefault();
    $.ajax({
        url: "/cakes",
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": $("#cakeName").val(),
            "imageURL": $("#cakeIMG").val(),
            "yumFactor": $('#my-main-rating').starRating('getRating')
        }),
        success: function(results) {
            updateCakeList();
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function updateCakeList() {
    $.ajax({
        url: "/cakes",
        method: "GET",
        success: function(results) {
            $(".cakeList").html("");
            for(var i = 0; i < results.cakes.length; i++){
                var html = $(`
                    <div class="cake-container">
                        <h3 class="cake-name">
                            <a href="/cakes/${results.cakes[i]._id.toString()}">${results.cakes[i].name.toString()}</a>
                        </h3>
                        <img class="cake-image img-fluid" src=${results.cakes[i].imageURL.toString()}>
                        <div class="my-rating" id="main-rating-${results.cakes[i]._id.toString()}"></div>
                    </div>
                `)
                $(".cakeList").append(html);
                $(`#main-rating-${results.cakes[i]._id.toString()}`).starRating({
                    totalStars: 5,
                    starShape: 'rounded',
                    starSize: 40,
                    emptyColor: 'lightgray',
                    hoverColor: 'salmon',
                    activeColor: 'crimson',
                    useGradient: false,
                    disableAfterRate: true
                });
                $(`#main-rating-${results.cakes[i]._id.toString()}`).starRating('setRating', parseFloat(results.cakes[i].yumFactor.toString()))
                $(`#main-rating-${results.cakes[i]._id.toString()}`).starRating('setReadOnly', true);
                $("#my-main-rating").starRating('unload');
                $(".main-rater-holder").append(`<div class="my-rating" id="my-main-rating" aria-describedby="mainRatingSM"></div>`)
                $("#my-main-rating").starRating({
                    totalStars: 5,
                    starShape: 'rounded',
                    starSize: 40,
                    emptyColor: 'lightgray', 
                    hoverColor: 'salmon',
                    activeColor: 'crimson',
                    useGradient: false,
                    disableAfterRate: false
                });
            }
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function updateCommentList(){
    $.ajax({
        url: `/cakes/${$(".cakeID").val()}/comments`,
        method: "GET",
        success: function(results) {
            $(".commentsList").html("");
            for(var i = 0; i < results.comments.length; i++){
                var html = $(`
                    <div class="comment-container">
                        <h3 class="comment-name">
                            ${results.comments[i].name.toString()}
                        </h3>
                        <p class="comment-message">
                            ${results.comments[i].message.toString()}
                        </p>
                        <div class="my-rating" id="comment-rating-${results.comments[i]._id.toString()}"></div>
                    </div>
                `)
                $(".commentsList").append(html);
                $(`#comment-rating-${results.comments[i]._id.toString()}`).starRating({
                    totalStars: 5,
                    starShape: 'rounded',
                    starSize: 40,
                    emptyColor: 'lightgray',
                    hoverColor: 'salmon',
                    activeColor: 'crimson',
                    useGradient: false,
                    disableAfterRate: true
                });
                $(`#comment-rating-${results.comments[i]._id.toString()}`).starRating('setRating', parseFloat(results.comments[i].yumFactor.toString()))
                $(`#comment-rating-${results.comments[i]._id.toString()}`).starRating('setReadOnly', true);
                $(".comment-rater-holder #my-comment-rating").starRating('unload');
                $(".comment-rater-holder").append(`<div class="my-rating" id="my-comment-rating" aria-describedby="commentRatingSM"></div>`)
                $(".comment-rater-holder #my-comment-rating").starRating({
                    totalStars: 5,
                    starShape: 'rounded',
                    starSize: 40,
                    emptyColor: 'lightgray',
                    hoverColor: 'salmon',
                    activeColor: 'crimson',
                    useGradient: false,
                    disableAfterRate: false
                });
            }
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function seedDB(e) {
    e.preventDefault();
    $.ajax({
        url: `/seed`,
        method: "GET",
        success: function(){
            window.location = "/";
        },
        error: function(error) {
            showalert(error.responseJSON.error.toString())
        }
    });
}

function showalert(message) {
    $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-danger"><span>' + message + '</span></div>')
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
      $("#alertdiv").remove();
    }, 5000);
  }