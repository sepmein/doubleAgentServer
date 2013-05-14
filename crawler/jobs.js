function create(obj) {
    return new Job(obj);
}

var Job = function (obj) {
    /*obj api
     {
     name: String,
     description: String,
     prerequisite: {
     fn:
     arg:
     out:
     },
     job: {
     fn: function,
     arg: {

     },
     out: {
     }
     },
     onFinish: {
     }

     }
     */
    this.name = obj.name || 'defaultJob';
    this.description = obj.description;
    this.prerequisite
};

Job.prototype.isPrepared = function () {

}

module.exports = create;