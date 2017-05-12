app.filter('yldrtoCopyFilter',function(){
  return function(yldrto){
    if(yldrto ){//收益率
      yldrto = yldrto + "%";
    }
    return yldrto ;
  };
});
