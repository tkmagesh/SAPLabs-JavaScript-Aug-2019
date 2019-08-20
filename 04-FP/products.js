var products = [
	{id : 5, name : 'Pen', cost : 60, units : 40, category : 'stationary'},
	{id : 9, name : 'Len', cost : 40, units : 30, category : 'grocery'},
	{id : 7, name : 'Ten', cost : 80, units : 80, category : 'grocery'},
	{id : 3, name : 'Den', cost : 50, units : 70, category : 'stationary'},
	{id : 6, name : 'Zen', cost : 60, units : 50, category : 'stationary'},
];

//sort, filter, groupBy
function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

function printGroup(groupedObj){
	for(var key in groupedObj)
		describe('Key - [' + key + ']', function(){
			console.table(groupedObj[key]);
		});
}

describe('default list', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default Sort - products by id', function(){
		function sortProductsById(){
			for(var i=0;i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++){
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
				}
		}
		sortProductsById();
		console.table(products);
	});

	describe('Any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0;i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++){
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});
		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Any list by any criteria', function(){
		function sort(list, comparerFn){
			for(var i=0;i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++){
					var compareResult = comparerFn(list[i], list[j]);
					if (compareResult > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}
		function getDescendingComparer(comparerFn){
			return function(){
				return comparerFn.apply(undefined, arguments) * -1;
			}
		}
		var productsComparerByValue = function(p1, p2){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			if (p1Value < p2Value) return -1;
			if (p1Value > p2Value) return 1;
			return 0;
		}
		describe('Products by value', function(){
			sort(products, productsComparerByValue)
			console.table(products);
		});

		describe('Products by value [descending] ', function(){
			var productsComparerByValueDesc = getDescendingComparer(productsComparerByValue);
			sort(products, productsComparerByValueDesc)
			console.table(products);
		});		
		
	});
});

describe('Filter', function(){
	describe('Default filter - stationary products', function(){
		function filterStationaryProducts(){
			var result = [];
			for(var i=0,count = products.length; i < count; i++){
				if (products[i].category === 'stationary')
					result.push(products[i]);
			}
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});

	describe('Any list by any criteria', function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var i=0,count = list.length; i < count; i++){
				if (criteriaFn(list[i]))
					result.push(list[i]);
			}
			return result;
		}

		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(undefined, arguments);
			}
		}
		describe('Products by cost', function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			};
			describe('costly products [cost > 50]', function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});

			describe('affordable products [ cost <= 50 ]', function(){
				/*var affordableProductCriteria = function(product){
					return product.cost <= 50;
				};*/
				/*var affordableProductCriteria = function(product){
					return !costlyProductCriteria(product);
				}*/
				var affordableProductCriteria = negate(costlyProductCriteria);
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			})
		});

		describe('Products by units', function(){
			var understockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe('understocked products [units < 50 ]', function(){	
				var understockedProducts = filter(products, understockedProductCriteria);
				console.table(understockedProducts);
			});

			describe('wellstocked products [!understocked]', function(){
				/*var wellstockedProductCriteria = function(product){
					return !understockedProductCriteria(product);
				};*/
				var wellstockedProductCriteria = negate(understockedProductCriteria);
				var wellstockedProducts = filter(products, wellstockedProductCriteria);
				console.table(wellstockedProducts);
			});
		});

	});
});

describe('GroupBy', function(){
	describe('Group products by category', function(){
		function groupProductsByCategory(){
			var result = {};
			for(var index = 0, count = products.length; index < count; index++){
				var key = products[index].category;
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(products[index]);
			}
			return result;
		}

		var productsByCategory = groupProductsByCategory();
		printGroup(productsByCategory);
	});

	describe('Any list by any key', function(){
		function groupBy(list, keySelectorFn){
			var result = {};
			for(var index = 0, count = list.length; index < count; index++){
				var key = keySelectorFn(list[index]);
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(list[index]);
			}
			return result;
		}

		describe('products by category', function(){
			var categoryKeySelector = function(product){
				return product.category;
			};
			var productsByCategory = groupBy(products, categoryKeySelector);
			printGroup(productsByCategory);
		});

		describe('products by cost', function(){
			var costKeySelector = function(product){
				return product.cost > 50 ? 'costly' : 'affordable';
			};
			var productsByCost = groupBy(products, costKeySelector);
			printGroup(productsByCost);
		})
	})
})