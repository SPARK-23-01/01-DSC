$(function(){
    $('.denglu').click(function(){
        $('.xqk-content').css('display','none');
        $('.goods').css('display','block');
        $('.head-goods').css('display','block');
        $('.goods-foot').css('display','block');
    });

    var allCheckbox = $('input[type="checkbox"]');
    console.log(allCheckbox);
    // 1.所有的复选框选中或者取消
    allCheckbox.click(function() {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('active');
        } else {
            $(this).next('label').removeClass('active');
        }
    });
    // 2.全选选中-全选取消------合计
    $('.whole-check').click(function() {
        var checkboxCar = allCheckbox.not($(this));
        if ($(this).is(':checked')) {
            checkboxCar.prop('checked', true);
            checkboxCar.next('label').addClass('active');
        } else {
            checkboxCar.prop('checked', false);
            checkboxCar.next('label').removeClass('active');
        }
        // 计算合计数据
        total();
    });

    function total() {
        // 1.商品的数量
        // 2.商品的小计的合计
        var total_count = 0;
        var total_price = 0;
        $('.son-check').each(function() {
            // 判断当前商品是否被选中
            if ($(this).is(':checked')) {
                var goodsCount = parseFloat($(this).parents('.cart-lists').find('.amount-box').find('input').val());
                var goodsPrice = parseFloat($(this).parents('.cart-lists').find('.price-sum').text());
                // 合计
                total_count += goodsCount;
                total_price += goodsPrice;
            }
        });
        // 赋值给总计元素
        $('.buy-num').text(total_count);
        $('.pay-price').text(total_price);
    };
    // 3.商品全部选中,全选按钮选中-任何一个不选,全选取消 ------合计
    $('.son-check').each(function() {
        $(this).click(function() {
            // 记录商品被选中的数量
            var num = 0;
            //获取所有的商品选中状态
            var lens = $('.son-check').length;
            $('.son-check').each(function() {
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (num == lens) {
                $('.whole-check').prop('checked', true);
                $('.whole-check').next('label').addClass('active');
            } else {
                $('.whole-check').prop('checked', false);
                $('.whole-check').next('label').removeClass('active');
            };
            total();
        });
    });
    // 4.该店铺商品全选选中-全选取消 ------合计
    $('.shop-check').each(function() {
        $(this).click(function() {
            // 判断店铺的复选按钮是否被选中
            if ($(this).is(':checked')) {
                // 记录商品被选中的数量
                var num = 0;
                //获取所有的商品选中状态
                var lens = $('.shop-check').length;
                $('.shop-check').each(function() {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });

                if (num == lens) {
                    $('.whole-check').prop('checked', true);
                    $('.whole-check').next('label').addClass('active');
                };
                // 店铺的全选和每个商品的关系
                $(this).parents('.cart-box').find('.son-check').prop('checked', true);
                $(this).parents('.cart-box').find('.son-check').next('label').addClass('active');
            } else {
                $('.whole-check').prop('checked', false);
                $('.whole-check').next('label').removeClass('active');
                // 店铺的全选和每个商品的关系
                $(this).parents('.cart-box').find('.son-check').prop('checked', false);
                $(this).parents('.cart-box').find('.son-check').next('label').removeClass('active');
            };
            // 合计操作
            total();
        });
    });
    // 5.该店铺商品全部选中,全选按钮选中-任何一个不选,全选取消 ------合计
    $('.son-check').click(function() {
        if ($(this).is(':checked')) {
            // 记录商品被选中的数量
            var num = 0;
            //获取当前所在店铺所有的商品选中状态
            var sonChecks = $(this).parents('.cart-box').find(".son-check");
            var lens = sonChecks.length;
            console.log(lens);
            sonChecks.each(function() {
                if ($(this).is(':checked')) {
                    num++;
                };
            });
            if (num == lens) {
                console.log(this);
                $(this).parents('.cart-box').find('.shop-check').prop('checked', true);
                $(this).parents('.cart-box').find('.shop-check').next('label').addClass('active');
            }
        } else {
            $(this).parents('.cart-box').find('.shop-check').prop('checked', false);
            $(this).parents('.cart-box').find('.shop-check').next('label').removeClass('active');
        }
    });
    // 6.加事件 ------合计
    $('.add').click(function() {
        // 启用减的按钮
        $(this).next('button').prop('disabled', false);
        var inputValue = $(this).prev('input');
        // 点击一次加1
        var count = parseInt(inputValue.val()) + 1;
        // 设置加1后的值
        inputValue.val(count);
        // 获取商品的单价
        var price = $(this).parents('.cart-lists').find('.price').text();
        // 设置新的小计值
        $(this).parents('.cart-lists').find('.price-sum').text(count * parseFloat(price));

        // 合计操作
        total();
    });
    // 7.减事件 ------合计
    $('.reduce').click(function() {
        var inputValue = $(this).parents('.amount-box').find('input');
        console.log(inputValue);
        // 点击一次减1
        var count = parseInt(inputValue.val()) - 1;
        // 判断count等于1时，金庸减去按钮
        if (count == 1) {
            $(this).prop('disabled', true);
        };
        inputValue.val(count);
        // 获取商品的单价
        var price = $(this).parents('.cart-lists').find('.price').text();
        // 设置新的小计值
        $(this).parents('.cart-lists').find('.price-sum').text(count * parseFloat(price));
        // 合计操作
        total();

    });
    // 8.输入产品计算商品价格小计 ------合计
    var inCheck = $('.amount-box').find('input');
    console.log(inCheck);
    // 绑定键盘事件
    inCheck.keyup(function() {
        console.log($(this));
        // 用正则去判定数据的格式
        var count = parseInt($(this).val().replace(/\D|^0/g, ''));
        if (!count) {
            count = 1;
        };
        // 设置格式化后的count值
        $(this).val(count);
        // 获取商品的单价
        var price = $(this).parents('.cart-lists').find('.price').text();
        // 设置新的小计值
        $(this).parents('.cart-lists').find('.price-sum').text(count * parseFloat(price));
        // 合计操作
        total();
    });
    // 9.删除事件 ------合计
    // 10.模态框的取消和确定
    $('.cart-dele').click(function() {
        // 记录删除按钮的父元素
        delteList = $(this).parents('.cart-lists');
        delteCount = $(this).parents('.cart-content');
        // 显示蒙版和模态框
        $('.modal-bg').fadeIn();
        $('.modal-box').fadeIn();
        // 模态框的取消按钮
        $('.close').click(function() {
            // 关闭蒙版和模态框
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
        });
        // 点击确定删除时做的操作
        $('.ok').click(function() {
            // 移除删除按钮的父元素--一列商品的信息
            delteList.remove();
            // 如果店铺商品没有了把店铺信息删除
            console.log(delteCount);
            if (delteCount.children().length == 0) {
                delteCount.parents('.cart-box').remove();
            };
            // 关闭蒙版和模态框
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            // 合计操作
            total();
        });
    });




































    //字母鼠标移入事件
$(".h_letter a").each(function (index, item) {
  $(this).mouseover(function () {
    var that = $(this);
    //margintop的值
    var oh = 0;
    //		$('.h_ul').css('margin-top',0)
    $(".h_ul li").each(function () {
      ah += $(this).height();
      if ($(this).data("name") == that.data("letter")) {
        $(this)
          .prevAll()
          .each(function () {
            oh += $(this).height();
          });
      }
      $(".h_ul")
        .stop()
        .animate(
          {
            marginTop: -oh + "px",
          },
          500
        );
      //可移动距离
      var ah = $(".h_ul").height() - $(".h_ul li:last").height();
      //判断可滑动高度
      var ch = $(".h_bar").height() - $(".h_citybar").height();
      //要移动的高度
      var yh = (oh / ah) * ch;
      $(".h_citybar")
        .stop()
        .animate(
          {
            top: yh + "px",
          },
          500
        );
    });
  });
});
//滑动滚动条
$(".h_citybar").mousedown(function (e) {
  //获取鼠标刚点下的位置
  var ey = e.pageY;

  $(".h_citybar").mousemove(function (e) {
    //获取剪头的位置
    var mh = e.pageY - $(".h_bar").offset().top - $(".h_citybar").height() / 2;
    //获取最大移动距离
    var maxh = $(".h_bar").height() - $(".h_citybar").height();
    if (mh <= 0) {
      mh = 0;
    } else if (mh >= maxh) {
      mh = maxh;
    }
    //判断可滑动高度 120
    var ch = $(".h_bar").height() - $(".h_citybar").height();
    //可移动距离
    var ah = $(".h_ul").height() - $(".h_ul li:last").height();
    //获取比例
    var bili = (mh / ch) * ah;
    $(".h_ul")
      .stop()
      .animate(
        {
          marginTop: -bili + "px",
        },
        200
      );

    $(".h_citybar").css({
      top: mh,
    });
  });
  //鼠标弹起 鼠标移动事件清空
  $(".h_citybar").mouseup(function (e) {
    $(".h_citybar").off("mousemove");
  });
  //鼠标离开时，清空移动事件
  $(".h_citybar").mouseleave(function (e) {
    $(".h_citybar").off("mousemove");
  });
});
//鼠标移入郑州市，添加类名
$(".h_citychoice").hover(
  function () {
    $(".h_citychoice").addClass("h_hover");
  },
  function () {
    $(".h_citychoice").removeClass("h_hover");
    $(".h_ul").css("margin-top", 0);
    $(".h_citybar").css("top", 0);
  }
);

// 网站导航的hover效果
$('.head-spn').mouseover(function(){
  $('.h_navib').css('display','block');
  $('.head-spn').css({
    "border":"1px solid #ccc",
    "border-bottom":"1px solid #fff"
  })
  $('.head-spn').css('background',"#fff")

})
$('.head-spn').mouseout(function(){
  $('.h_navib').css('display','none')
  $('.head-spn').css({
    "border":"1px solid #eee",
    "border-bottom":"1px solid #fff"
  })
  $('.head-spn').css('background',"#eee")

})
$('.h_navib').mouseover(function(){
  $('.h_navib').css('display','block');
  $('.head-spn').css({
    "border":"1px solid #ccc",
    "border-bottom":"1px solid #fff"
  })
  $('.head-spn').css('background',"#fff")
})
$('.h_navib').mouseout(function(){
  $('.h_navib').css('display','none')
  $('.head-spn').css({
    "border":"1px solid #eee",
    "border-bottom":"1px solid #fff"
  })
  $('.head-spn').css('background',"#eee")
})

  $('.border-line').mouseover(function(){
    $('.h_navib').css('display','block');
    $('.head-spn').css({
      "border":"1px solid #ccc",
      "border-bottom":"1px solid #fff"
    })
    $('.head-spn').css('background',"#fff")
  })
  $('.border-line').mouseout(function(){
    $('.h_navib').css('display','none');
    $('.head-spn').css({
      "border":"1px solid #eee",
      "border-bottom":"1px solid #fff"
    })
    $('.head-spn').css('background',"#eee")
  })
})