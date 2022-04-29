/**
 * ajax.js 
 */

// 비동기방식

let val = 10;
setTimeout(function () {
	val += 5;
	console.log('hello -> ' + val)
	// 매개값 2개 (실행할 함수, 시간의 텀을 두고 실행(현재는 1초))

 
	setTimeout(function () {
		val += 3;
		console.log('hello2 -> ' + val)


		setTimeout(function () {
			val += 4;
			console.log('hello3 -> ' + val)

		}, 1000);

	}, 1000);

}, 2000);


let success = false;
let promise = new Promise(function (resolve, reject) {
	// 정상적으로 처리 시 resolve, 에러 발생 시 reject
	if (success) {
		resolve('success');
	} else {
		reject('Error');
	}
});

promise.then(function(result){
console.log(result);		
	})
	.then(function(result){
		console.log(result)
	})
	.then(function(result){
		console.log(result)
	})
	.catch(function(error){
		console.log(error);
	});