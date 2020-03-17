var fn1 = () => {
	console.log('fn1');
	return Promise.resolve(1);
};

var fn2 = () => new Promise(resolve => {
	console.log('fn2');
	setTimeout(() => resolve(2), 1000);
});

function promiseReduce(asyncFunctions, reduse, initialValue) {
	return new Promise(function(resolve, reject) {
		(async () => {
			for (const item of asyncFunctions) {
				data = await item().then(function(zn){
					//console.log(zn);
					return reduse.call(this,initialValue,zn);
				});
			}
			resolve(data);
		})();
	});
}

promiseReduce(
	[fn1, fn2],
	function (memo, value) {
		console.log('reduce')
		return memo * value
	},
	1
).then(console.log);