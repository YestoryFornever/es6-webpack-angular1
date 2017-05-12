app.filter("winbidEStatus", function() {
  return function(data) {
    if(data == 1) {
      return data = "中标";
    }
    if(data == 2) {
      return  data = "部分中标";
    }
    if(data == 3) {
      return data = "未中标";
    }
    else {
      return data = "--"
    }
  };
});
