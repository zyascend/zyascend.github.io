let picList = []
let masonry;
$(document).ready(function() {
  masonry = new Macy({
    container: '#column',
    trueOrder: false,
    waitForImages: false,
    useOwnImageLoader: false,
    debug: false,
    margin: {
      x: 10,
      y: 10
    },
    columns: 3,
    breakAt: {
      1200: 3,
      940: 3,
      520: 2,
      400: 1
    }
  });

  $.get('http://101.200.39.102:39001/api/gallery/getPhotos', function (result) {
    picList = result.photos.concat(picList)
    recaculate();
  })

  masonry.runOnImageLoad(function () {
    setTimeout(function () {
      $('.loading').remove();
    }, 500);
    masonry.recalculate(true, true)
  });

  $('.btn-filter').on('click', function(e) {
    $('.btn-filter').removeClass('btn-filter-active');
    let $button = $(this);
    $button.addClass('btn-filter-active');
    let cate = $button.attr('data-filter');
    filterItems(cate)
  })
});

function filterItems (cate) {
  if (cate === 'all'){
    recaculate();
    return;
  }
  let listToAppend = [];
  picList.forEach(function (item) {
    if (item.cate === cate)
      listToAppend.push(item);
  })
  recaculate(listToAppend);
}

function recaculate (list = picList) {
  let $column = $('#column');
  $column.empty();
  list.forEach(function (item) {
    $column.append(
      `<a data-category="${item.cate}" class="pic-wrapper" data-fancybox="gallery" href="${item.imgUrl}">
          <img src="${item.imgUrl}" class="pic" alt=" "/>
          <i class="icon-zoom fa fa-search-plus fa-2x"></i>
        </a>`
    )
  })
  masonry.reInit();
  masonry.recalculate(true, true)
  setTimeout(function () {
    masonry.reInit();
    masonry.recalculate(true, true)
  },500)
}
