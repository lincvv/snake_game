var data_record = [];
// 
$.mockjax({
  url: "/restful/fortune",
  dataType: "json",
  response: function(settings) {
    var respons = [];

    if (settings.data.method == 'reset') {

    	localStorage.removeItem("data");
    }

    if (settings.data.method == 'search') {
    	
    	var temp = JSON.parse(localStorage["data"]);
    	 
    	for (var i = 0; i < temp.length; i++) {
    		var user = settings.data.searchUser;
    		//alert(temp.length);
    		if (temp[i].name.indexOf(user) == 0) {
    			respons.push(temp[i]);	
    			
    		}
    	}
    	if (respons.length) {
    		this.responseText = {user: respons};
    	}
    	else this.responseText = {user: ''};
    };

    if (settings.data.method == 'save') {

   		if (!localStorage["data"]) {
   			
   			data_record.push({name: settings.data.name, point: settings.data.point});
   			localStorage["data"] = JSON.stringify(data_record);
   		}
   		else{
   			var temp = JSON.parse(localStorage["data"]);
   			data_record = temp;
   			data_record.push({name: settings.data.name, point: settings.data.point});
   			localStorage["data"] = JSON.stringify(data_record);
   		}

		

   		this.responseText = {arg: "ok"};
  	/*localStorage.setItem('name', settings.data.name);
  	localStorage.setItem('point', settings.data.point);*/
  	
  }
  	if (settings.data.method == 'read') {

      if (!localStorage["data"]) {
        var resp_null = {arg: "NULL"}
        this.responseText = {arg: resp_null}; 
      }
      else{
  	/*var name = localStorage.getItem('name');
  	var point =localStorage.getItem('point');*/
  	var resp = JSON.parse(localStorage["data"]);

    	this.responseText = {arg: resp};    	
    }
    };
  }
});