// Формат входных данных
// {
// 	"END_POINT":["START_POINT", "TRANSPORT_NAME", "TRANSPORT_NUMBER", "SEAT_NUMBER","NOTE"]
// }

//Сортирующая функция.
//Возвращающает отсортированный массив данных в формате: ["END_POINT", "START_POINT", "TRANSPORT_NAME", "TRANSPORT_NUMBER", "SEAT_NUMBER","NOTE"],
//где первый элемент массива - начало пути.
//@unsortData - входные данные в заданном формате


var sortRoute = function(unsortData, makeCopy){
	if(makeCopy)var unsortData = JSON.parse(JSON.stringify(unsortData));
	var sortedArray = [];

		for(var route in unsortData){
			var value = unsortData[route],
				endPoint = route,
				resultArray = [];

				resultArray.push([endPoint].concat(value));

			while(value[0] in unsortData){
				delete unsortData[endPoint];
				endPoint = value[0];
				value = unsortData[value[0]];
				resultArray.push([endPoint].concat(value));
			}
			delete unsortData[endPoint];
			sortedArray = sortedArray.concat(resultArray.reverse())

		}
	return sortedArray;
};

//Метод возвращающий массив текстовых описаний каждого пункта машрута в отсортированном виде
//@unsortData - входные данные в заданном формате
var route = function(unsortData){
	var tmp = JSON.parse(JSON.stringify(unsortData)),
		rt = sortRoute(tmp),
		sortedRoute = [];

		for(var i = 0, l = rt.length; i<l; i++){
			sortedRoute.push("Take "+rt[i][2]+ (rt[i][3]?" "+rt[i][3]:"")+ " from "+ rt[i][1]+ " to "+ rt[i][0]+ (rt[i][4]? ". Seat "+ rt[i][4]+".":". No seat assignment.")+ (rt[i][5]?" "+rt[i][5]:""));
		}
		return sortedRoute;
}

