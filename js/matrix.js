//
// ГЉГ«Г Г±Г± Г¬Г ГІГ°ГЁГ¶Г».
//
function Matrix(containerId, rows, cols)
{	
	var that = this;
	// id ГЄГ®Г­ГІГҐГ©Г­ГҐГ°Г 
	this.containerId = containerId;
	
	// Г·ГЁГ±Г«Г® Г±ГІГ°Г®ГЄ
	this.rows = rows;
	
	// Г·ГЁГ±Г«Г® Г±ГІГ®Г«ГЎГ¶Г®Гў
	this.cols = cols;
	
	// Г±Г®Г§Г¤Г Г­ГЁГҐ Г±ГҐГІГЄГЁ
	this.create = function()
	{
		var matrix = document.getElementById(this.containerId);
		var n = this.rows * this.cols;	
		
		matrix.innerHTML = '';
		
		for (var i = 0; i < n; i++)
		{
			var div = document.createElement('div');
			div.className = 'cell';
			matrix.appendChild(div);
		}
	}

	this.cells  = function(row, col)
	{
		var ind = (row - 1) * this.cols + col - 1;
		//var matrix = //document.getElementById(this.containerId);
		var cell = $("#"+containerId).children();
		//matrix.children[ind];
		return cell.get(ind);//cell[ind];
	}


	this.getCell = function(row, col, color)
	{
		var cell = that.cells(row, col);
		if (color == "black")
			return $(cell).hasClass("bl");
		if (color == "green")
			return $(cell).hasClass("gr");
		if(color == "on")
			return $(cell).hasClass("on");
	}
	// ГЇГ®Г«ГіГ·ГЁГІГј Г§Г­Г Г·ГҐГ­ГЁГҐ ГїГ·ГҐГ©ГЄГЁ


	//Г“Г±ГІГ Г­Г®ГўГЁГІГј Г§Г­Г Г·ГҐГ­ГЁГҐ ГїГ·ГҐГ©ГЄГЁ Г·ГҐГ°Г­Г»Г© Г¶ГўГҐГІ- ГЇГ°ГҐГЇГїГІГ±ГІГўГЁГҐ

	//ГіГ±ГІГ Г­Г®ГўГЁГІГј Г§Г­Г Г·ГҐГ­ГЁГҐ ГїГ·ГҐГ©ГЄГЁ Г§ГҐГ«ГҐГ­Г»Г© Г¶ГўГҐГІ
	this.setCellColor = function(row, col, color)
	{
		var cell = that.cells(row, col);
		
		if (color == 'green' && !$(cell).hasClass("on")) 
			$(cell).addClass("gr");
		else if (color == 'black'&& !$(cell).hasClass("on"))
			$(cell).addClass("bl");
		else
			square.create(color);
		
	}

	// ГіГ±ГІГ Г­Г®ГўГЁГІГј Г§Г­Г Г·ГҐГ­ГЁГҐ ГїГ·ГҐГ©ГЄГЁ
	this.setCellSnake = function(row, col, val)
	{
		
			var cell = that.cells(row, col);	
			cell.className = (val ? 'cell on' : 'cell');
		
	}

	
}
		
