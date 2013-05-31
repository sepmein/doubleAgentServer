
recipes = {
	'allRepos': {
		urlPartial: '/repos',
		qs: {

		}
	}


	/*
	example: object passed to targetGenerator
		'staredRepos', {
			urlAppend: {
				type: '..',
				args: [130, 230]
			},
			start_page: 10
		}
	*/
	'staredRepos': {
		urlPartial: 'legacy/repos/search/stars:',
		urlAppend: function(obj){
			//argument: type, num
			var type = obj.type;
			var args = obj.args;
			switch (type)
			{
				case '=':
					this.urlPartial += args[0];
					break;
				case '>': 
					this.urlPartial += ('>' + args[0]);
					break;
				case '<': 
					this.urlPartial += ('<' + args[0]);
					break;
				case '..': 
					this.urlPartial += (args[0] + '..' + args[1]);
					break;
			}
		},
		qs: {
			per_page: 100
		}
	}
}





module.exports = recipes;

