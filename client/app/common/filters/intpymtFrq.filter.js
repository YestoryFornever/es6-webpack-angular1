
app.filter("intpymtFrqfilter", function() {
	return function(str) {
		if (str) {
			if (str == 1) {
				return str = " 每月";
			}
			if (str == 2) {
				return str = "每季度";
			}
			if (str == 3) {
				return str = "每半年";
			}
			if (str == 4) {
				return str = "每年";
			}
			if (str == 5) {
				return str = "到期还本付息";
			}
		} else {
			return str = " ";
		}

	};



});