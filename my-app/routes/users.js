var express = require('express');
var router = express.Router();


let userList = [
	{id : 1, name : 'Magesh', isActive : true},
	{id : 2, name : 'Suresh', isActive : false},
	{id : 3, name : 'Ganesh', isActive : true}
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(userList);
});

router.get('/:id', function(req, res, next){
	const id = parseInt(req.params.id);
	const result = userList.find(user => user.id === id);
	if (result){
		res.json(result);
	} else {
		res.status(404).end();
	}
})

module.exports = router;
