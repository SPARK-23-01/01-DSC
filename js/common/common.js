// 头部广告点击X删除功能实现
$("#topClose").click(function () {
  console.log($(this));
  // $(this).parent().parent().remove();
  $(this).parent().parent().animate({
    height: 0,
  });
});
$("#myCart").hover(
  function () {
    $(this).children().eq(1).fadeIn();
  },
  function () {
    $(this).children().eq(1).fadeOut();
  }
);
