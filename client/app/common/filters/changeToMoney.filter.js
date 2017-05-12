app.filter("changeToMoney", function () {
  return function (str) {
    if (str == "" || str == undefined || str == null) {
      return "--";
    }
    else {
      return str + "亿";
    }
  }
});
