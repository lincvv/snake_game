function Square(matrix)
{
	this.matrix = matrix;
	var that = this; // �� = ���
	
	this.create = function(color)
	{
		 rowRandGreen = rand(1, 20);
		 colRandGreen = rand(1, 20);
		 that.matrix.setCellColor(rowRandGreen, colRandGreen, color );
			
	}
			

	
}