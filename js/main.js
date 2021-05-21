!(function ($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
    $(".toggle").on("click", function () {
      if ($(".item").hasClass("active")) {
        $(".item").removeClass("active");
      }
      else {
        $(".item").addClass("active");
      }
    });

    // fetch portfolio items
    fetch('js/portfolio-items.json')
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }

          // examine the text in the response
          response.json().then(function (data) {

            console.log(data.portfolio)
            portfolio(data.portfolio)
          })
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });

    // function to add portfolio item to the index page

    const portfolio = (items) => {
      let data = items;

      const portfolio = document.getElementById('portfolio-item');

      for (let i = 0; i < data.length; i++) {
        let portfolioItems = document.createElement('div');
        //  portfolioItems.setAttribute('id', 'portfolio')

        //  text
        let header = document.createElement('h2');

        let text = document.createElement('p');

        header.innerText = data[i].title;

        text.innerText = data[i].coded_with;

        let linkWrap = document.createElement('div');

        let repoLink = document.createElement('a');

        let liveUrlLink = document.createElement('a');

        repoLink.innerText = "Repo"

        repoLink.href = data[i].repo_link;

        liveUrlLink.innerText = "Live URL"
        liveUrlLink.href = data[i].live_url_link;

        let imgWrap = document.createElement('div');
        imgWrap.classList.add('portfolio-info')
        let imgLink = document.createElement('a');
        //  imgLink.classList.add('venobox', 'link-preview');
        imgLink.href = "images/" + data[i].img;
        imgLink.title = 'portfolio';
        imgLink.dataGall = "portfolioGallery"

        let icon = document.createElement('i')
        icon.classList.add('ion', 'ion-eye');

        imgLink.appendChild(icon)



        linkWrap.appendChild(repoLink);
        linkWrap.appendChild(imgLink)
        linkWrap.appendChild(liveUrlLink);

        portfolioItems.appendChild(header);
        portfolioItems.appendChild(text);
        portfolioItems.appendChild(linkWrap);
        portfolioItems.appendChild(imgWrap)
        portfolio.appendChild(portfolioItems);

      }
    }
  }
})

  (jQuery);