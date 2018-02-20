$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        /*autoWidth:true,*/
        dots:false,
        loop: true,
        margin: 10,
        nav: true,
        /*autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        autoplaySpeed:1000,*/
        navText: ['<img src="img/prev-ins.png">','<img src="img/next-ins.png">'],
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            }
        }
    })
});

$(document).ready(function () {
    $('.owl-carousel-product').owlCarousel({
        dots:false,
        loop: true,
        margin: 10,
        nav: true,
        /*autoplay:true,
         autoplayTimeout:3000,
         autoplayHoverPause:true,
         autoplaySpeed:1000,*/
        navText: ['<img src="img/prev-prod.png">','<img src="img/next-prod.png">'],
        responsive:{
            0:{
                items:1
            },
            450:{
                items:2
            },
            640:{
                items:3
            },
            1200:{
                items:4
            }
        }
    })
});

