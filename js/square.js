function Square(matrix)
{
	this.matrix = matrix;
	var that = this; // то = это
	
	this.create = function(color)
	{
		 rowRandGreen = rand(1, 20);
		 colRandGreen = rand(1, 20);
		 that.matrix.setCellColor(rowRandGreen, colRandGreen, color );
			
	}
			

	
}