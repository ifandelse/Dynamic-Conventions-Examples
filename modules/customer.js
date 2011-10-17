// fakin' some data
var customers = [
    {
        id: 1,
        name: "ACME, Inc.",
        address: {
            street: "1234 Canyon Rd.",
            city: "Alberquerque",
            state: "NM",
            zip: 87101
        }
    },
    {
        id: 2,
        name: "Bugs, LLC",
        address: {
            street: "Some Rabbit Hole",
            city: "Alberquerque",
            state: "NM",
            zip: 87101
        }
    },
    {
        id: 3,
        name: "Road Runner, Inc",
        address: {
            street: "1234 Speedy Rd.",
            city: "Phoenix",
            state: "AZ",
            zip: 85024
        }
    }
];

// super silly examples, but you get the point.
module.exports = {
    'get': function(custId) {
        var customer = customers.filter(function(x) { return x.id == custId; })[0];
        if(customer) {
            return customer;
        }
        throw "Customer " + custId + " not found!";
    },

    'post' : function(custId, data) {
        var customer = customers.filter(function(x) { return x.id == custId; })[0];
        if(customer) {
            // I know, should've just used "extend" here.  Laziness, FTL
            customer.id = data.id || customer.id;
            customer.name = data.name|| customer.name;
            customer.address.street = data.street || customer.address.street;
            customer.address.city = data.city || customer.address.city;
            customer.address.state = data.state || customer.address.state;
            customer.address.zip = data.zip || customer.address.zip;
            return customer;
        }
        throw "Customer " + custId + " not found!";
    }
};