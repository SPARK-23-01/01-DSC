//点击叉号 关闭广告
$(".cha").click(function () {
  $(".ad").fadeOut(200);
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

//滚轮滚动事件
$(".h_alllist").bind("mousewheel", function (e) {
  //最大位移
  var maxh = $(".h_ul").height() - $(".h_ul li:last").height();
  //	当前top
  var top = Number($(".h_ul").css("margin-top").slice(0, -2));
  //判断可滑动高度 120
  var ch = $(".h_bar").height() - $(".h_citybar").height();
  //可移动距离
  var ah = $(".h_ul").height() - $(".h_ul li:last").height();
  //获取比例
  var bili = (-top / ah) * ch;

  $(".h_citybar").css({
    top: bili,
  });

  //	向上滚动
  if (e.originalEvent.wheelDelta < 0) {
    if (top <= 0 && top > -maxh) {
      top -= 20;
      $(".h_ul").css("margin-top", top + "px");
    } else if (top <= -maxh) {
      top = -maxh;
      $(".h_ul").css("margin-top", top + "px");
      return;
    }
  } else if (e.originalEvent.wheelDelta > 0) {
    if (top < 0 && top >= -maxh) {
      top += 20;
      $(".h_ul").css("margin-top", top + "px");
    } else if (top >= 0) {
      top = 0;
      $(".h_ul").css("margin-top", top + "px");
      return;
    }
  }
});

$(".h_navi").hover(
  function () {
    $(".h_navi").addClass("h_hover");
  },
  function () {
    $(".h_navi").removeClass("h_hover");
  }
);

//搜索框 获取焦点和失去焦点
$(".h_search .h_intext").focus(function () {
  $(this).val("");
  $(this).css("color", "rgb(102，102，102)");
});
$(".h_search .h_intext").on("blur", function () {
  $(this).val("内衣");
  $(this).css("color", "rgb(153, 153, 153)");
});
//表单提交清除默认事件，禁止跳转
$(".h_form").on("submit", function (e) {
  e.preventDefault();
});
//hover购物车
$(".h_shop").hover(
  function () {
    $(".h_shop").addClass("h_hover");
  },
  function () {
    $(".h_shop").removeClass("h_hover");
  }
);
//禁止拖拽文字
$(document).on("selectstart", function () {
  event.preventDefault();
});
$("img").bind("dragstart", function () {
  return false;
});
window.getSelection
  ? window.getSelection().removeAllRanges()
  : document.selection.empty();

//点击显示二级导航

$(".c_item").mouseenter(function () {
  $(this).siblings(".c_item").find(".c_itemlayer").removeClass("reveal");
  $(this).find(".c_itemlayer").addClass("reveal");
});
$(".c_item").mouseleave(function () {
  $(this).find(".c_itemlayer").removeClass("reveal");
});

//轮播图
var length = $(".circles li").length;
var index_ = 0;
var bool = true;

//点击小圆点
$(".circles li").click(function () {
  if (bool) {
    bool = false;
    index_ = $(this).index();
    carousel();
  }
});

function carousel() {
  //	clearInterval(inter)
  $(".circles li").eq(index_).addClass("on").siblings().removeClass("on");
  $(".carousel_item")
    .eq(index_)
    .stop()
    .fadeIn(300)
    .siblings()
    .stop()
    .fadeOut(600, function () {
      bool = true;
    });
}
//设置轮播
var inter = setInterval(function () {
  index_++;
  bool = false;
  if (index_ == length) {
    index_ = 0;
  }
  carousel();
}, 3000);

//鼠标移入停止轮播
$(".carousel").on("mouseenter", function () {
  clearInterval(inter);
});
$(".carousel").on("mouseleave", function () {
  inter = setInterval(function () {
    index_++;
    if (index_ == length) {
      index_ = 0;
    }
    carousel();
  }, 3000);
});

//公告促销
$(".tit a").on("mouseenter", function () {
  $(this).addClass("tit_on").siblings().removeClass("tit_on");
  $(".con ul").eq($(this).index()).show().siblings().hide();
});

//轮播图
//下一个
var num = 0;
$(".next").click(function () {
  if (num == 0) {
    num = 1;
    $(".carouse_imgs ul").animate(
      {
        left: "-238px",
      },
      800,
      function () {
        $(".carouse_imgs ul li:first").appendTo($(".carouse_imgs ul"));
        $(".carouse_imgs ul").css("left", 0);
        num = 0;
      }
    );
  }
});
//上一个
$(".prev").click(function () {
  if (num == 0) {
    num = 1;
    $(".carouse_imgs ul li:last").prependTo($(".carouse_imgs ul"));
    $(".carouse_imgs ul").css("left", "-238px");
    $(".carouse_imgs ul").animate(
      {
        left: 0,
      },
      800,
      function () {
        num = 0;
      }
    );
  }
});
//自动轮播
var timer = setInterval(function () {
  $(".next").click();
}, 2000);

//滚动事件
$(window).scroll(function () {
  var winH = $(window).height();
  var oscr = $(window).scrollTop();

  if (oscr > $(".view:first").offset().top - 100) {
    $(".side").show(100);
  } else {
    $(".side").hide(100);
  }

  //右侧下面的top

  //顶部导航栏
  if (oscr > $(".n_nav").offset().top) {
    $(".hide").slideDown(500);
    $(".ibar_f:last").show();
  } else {
    $(".hide").slideUp(500);
    $(".ibar_f:last").hide();
  }

  $(".view").each(function (index) {
    if (oscr + winH - $(this).offset().top > (winH * 3) / 4) {
      $(".side_item").css({
        "background-color": "#fafafa",
        borderColor: "#e6e6e6",
      });
      $(".side_item").find("span").css({
        color: "#333",
      });
      $(".side_item").eq(index).siblings().removeClass("side_item_on");
      $(".side_item").eq(index).css({
        "background-color": "#ff4040",
        borderColor: "#ff4040",
      });
      $(".side_item").eq(index).find("span").css({
        color: "#fff",
      });
      $(".side_item").eq(index).addClass("side_item_on");
    }
  });
});
//顶部隐藏导航栏
$(".hide .h_intext").focus(function () {
  $(this).val("");
  $(this).css("color", "rgb(102，102，102)");
});
$(".hide .h_intext").blur(function () {
  $(this).val("Five Plus");
  $(this).css("color", "rgb(153,153,153)");
});
